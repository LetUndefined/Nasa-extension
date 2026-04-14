import { useEffect, useState } from "react";
import { LightstreamerClient, Subscription, ItemUpdate } from "lightstreamer-client-web";
import { type TelemetryData } from "../interfaces";

const ProgressBar = () => {
  const [systemData, setSystemData] = useState<TelemetryData[]>([]);

  useEffect(() => {
    const client = new LightstreamerClient("https://push.lightstreamer.com", "ISSLIVE");

    // Force HTTP streaming instead of WebSocket
    client.connectionOptions.setForcedTransport("HTTP-STREAMING");

    client.connect();

    const subscription = new Subscription("MERGE", ["USLAB000058", "USLAB000059"], ["Value", "TimeStamp"]);

    subscription.addListener({
      onItemUpdate: (update: ItemUpdate) => {
        const itemName = update.getItemName();
        const value = update.getValue("Value") || "";
        const timestamp = update.getValue("TimeStamp") || "";

        console.log(` Update received:`, {
          item: itemName,
          value,
          timestamp,
          time: new Date().toLocaleTimeString(),
        });

        setSystemData((prev) => {
          const newData = [...prev];
          const index = itemName === "USLAB000058" ? 0 : 1;
          const label = itemName === "USLAB000058" ? "Urine Tank" : "Water Tank";

          newData[index] = { label, unit: "%", value, timestamp };
          return newData;
        });
      },
    });

    client.subscribe(subscription);

    return () => {
      client.unsubscribe(subscription);
      client.disconnect();
    };
  }, []);

  const progressColor = {
    urine: "[&::-webkit-progress-value]:bg-[var(--yellow)] ",
    water: "[&::-webkit-progress-value]:bg-[var(--cyan)]",
  };

  return (
    <>
      {systemData.map((e, index) => (
        <div key={index} className="flex flex-col gap-2 my-3">
          <div className="flex justify-between">
            <h4 className="text-[var(--cyan)]/40 uppercase text-[0.8rem] flex items-center" style={{ fontFamily: "var(--font-display)" }}>
              {e.label}
            </h4>
            <h4 className="text-[var(--cyan)] font-extrabold text-[1.4rem] " style={{ fontFamily: "var(--font-mono)" }}>
              {index === 0 ? Math.floor(Number(e.value)) / 10 : Math.floor(Number(e.value))}
              <span className="ml-2 text-[0.6rem]">%</span>
            </h4>
          </div>
          <progress value={index === 0 ? parseFloat(e.value) / 10 : parseFloat(e.value)} max={100} className={`h-[0.2rem] w-full ${index === 0 ? progressColor.urine : progressColor.water}`} />
        </div>
      ))}
    </>
  );
};

export default ProgressBar;
