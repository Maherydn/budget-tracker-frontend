"use client";

import React from "react";
import { Income } from "./_components/income/Income";
import { Expense } from "./_components/expense/Expense";
import { Stats } from "./_components/stats/Stats";

const Page = () => {
  return (
    <section className="flex flex-col lg:flex-row gap-2 px-6 ">
      <Stats />
      <Income />
      <Expense />
    </section>
  );
};

export default Page;
