import React, { useEffect, useState } from "react";
import { FilterButton } from "../FilterButton";
import { DropIcon } from "../../_assets/icons";

interface ExpenseFilterPorps {
  setFilter: (filter: string) => void;
}

export const ExpenseFilter: React.FC<ExpenseFilterPorps> = ({ setFilter }) => {
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  useEffect(() => {
    setFilter(selectedFilter);
  }, [selectedFilter, setFilter]);

  const filterData = [
    { id: 1, title: "food" },
    { id: 2, title: "salary" },
    { id: 3, title: "doc" },
    { id: 4, title: "test" },
  ];
  return (
    <>
      <div
        className="flex gap-4 border border-yellow rounded-lg py-2 w-44 cursor-pointer"
        onClick={() => setShowFilter(!showFilter)}
      >
        <h3 className="text-header border-r border-header px-4 w-1/2 ">
          Filtre
        </h3>
        <div className="flex justify-center items-center text-yellow  w-1/2 relative">
          <div
            className={` ${
              showFilter && "hidden"
            } absolute  left-0 top-8 mt-2 w-full  rounded-lg overflow-hidden z-10`}
          >
            {filterData.map((data) => (
              <FilterButton
                key={data.id}
                selectedFilter={selectedFilter}
                color={"bg-yellow"}
                title={data.title}
                onClick={() => {
                  setSelectedFilter(data.title);
                  setShowFilter(true);
                }}
              />
            ))}
          </div>
          <div className="flex items-center  size-full ">
            <button className="text-yellow  w-full cursor-pointer">
              {selectedFilter}
            </button>
            <div className="text-yellow pr-4">
              <DropIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
