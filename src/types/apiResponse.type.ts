import { IPlanet } from "./planet.type";

export interface IAPIResponse {
  planets?: IPlanet[];
  error?: string;
}