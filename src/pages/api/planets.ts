import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "csv-parse";
import { IPlanet } from "../../types/planet.type";
import { IAPIResponse } from "../../types/apiResponse.type";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IAPIResponse>
) {
  const habitablePlanets: any = [];

  fs.createReadStream(process.cwd() + "/src/kepler_data.csv", "utf8")
    .pipe(
      parse({
        comment: "#",
        columns: true,
      })
    )
    .on("data", (data: IPlanet) => {
      console.log(`Read ${Object.keys(data).length} data!`); // 49
      habitablePlanets.push(data);
    })
    .on("end", () => {
      console.log("Done reading data!", habitablePlanets.length); // 9564
      return res.status(200).json({ planets: habitablePlanets });
    })
    .on("error", (err) => {
      console.error(err);
      return res.status(500).json({ error: "Server Error" });
    });
}
