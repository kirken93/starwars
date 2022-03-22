import { NextPage } from "next";
import { useState } from "react";
import Select from "../components/Select";
import Table from "../components/Table";
import { Starship } from "../types/Starship";

const Server: NextPage<{ data: any }> = ({ data }) => {
  const [manufacturer, setManufacturer] = useState<string>("");

  const starships: Starship[] = data.results.map(
    (star: { manufacturer: string }) => {
      return {
        ...star,
        manufacturer: star.manufacturer.split(",").map((m) => m.trim())
      };
    }
  );

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
      />
      <Table rows={starshipsToUse} />
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch("https://swapi.dev/api/starships");
  const data = await res.json();

  // get multiple pages of data if needed
  while (data.next) {
    const nextRes = await fetch(data.next);
    const newData = await nextRes.json();

    // combine results
    data.results = data.results.concat(newData.results);
    data.next = newData.next;
  }
  return { props: { data } };
}

export default Server;
