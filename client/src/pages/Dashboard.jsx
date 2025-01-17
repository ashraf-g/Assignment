
import React, { useState } from "react";
import MonthDropdown from "../components/MonthDropdown";
import SearchTransactions from "../components/SearchTransactions";
import TransactionStatistics from "../components/TransactionStatistics";
import TransactionsBarChart from "../components/TransactionsBarChart";
import TransactionsTable from "../components/TransactionTable";
import Layout from "../components/Layout";

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("TransactionsTable");

  return (
    <Layout activeSection={activeSection} setActiveSection={setActiveSection}>
      <MonthDropdown selectedMonth={selectedMonth} onChangeMonth={setSelectedMonth} />
      <SearchTransactions searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {activeSection === "TransactionsTable" && (
        <TransactionsTable selectedMonth={selectedMonth} searchQuery={searchQuery} />
      )}
      {activeSection === "TransactionStatistics" && (
        <TransactionStatistics selectedMonth={selectedMonth} />
      )}
      {activeSection === "TransactionsBarChart" && (
        <TransactionsBarChart selectedMonth={selectedMonth} />
      )}
    </Layout>
  );
};

export default Dashboard;
