import { useState, useEffect } from "react";
import { AstronautContext } from "./AstronautDataContext";
import type { Astronauts } from "../interfaces";

export const AstronautsDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<Astronauts | null>(null);
  async function getData() {
    try {
      const response = await fetch("http://api.open-notify.org/astros.json");
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return <AstronautContext value={data}>{children}</AstronautContext>;
};
