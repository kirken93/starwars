import { useState } from "react";
import { Data } from "../types/Data";
import { Starship } from "../types/Starship";

const useManufacturer = (data: Data | null) => {
  const [manufacturer, setManufacturer] = useState<string>("");

  const starships: Starship[] = data
    ? data.results.map((star: { manufacturer: string; name: string }) => {
        return {
          ...star,
          manufacturer: star.manufacturer.split(",").map((m) => m.trim())
        };
      })
    : [];

  const filteredStarships = manufacturer
    ? starships.filter((starship) =>
        starship.manufacturer.some((m) => m === manufacturer)
      )
    : starships;

  const manufacturerOptions = starships
    .flatMap((s) => s.manufacturer)
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();

  return {
    starships,
    filteredStarships,
    manufacturerOptions,
    manufacturer,
    setManufacturer
  };
};

export default useManufacturer;
