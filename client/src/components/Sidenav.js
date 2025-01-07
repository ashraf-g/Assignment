// src/components/Sidenav.js
import React from "react";

const Sidenav = ({ activeSection, setActiveSection }) => {
  return (
    <div className="fixed top-0 left-0 w-64 bg-gray-800 text-white p-6 h-screen">
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      <ul>
        <li
          onClick={() => setActiveSection("TransactionsTable")}
          className={`cursor-pointer py-2 px-4 mb-2 ${
            activeSection === "TransactionsTable" ? "bg-blue-600" : ""
          }`}
        >
          Transactions Table
        </li>
        <li
          onClick={() => setActiveSection("TransactionStatistics")}
          className={`cursor-pointer py-2 px-4 mb-2 ${
            activeSection === "TransactionStatistics" ? "bg-blue-600" : ""
          }`}
        >
          Transaction Statistics
        </li>
        <li
          onClick={() => setActiveSection("TransactionsBarChart")}
          className={`cursor-pointer py-2 px-4 mb-2 ${
            activeSection === "TransactionsBarChart" ? "bg-blue-600" : ""
          }`}
        >
          Transactions Bar Chart
        </li>
      </ul>
    </div>
  );
};

export default Sidenav;
