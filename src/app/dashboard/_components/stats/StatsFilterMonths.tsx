"use client";

import React, { useEffect, useState } from "react";
import { FilterButton } from "../FilterButton";
import { DropIcon } from "../../_assets/icons";

interface StatsFilterMonthsPorps {
  setMonth: (month: string) => void;
}

export const StatsFilterMonths: React.FC<StatsFilterMonthsPorps> = ({setMonth}) => {
  const [showMonths, setShowMonths] = useState<boolean>(false); 
  const [selectedMonth, setSelectedMonth] = useState<string>("janvier");

   useEffect(() => {
      setMonth(selectedMonth);
    }, [selectedMonth, setMonth]);

  const Months = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre",
  ];

  return (
    <>
      <div className="w-1/2 flex justify-center items-center border-transparent border-2 hover:border-base h-full py-4 rounded-lg bg-yellow  duration-300"
      onClick={() => setShowMonths(!showMonths)} 
      >
        <div
          className="flex justify-center items-center text-green w-full relative cursor-pointer"
        >
          <div
            className={`${
              showMonths ? "block" : "hidden"
            } absolute left-0 bottom-12 mt-2 w-full rounded-lg overflow-hidden z-10 h-32 overflow-y-scroll`}
          >
            {Months.map((month) => (
              <FilterButton
                key={month}
                selectedFilter={selectedMonth}
                color={"bg-green"}
                title={month}
                onClick={() => {
                  setSelectedMonth(month); 
                  setShowMonths(false);
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-evenly size-full  ">
            <button className="text-base w-1/3 cursor-pointer font-poppins font-semibold text-xl">{selectedMonth}</button>
            <div className="text-base ">
              <DropIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
