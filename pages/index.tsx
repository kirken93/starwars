import { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { Data } from "../types/Data";
import ManufacturerSelect from "../components/ManufacturerSelect";
import getStarships from "../data/getStarships";

const Index: NextPage = () => {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStarships().then((data) => {
      setData(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return <ManufacturerSelect data={data} />;
};

export default Index;
