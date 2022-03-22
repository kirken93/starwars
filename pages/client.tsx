import { NextPage } from "next";
import { useEffect, useState } from "react";
import Select from "../components/Select";
import Table from "../components/Table";

interface Starship {
  manufacturer: string[];
  name: string;
}

const Client: NextPage = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://swapi.dev/api/starships")
      .then((res) => res.json())
      .then(async (data) => {
        while (data.next) {
          await fetch(data.next)
            .then((res) => res.json())
            .then((newData) => {
              data.results = data.results.concat(newData.results);
              data.next = newData.next;
            });
        }

        setData(data);
        setIsLoading(false);
      });
  }, []);

  const [manufacturer, setManufacturer] = useState<string>("");

  const starships: Starship[] = data
    ? data.results.map((star: { manufacturer: string }) => {
        return {
          ...star,
          manufacturer: star.manufacturer.split(",").map((m) => m.trim())
        };
      })
    : [];

  const starshipsToUse = manufacturer
    ? starships.filter((starship) =>
        starship.manufacturer.some((m) => m === manufacturer)
      )
    : starships;

  return (
    <div>
      <Select
        label="Manufacturer"
        value={manufacturer}
        options={starships
          .flatMap((s) => s.manufacturer)
          .filter((v, i, a) => a.indexOf(v) === i)}
        onChange={setManufacturer}
        id="starship-select"
        disabled={isLoading}
      />
      <Table rows={starshipsToUse} />
    </div>
  );
};

export default Client;
