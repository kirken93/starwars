import { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { Data } from "../types/Data";
import ManufacturerSelect from "../components/ManufacturerSelect";

const Index: NextPage = () => {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return <ManufacturerSelect data={data} />;
};

export default Index;
