import { NextPage } from "next";
import ManufacturerSelect from "../components/ManufacturerSelect";
import { Data } from "../types/Data";

const SSR: NextPage<{ data: Data }> = ({ data }) => {
  return <ManufacturerSelect data={data} />;
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

export default SSR;
