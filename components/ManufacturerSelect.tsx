import React from "react";
import useManufacturer from "../hooks/useManufacturer";
import { Data } from "../types/Data";
import Select from "./Select";
import Table from "./Table";

const ManufacturerSelect = ({ data }: { data: Data | null }) => {
  const {
    starships,
    filteredStarships,
    manufacturerOptions,
    manufacturer,
    setManufacturer
  } = useManufacturer(data);

  return (
    <div>
      <Select
        label="Manufacturer"
        value={manufacturer}
        options={manufacturerOptions}
        onChange={setManufacturer}
        id="starship-select"
      />
      <Table rows={filteredStarships} total={starships.length} />
    </div>
  );
};

export default ManufacturerSelect;
