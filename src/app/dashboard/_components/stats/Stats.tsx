"use client";
import React, { useState } from "react";
import {  StatsFilterMonths } from "./StatsFilterMonths";
import { StatsFilterYears } from "./StatsFilterYears";

export const Stats = () => {

  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedMonth, setSelectedMonth] = useState<string>();

  const handleSetYear = (year: number) => {
    setSelectedYear(year);
    console.log(selectedYear);
    
  };
  const handleSetMonth = (month: string) => {
    setSelectedMonth(month);
    console.log(selectedMonth);
    
  };

  return (
    <div className="mx-auto my-4 bg-section pb-4 rounded-md lg:w-1/3 w-80 h-fit">
      <div className="h-16 flex justify-center items-center mx-4">
        <h2 className="text-base text-center font-poppins font-bold text-3xl">
          Calculation
        </h2>
      </div>
      <div className="border-dashed border-y border-base/30 mx-4 py-4">
        <div className="bg-box h-20 flex flex-col justify-center items-center gap-2">
          <h3 className="font-poppins text-lg text-base">Income</h3>
          <p className="font-poppins text-2xl text-base">20.000 ar</p>
        </div>
        <div className="relative w-full h-60">
          {/* <!-- Cercle de fond --> */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-300"
              stroke-width="10"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            ></circle>
            {/* <!-- Cercle de progression --> */}
            <circle
              className="text-green"
              stroke-width="10"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
              stroke-dasharray="251.2"
              stroke-dashoffset="125.6"
            >
              {/* <!-- % de progression; 251.2=100% --> */}
            </circle>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-base">
            <div className="size-24 flex flex-col justify-center items-center font-montserrat">
              <p className="text-4xl">50 %</p>
              <h4 className="text-xl">spent</h4>
            </div>
          </div>
        </div>
        <div className="h-16 flex gap-2">
          <div className="bg-base rounded-md w-1/2 flex flex-col gap-0.5 justify-center items-center">
            <h3 className="text-lg text-header font-montserrat font-semibold">
              available
            </h3>
            <p className="text-xl text-green">100.000 ar</p>
          </div>
          <div className="bg-base rounded-md w-1/2 flex flex-col gap-0.5 justify-center items-center">
            <h3 className="text-lg text-header font-montserrat font-semibold">
              spent
            </h3>
            <p className="text-xl text-yellow">100.000 ar</p>
          </div>
        </div>
      </div>
      <div className="h-14  text-base m-4 flex rounded-md shadow-lg gap-px">
        <StatsFilterMonths setMonth={handleSetMonth}/>
        <StatsFilterYears setYear={handleSetYear}/>
      </div>
    </div>
  );
};
