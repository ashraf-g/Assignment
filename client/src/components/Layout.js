
import React from "react";
import Sidenav from "./Sidenav";

const Layout = ({ children, activeSection, setActiveSection }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidenav activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content */}
      <div className="ml-64 w-full p-6 overflow-y-auto">{children}</div>
    </div>
  );
};

export default Layout;
