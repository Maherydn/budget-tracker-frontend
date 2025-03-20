"use client"
import React from "react";
import { Header } from "./_components/Header";
import { RefreshProvider } from "./_hook/RefreshContext";
import { DateContextProvider } from "./_context/DateContext";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="bg-base w-full overflow-hidden">
      <RefreshProvider>
        <DateContextProvider>
          <Header />
          {children}
        </DateContextProvider>
      </RefreshProvider>
    </main>
  );
};

export default Layout;
