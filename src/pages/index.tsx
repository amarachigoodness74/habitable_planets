import Image from "next/image";
import { Inter } from "next/font/google";
import { IAPIResponse } from "@/types/apiResponse.type";
import { IPlanet } from "../types/planet.type";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

const IndexPage = () => {
  const [data, setData] = useState<IPlanet[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/planets");
        const result: IAPIResponse = await response.json();
        setData(result?.planets || []);
      } catch (error) {
        console.error("Error fetching CSV data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className={`flex min-h-screen flex-col p-24 ${inter.className}`}>
      {data.length === 0 ? (
        <section className="flex min-h-screen flex-col items-center justify-center p-24">
          <Image
            src="/loader.gif"
            sizes="max-width: 100px) 50vw, 20%"
            height={100}
            width={100}
            alt="Loader"
            unoptimized={true}
          />
        </section>
      ) : (
        <>
          <div className="z-10 max-w-5xl w-full items-center justify-between font-mono lg:flex">
            <h1 className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 text-2xl font-bold">
              List of Habitable Planets
            </h1>
            <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
              <p
                className="flex place-items-center gap-1 p-2 lg:pointer-events-auto lg:p-0"
              >
                Data source:{" "}
                <a
                  href="https://exoplanetarchive.ipac.caltech.edu/docs/KeplerMission.html"
                  className="group rounded-lg border border-transparent px-1 py-1 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                  target="_blank"
                  rel="noopener noreferrer"
                >NASA Exoplanet Archive</a>
              </p>
            </div>
          </div>

          <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 md:grid-cols-2 md:text-left mt-8">
            {data.map((planet) => (
              <div
                key={planet.kepid}
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              >
                <h2 className={`mb-3 text-xl font-semibold`}>
                  {planet.kepler_name}{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    {planet.koi_disposition === "CONFIRMED" && (
                      <Image
                        src="/green_checkmark.jpg"
                        sizes="max-width: 30px) 20vw, 20%"
                        height={22}
                        width={22}
                        alt="Confirmed"
                        unoptimized={true}
                        className="rounded-full"
                      />
                    )}
                  </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  More in-depth information about {planet.kepler_name}
                </p>
                <span className="inline-block text-sm mx-0.5 color: rgb(107 114 128);">
                  KOI Score: {planet.koi_score}
                </span>
                <span className="inline-block text-sm mx-0.5 color: rgb(107 114 128);">
                  KOI Period: {planet.koi_period}
                </span>
                <span className="inline-block text-sm mx-0.5 color: rgb(107 114 128);">
                  KOI Time 0bk: {planet.koi_time0bk}
                </span>
                <span className="inline-block text-sm mx-0.5 color: rgb(107 114 128);">
                  KOI Impact: {planet.koi_impact}
                </span>
                <span className="inline-block text-sm mx-0.5 color: rgb(107 114 128);">
                  KOI Duration: {planet.koi_duration}
                </span>
                <span className="inline-block text-sm mx-0.5 color: rgb(107 114 128);">
                  KOI Depth: {planet.koi_depth}
                </span>
                <span className="inline-block text-sm mx-0.5 color: rgb(107 114 128);">
                  KOI Insol: {planet.koi_insol}
                </span>
              </div>
            ))}
          </div>

          <div className="overflow-x-scroll w-full mt-8">
          <h2 className={`mb-3 text-xl font-semibold underline mt-2 mb-6`}>Planets Full Details</h2>
            <table className="table-auto text-sm">
              <thead>
                <tr>
                  {data.length > 0 &&
                    Object.keys(data[0]).map((header) => (
                      <th key={header} className="border border-slate-600 p-2">
                        {header}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="opacity-70">
                {data.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, idx) => (
                      <td key={idx} className="border border-slate-700 p-2">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
};

export default IndexPage;
