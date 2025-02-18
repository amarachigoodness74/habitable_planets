import { useState, useMemo, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { LayoutGrid, Table } from "lucide-react";
import Header from "@/components/Header";
import ExoplanetGrid from "@/components/ExoplanetGrid";
import ExoplanetTable from "@/components/ExoplanetTable";
import { IPlanet, KoiDisposition } from "@/types/planet.type";
import {
  isSearch,
  matchesDisposition,
  matchesInsolationFlux,
  matchesRadius,
  matchesTemperature,
  usePlanetsData,
} from "./utils/helpers";
import PageLoader from "@/components/PageLoader";
import ScrollToTop from "@/components/ScroolToTopBtn";

enum types {
  CARD = "card",
  TABLE = "table",
}

export default function ExoplanetExplorer() {
  const { data, error, isLoading } = usePlanetsData();
  const [displyType, setDisplyType] = useState<string>(types.TABLE);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleItems, setVisibleItems] = useState(24);

  const itemsPerPage = 100;
  const totalPages = data ? Math.ceil(data.planets.length / itemsPerPage) : 0;

  // Filtering state variables
  const [radiusRange, setRadiusRange] = useState<number | null>(null);
  const [temperatureRange, setTemperatureRange] = useState<number | null>(null);
  const [insolationFluxRange, setInsolationFluxRange] = useState<number | null>(
    null
  );
  const [disposition, setDisposition] = useState<KoiDisposition | null>(null);

  const filteredPlanets = useMemo(() => {
    if (!data?.planets) return [];

    return data.planets.filter((planet: IPlanet) => {
      if (
        debouncedSearch &&
        planet.kepler_name &&
        isSearch(String(debouncedSearch), planet.kepler_name)
      ) {
        return planet;
      } else if (radiusRange && matchesRadius(radiusRange, planet.koi_prad)) {
        return planet;
      } else if (
        temperatureRange &&
        matchesTemperature(temperatureRange, planet.koi_teq)
      ) {
        return planet;
      } else if (
        temperatureRange &&
        matchesTemperature(temperatureRange, planet.koi_teq)
      ) {
        return planet;
      } else if (
        insolationFluxRange &&
        matchesInsolationFlux(insolationFluxRange, planet.koi_insol)
      ) {
        return planet;
      } else if (
        disposition &&
        matchesDisposition(disposition, planet.koi_disposition)
      ) {
        return planet;
      } else {
        return planet;
      }
    });
  }, [
    debouncedSearch,
    data?.planets,
    radiusRange,
    temperatureRange,
    insolationFluxRange,
    disposition,
  ]);

  useEffect(() => {
    setCurrentPage(1); // Reset pagination when search changes
  }, [debouncedSearch]);

  const paginatedPlanets = useMemo(() => {
    if (!filteredPlanets) return [];
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPlanets.slice(start, start + itemsPerPage);
  }, [filteredPlanets, currentPage]);

  const visibleGridPlanets = useMemo(() => {
    return filteredPlanets ? filteredPlanets.slice(0, visibleItems) : [];
  }, [filteredPlanets, visibleItems]);

  const loadMore = () => {
    setVisibleItems((prev) => prev + 24);
  };

  if (isLoading) return <PageLoader />;
  if (error)
    return (
      <p className="flex items-center justify-center h-screen">
        Error: {error.message}
      </p>
    );

  console.log("filter =======================", filteredPlanets.length);
  console.log("radiusRange =======================", radiusRange);
  console.log("temperatureRange =======================", temperatureRange);
  console.log("insolationFluxRange ===========", insolationFluxRange);
  console.log("disposition ===========", disposition);
  return (
    <>
      <Header />
      <div className="flex flex-wrap gap-4 p-4 rounded-lg">
        {/* Radius Filter */}
        <div className="flex flex-col">
          <label>Radius (Earth Radii)</label>
          <input
            type="range"
            min="0"
            max="160"
            value={radiusRange || 0}
            onChange={(e) => setRadiusRange(Number(e.target.value))}
            className="cursor-pointer my-2"
          />
          {radiusRange && <span>{radiusRange} Earth Radii</span>}
        </div>

        {/* Temperature Filter */}
        <div className="flex flex-col">
          <label>Temperature (°C)</label>
          <input
            type="range"
            min="0"
            max="2700"
            step="10"
            value={temperatureRange || 0}
            onChange={(e) => setTemperatureRange(Number(e.target.value))}
            className="cursor-pointer my-2"
          />
          {temperatureRange && <span>{temperatureRange}°C</span>}
        </div>

        {/* Insolation Flux Filter */}
        <div className="flex flex-col">
          <label>Insolation Flux</label>
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={insolationFluxRange || 0}
            onChange={(e) => setInsolationFluxRange(Number(e.target.value))}
            className="cursor-pointer my-2"
          />
          {insolationFluxRange && <span>{insolationFluxRange}</span>}
        </div>

        {/* Disposition Dropdown */}
        <select
          value={disposition || ""}
          onChange={(e) => setDisposition(e.target.value)}
          className="border rounded-md bg-slate-900"
        >
          <option value="">All</option>
          <option value={KoiDisposition.confirmed}>Confirmed</option>
          <option value={KoiDisposition.candidate}>Candidate</option>
          <option value={KoiDisposition.false_positive}>False Positive</option>
        </select>
      </div>
      <div className="mx-10">
        <div className="flex gap-4 justify-between px-4">
          <div className="relative w-[80%] sm:w-[70%] md:w-[60%] lg:w-[40%] mb-5">
            <input
              type="text"
              placeholder="Search exoplanets by Kepler name..."
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
              onClick={() => setDisplyType(types.TABLE)}
              disabled={displyType === types.TABLE}
              className={`${
                displyType === types.TABLE ? "px-4 rounded-md bg-gray-800" : ""
              }`}
            >
              <Table />
            </button>{" "}
            <button
              onClick={() => setDisplyType(types.CARD)}
              disabled={displyType === types.CARD}
              className={`${
                displyType === types.CARD ? "px-4 rounded-md bg-gray-800" : ""
              }`}
            >
              <LayoutGrid />
            </button>
          </div>
        </div>

        {displyType === types.TABLE &&
        paginatedPlanets &&
        visibleGridPlanets ? (
          <>
            <ExoplanetTable filteredPlanets={paginatedPlanets} />
            {/* Pagination Controls */}
            <div className="flex justify-center space-x-6 mb-20">
              <button
                className="p-2 bg-gray-800 text-white rounded"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              <button
                className="p-2 bg-gray-800 text-white rounded"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <ExoplanetGrid
            filteredPlanets={visibleGridPlanets}
            loadMore={loadMore}
          />
        )}
        <ScrollToTop />
      </div>
    </>
  );
}
