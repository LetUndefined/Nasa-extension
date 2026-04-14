import { createContext } from "react";
import { type Astronauts } from "../interfaces";

export const AstronautContext = createContext<Astronauts | null>(null);
