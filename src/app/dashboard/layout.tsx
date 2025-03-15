import React from "react";
import { Header } from "./_components/Header";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="bg-base w-full overflow-hidden">
        <Header/>
        {children}
    </main>
  );
};

export default Layout;
