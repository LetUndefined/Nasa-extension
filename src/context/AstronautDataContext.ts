import { createContext } from "react";
import { type Astronauts } from "../interfaces";

export const AstronautContext = createContext<{ data: Astronauts | null; loading: boolean } | null>(null);
