import React from "react";
import Header from "./header";
import Sidebar from "./sidebar";

type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto relative">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
