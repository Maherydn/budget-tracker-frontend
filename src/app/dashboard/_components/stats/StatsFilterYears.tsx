"use client";

import React, { useEffect, useState } from "react";
import { FilterButton } from "../FilterButton";
import { DropIcon } from "../../_assets/icons";

interface StatsFilterYearsPorps {
    setYear: (year: number) => void;
  }

export const StatsFilterYears: React.FC<StatsFilterYearsPorps> = ({setYear}) => {
  const [showYears, setShowYears] = useState<boolean>(false); 
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  useEffect(() => {
    setYear(selectedYear);
  }, [selectedYear, setYear]);

  const dataYears = [
    2025, 2026, 2027, 2028, 2029, 2030,
  ];

  return (
    <>
      <div className="w-1/2 flex justify-center items-center border-transparent border-2 hover:border-base h-full py-4 rounded-lg bg-yellow  duration-300" 
        onClick={() => setShowYears(!showYears)} 
      >
        <div
          className="flex justify-center items-center text-green w-full relative cursor-pointer"
        >
          <div
            className={`${
              showYears ? "block" : "hidden"
            } absolute left-0 bottom-12 mt-2 w-full rounded-lg overflow-hidden z-10 h-32 overflow-y-scroll`}
          >
            {dataYears.map((year) => (
              <FilterButton
                key={year}
                selectedFilter={selectedYear.toString()}
                color={"bg-green"}
                title={year.toString()}
                onClick={() => {
                  setSelectedYear(year); 
                  setShowYears(false);
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-evenly size-full ">
            <button className="text-base w-1/3 font-montserrat text-2xl cursor-pointer">{selectedYear}</button>
            <div className="text-base">
              <DropIcon /> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
