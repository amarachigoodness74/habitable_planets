import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "csv-parse";
import { IPlanet } from "../../types/planet.type";
import { IAPIResponse } from "../../types/apiResponse.type";

enum KoiDisposition {
  confirmed = "CONFIRMED",
  candidate = "CANDIDATE",
  false_positive = "FALSE POSITIVE",
}

const isHabitablePlanet = (planet: IPlanet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

const stats = {
  confirmed: 0,
  candidate: 0,
  falsePositive: 0,
  others: 0,
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IAPIResponse>
) {
  const planets: any = [];
  const habitablePlanets: any = [];
  const raduisVsTemperature = [];
  const raduisVsTemperatureVsInsolation = [];

  fs.createReadStream(process.cwd() + "/src/kepler_data.csv", "utf8")
    .pipe(
      parse({
        comment: "#",
        columns: true,
      })
    )
    .on("data", (data: IPlanet) => {
      planets.push(data);
      if (data && isHabitablePlanet(data)) {
        habitablePlanets.push(data);
      }
      // Disposition Data
      if (data.koi_disposition === KoiDisposition.candidate) {
        stats.candidate += 1;
      } else if (data.koi_disposition === KoiDisposition.confirmed) {
        stats.confirmed += 1;
      } else if (data.koi_disposition === KoiDisposition.false_positive) {
        stats.falsePositive += 1;
      } else {
        stats.others += 1;
      }

      // Raduis Vs Temperature Data
      let rT = {
        raduis: data.koi_prad,
        temperature: data.koi_teq,
      };
      raduisVsTemperature.push(rT);

      // Raduis Vs Temperature Vs Isolation Data
      let rTI = {
        raduis: data.koi_prad,
        temperature: data.koi_teq,
        insolation: data.koi_insol,
      };
      raduisVsTemperatureVsInsolation.push(rTI);
    })
    .on("end", () => {
      console.log("Done reading data!", habitablePlanets.length);
      // return res.status(200).json({ planets: habitablePlanets });
      return res.status(200).json({
        planets,
        habitablePlanets,
        raduisVsTemperature,
        raduisVsTemperatureVsInsolation,
        stats,
      });
    })
    .on("error", (err) => {
      console.error(err);
      return res.status(500).json({ error: "Server Error" });
    });
}
