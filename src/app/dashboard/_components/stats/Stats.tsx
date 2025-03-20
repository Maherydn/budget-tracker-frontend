"use client";
import React, { useEffect, useState } from "react";
import { StatsFilterMonths } from "./StatsFilterMonths";
import { StatsFilterYears } from "./StatsFilterYears";
import { useDateContext } from "../../_context/DateContext";
import { monthToNumber } from "../../_utils/formatDate";
import { fetchTransactionStats } from "../../_service/TransactionStats";
import { useRefresh } from "../../_hook/RefreshContext";

export const Stats = () => {
  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedMonth, setSelectedMonth] = useState<string>();
  const [stats, setStats] = useState<unknown[]>();
  const { year, month, setYear, setMonth } = useDateContext();
  const { refresh } = useRefresh();

  const handleSetYear = (year: number) => {
    setSelectedYear(year);
    if (year !== undefined) {
      setYear(year);
    }
    console.log(selectedYear);
    // console.log(year + "" + selectedYear);
  };

  const handleSetMonth = (month: string) => {
    setSelectedMonth(month);

    const monthNumber = monthToNumber(month);
    if (monthNumber !== null) {
      setMonth(monthNumber);
    } else {
      console.error("Mois invalide :", month);
    }

    console.log(selectedMonth);
  };

  // const stats = [
  //   {
  //     type: "Expense",
  //     totalMontant: 1000,
  //   },
  //   {
  //     type: "Income",
  //     totalMontant: 2000,
  //   },
  // ];

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchTransactionStats(year, month);
        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [year, month, refresh]);

  // // recuperation total expense/income
  const total = (stats, type) => {
    const item = stats.find((item) => item.type === type);
    return item ? parseFloat(item.totalMontant) : 0;
  };

  let totalExpense;
  let totalIncome;
  let reste;
  let rayonReste;

  if (stats) {
    totalExpense = total(stats, "Expense");
    console.log(totalExpense);

    totalIncome = total(stats, "Income");

    reste = Math.round((totalExpense * 100) / totalIncome);
    rayonReste = Math.round((reste * 251.2) / 100);
  }

  console.log(rayonReste); // Affichera rayonReste après le bloc `if`

  return (
    <div className="mx-auto my-4 bg-section pb-4 rounded-md lg:w-1/3 w-80 h-fit">
      <div className="h-16 flex justify-center items-center mx-4">
        <h2 className="text-base text-center font-poppins font-bold text-3xl">
          Stats
        </h2>
      </div>
      <div className="border-dashed border-y border-base/30 mx-4 py-4">
        <div className="bg-box h-20 flex flex-col justify-center items-center gap-2">
          <h3 className="font-poppins text-lg text-base">Available</h3>
          <p className="font-poppins text-2xl text-base">
            {totalIncome - totalExpense} ar
          </p>
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
              className={`${100 - reste < 0 ? "text-red-500" : "text-green"}`}
              stroke-width="10"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
              stroke-dasharray="251.2"
              stroke-dashoffset={rayonReste}
            >
              {/* <!-- % de progression; 251.2=100% --> */}
            </circle>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-base">
            <div
              className={`size-32 flex flex-col justify-center items-center font-montserrat ${
                100 - reste < 0 ? "text-red-500" : ""
              }`}
            >
              <p className={`text-3xl  `}>{100 - reste} %</p>
              <h4 className="text-xl">Reste</h4>
            </div>
          </div>
        </div>
        <div className="h-16 flex gap-2">
          <div className="bg-base rounded-md w-1/2 flex flex-col gap-0.5 justify-center items-center">
            <h3 className="text-lg text-header font-montserrat font-semibold">
              Income
            </h3>
            <p className="text-xl text-green">{totalIncome} ar</p>
          </div>
          <div className="bg-base rounded-md w-1/2 flex flex-col gap-0.5 justify-center items-center">
            <h3 className="text-lg text-header font-montserrat font-semibold">
              spent
            </h3>
            <p className="text-xl text-yellow">{totalExpense} ar</p>
          </div>
        </div>
      </div>
      <div className="h-14  text-base m-4 flex rounded-md shadow-lg gap-px">
        <StatsFilterMonths setMonth={handleSetMonth} />
        <StatsFilterYears setYear={handleSetYear} />
      </div>
    </div>
  );
};
