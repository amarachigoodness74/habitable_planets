import { IPlanet, PlanetsByDisposition } from "./planet.type";

export interface IAPIResponseForPlanetCharts {
  planets: IPlanet[];
  habitablePlanets: IPlanet[];
  earthLikePlanets: IPlanet[];
  recievesSunlightLikeEarth: IPlanet[];
  planetsByDisposition: PlanetsByDisposition[];
}

export interface IAPIResponseForAllPlanets {
  planets: IPlanet[];
}

export interface IAPIResponseForHabitablePlanet {
  planets: IPlanet[];
  habitablePlanets: IPlanet[];
}

export interface IAPIErrorResponse {
  error: string;
}

