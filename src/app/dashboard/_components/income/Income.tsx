import React, { useState } from "react";
import { IncomeFilter } from "./IncomeFilter";
import { TransactionItem } from "../TransactionItem";

export const Income = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>();

  const handleSetFilter = (filter: string) => {
    setSelectedFilter(filter);
    console.log(selectedFilter);
  };

  const transactions = [
    { category: "Food", date: "January 12, 2023", amount: 25.5 },
    { category: "Food", date: "January 15, 2023", amount: 30.75 },
    { category: "Food", date: "February 2, 2023", amount: 12.4 },
    { category: "Doc", date: "February 10, 2023", amount: 100 },
    { category: "Doc", date: "March 5, 2023", amount: 250 },
    { category: "Doc", date: "March 20, 2023", amount: 75.99 },
    { category: "Salary", date: "April 1, 2023", amount: 2800 },
    { category: "Salary", date: "May 1, 2023", amount: 2900 },
    { category: "Salary", date: "June 1, 2023", amount: 3000 },
    { category: "Test", date: "June 15, 2023", amount: 50 },
    { category: "Test", date: "July 3, 2023", amount: 75 },
    { category: "Test", date: "July 20, 2023", amount: 90.25 },
    { category: "Test", date: "August 5, 2023", amount: 110 },
  ];

  const transactionsFilter = transactions.filter((transaction) => {
    if (selectedFilter?.toLowerCase() === "all") {
      return true;
    }

    return transaction.category.toLowerCase() === selectedFilter?.toLowerCase();
  });

  return (
    <div className="border-t border-header/50 mx-6 my-4 flex flex-col lg:w-1/3 lg:border-none">
      <div className="flex items-center justify-between h-28 gap-2">
        <h2 className="text-3xl font-semibold font-poppins text-green">
          Income
        </h2>
        <IncomeFilter setFilter={handleSetFilter} />
      </div>
      <div className="h-96 overflow-y-scroll px-4">
        {transactionsFilter.map((transaction, index) => (
          <TransactionItem
            key={index}
            category={transaction.category}
            amount={transaction.amount}
            date={transaction.date}
            color='bg-green'
          />
        ))}
      </div>
      <button className="px-2 py-1 text-xl w-1/2 rounded-full mx-auto text-white hover:bg-green hover:text-base duration-300 border border-green mt-4">
        Inocme
      </button>
    </div>
  );
};
