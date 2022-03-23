import { NextPage } from "next";
import ManufacturerSelect from "../components/ManufacturerSelect";
import getStarships from "../data/getStarships";
import { Data } from "../types/Data";

const SSR: NextPage<{ data: Data }> = ({ data }) => {
  return <ManufacturerSelect data={data} />;
};

export async function getServerSideProps() {
  const data = await getStarships();
  return { props: { data } };
}

export default SSR;
