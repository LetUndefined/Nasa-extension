import { useEffect, useState } from "react";
import { type TelemetryData } from "../interfaces";

const LS_BASE = "https://push.lightstreamer.com/lightstreamer";
const ITEMS = ["NODE3000005", "NODE3000003", "NODE3000001"];

async function fetchSnapshot(): Promise<{ item: string; value: string }[]> {
  const sessionRes = await fetch(`${LS_BASE}/create_session.txt?LS_protocol=TLCP-2.5.0`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      LS_adapter_set: "ISSLIVE",
      LS_cid: "pcYgxn8m8 feOojyA1V681i3g2.pz482hB5DM9o",
      LS_polling: "true",
      LS_polling_millis: "0",
      LS_idle_millis: "0",
    }).toString(),
  });

  const sessionText = await sessionRes.text();
  console.log("session:", sessionText);
  const sessionMatch = sessionText.match(/CONOK,([^,\r\n]+)/);
  if (!sessionMatch) throw new Error("Session failed: " + sessionText);
  const sessionId = sessionMatch[1];

  await fetch(`${LS_BASE}/control.txt?LS_protocol=TLCP-2.5.0`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      LS_session: sessionId,
      LS_reqId: "1",
      LS_op: "add",
      LS_subId: "1",
      LS_mode: "MERGE",
      LS_group: ITEMS.join(" "),
      LS_schema: "Value",
      LS_snapshot: "true",
    }).toString(),
  });

  const bindRes = await fetch(`${LS_BASE}/bind_session.txt?LS_protocol=TLCP-2.5.0`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      LS_session: sessionId,
      LS_polling: "true",
      LS_polling_millis: "0",
      LS_idle_millis: "0",
    }).toString(),
  });

  const bindText = await bindRes.text();
  console.log("bind:", bindText);

  const results: { item: string; value: string }[] = [];
  for (const line of bindText.split("\r\n")) {
    const match = line.match(/^U,1,(\d+),(.+)$/);
    if (match) {
      const itemIndex = parseInt(match[1]) - 1;
      results.push({ item: ITEMS[itemIndex], value: match[2] });
    }
  }

  return results;
}

const ProgressBar = () => {
  const [systemData, setSystemData] = useState<TelemetryData[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const updates = await fetchSnapshot();
        const newData: TelemetryData[] = [];
        for (const { item, value } of updates) {
          let label = "";
          let index = -1;
          let normalized = parseFloat(value);
          if (item === "NODE3000005") { index = 0; label = "Urine Tank"; }
          else if (item === "NODE3000003") { index = 1; label = "Waste Water"; normalized = (normalized / 29.5) * 100; }
          else if (item === "NODE3000001") { index = 2; label = "Clean Water"; normalized = (normalized / 221.6) * 100; }
          if (index !== -1) newData[index] = { label, unit: "%", value: String(normalized) };
        }
        setSystemData(newData);
      } catch (e) {
        console.error("fetchSnapshot error:", e);
      }
    };

    load();
    const interval = setInterval(load, 60_000);
    return () => clearInterval(interval);
  }, []);

  const getProgressColor = (index: number) => {
    if (index === 0) return "[&::-webkit-progress-value]:bg-[var(--yellow)]";
    if (index === 1) return "[&::-webkit-progress-value]:bg-amber-600";
    return "[&::-webkit-progress-value]:bg-[var(--cyan)]";
  };

  return (
    <>
      {systemData.map((e, index) => (
        <div key={index} className="flex flex-col gap-2 my-3">
          <div className="flex justify-between">
            <h4 className="text-[var(--cyan)]/40 uppercase text-[0.8rem] flex items-center" style={{ fontFamily: "var(--font-display)" }}>
              {e.label}
            </h4>
            <h4 className="text-[var(--cyan)] font-extrabold text-[1.4rem]" style={{ fontFamily: "var(--font-mono)" }}>
              {Math.min(100, Math.round(Number(e.value)))}
              <span className="ml-2 text-[0.6rem]">%</span>
            </h4>
          </div>
          <progress value={Math.min(100, parseFloat(e.value))} max={100} className={`h-[0.2rem] w-full ${getProgressColor(index)}`} />
        </div>
      ))}
    </>
  );
};

export default ProgressBar;
