import { useState, useEffect, useMemo } from "react";
import { LayoutGrid, Table } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { IPlanet } from "@/types/planet.type";
import Header from "@/components/Header";
import ExoplanetGrid from "@/components/ExoplanetGrid";
import ExoplanetTable from "@/components/ExoplanetTable";

enum types {
  CARD = "card",
  TABLE = "table",
}

export default function ExoplanetExplorer() {
  const [displyType, setDisplyType] = useState<string>(types.TABLE);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<IPlanet[]>([]);
  const [filteredData, setFilteredData] = useState<IPlanet[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/planets");
        const result = await response.json();
        setData(result?.planets || []);
        setFilteredData(result?.planets || []);
      } catch (error) {
        console.error("Error fetching CSV data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredPlanets = useMemo(() => {
    if (!search) return data;
    return data.filter((planet) =>
      planet.kepler_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  return (
    <>
      <Header />

      <div className="mx-10">
        <div className="flex gap-4 justify-between px-4">
          <div className="relative w-[80%] sm:w-[70%] md:w-[60%] lg:w-[40%] mb-5">
            <input
              type="text"
              placeholder="Search exoplanets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 pr-10 rounded-md bg-gray-800 outline-slate-900"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-slate-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            )}
          </div>
          <div className="flex w-[10%] gap-4">
            <button
              onClick={() => setDisplyType(types.CARD)}
              disabled={displyType === types.CARD}
              className={`${
                displyType === types.CARD ? "px-4 rounded-md bg-gray-800" : ""
              }`}
            >
              <LayoutGrid />
            </button>{" "}
            <button
              onClick={() => setDisplyType(types.TABLE)}
              disabled={displyType === types.TABLE}
              className={`${
                displyType === types.TABLE ? "px-4 rounded-md bg-gray-800" : ""
              }`}
            >
              <Table />
            </button>
          </div>
        </div>

        {displyType === types.TABLE ? (
          <ExoplanetTable filteredPlanets={filteredPlanets} />
        ) : (
          <ExoplanetGrid filteredPlanets={filteredPlanets} />
        )}

        <h2 className="text-xl font-bold">Planet Size Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredData.slice(0, 10)}>
            <XAxis dataKey="kepler_name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="koi_prad" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
