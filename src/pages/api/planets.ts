import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "csv-parse";
import { IPlanet } from "../../types/planet.type";
import { IAPIResponse } from "../../types/apiResponse.type";

const isHabitablePlanet = (planet: IPlanet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IAPIResponse>
) {
  const habitablePlanets: any = [];

  fs
      .createReadStream(process.cwd() + "/src/kepler_data.csv", "utf8")
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data: IPlanet) => {
        if (data && isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("end", () => {
        console.log("Done reading data!", habitablePlanets.length);
        return res.status(200).json({ planets: habitablePlanets });
      })
      .on('error', (err) => {
        console.error(err);
        return res.status(500).json({ error: 'Server Error' });
      });
}
