import { useState, useEffect } from "react";
import { IAPIResponse } from "@/types/apiResponse.type";
import { IPlanet } from "../types/planet.type";
import {
  Legend,
  Bar,
  BarChart,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Header from "@/components/Header";
import { ExoplanetCard } from "@/components/ExoplanetGrid";

const IndexPage = () => {
  const [data, setData] = useState<IPlanet[]>([]);
  const [dispositionData, setDispositionData] = useState([]);
  const [dispositionData1, setDispositionData1] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/habitable-planets");
        const result: IAPIResponse = await response.json();
        setData(result);
        setDispositionData([
          { name: "Confirmed", planets: result.stats.confirmed },
          { name: "Candidate", planets: result.stats.candidate },
          { name: "False Positive", planets: result.stats.falsePositive },
        ]);
        setDispositionData1(result.raduisVsTemperature);
      } catch (error) {
        console.error("Error fetching CSV data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="flex justify-between gap-16 mx-6">
        <div className="w-full">
          <h2 className="font-bold text-xl mb-4">Planets by Disposition</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={dispositionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="planets" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full">
          <h2 className="font-bold text-xl mb-4">
            Planets Radius by Temperature
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="raduis" name="Radius" unit="RE" />
              <YAxis
                type="number"
                dataKey="temperature"
                name="Temperature"
                unit="K"
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter
                name="Exoplanets"
                data={dispositionData1}
                fill="#8884d8"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-12 w-full">
        <h2 className="border border-gray-600 max-w-[500px] rounded-xl text-2xl font-bold m-8 p-2">
          List of Habitable Planets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {data.habitablePlanets &&
            data.habitablePlanets.map((planet, index) => (
              <ExoplanetCard key={index} planet={planet} />
            ))}
        </div>
      </div>
    </>
  );
};

export default IndexPage;
