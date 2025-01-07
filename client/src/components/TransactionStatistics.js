import React, { useState, useEffect } from "react";
import ProductTransaction from "../services/productTransaction.service"; // Ensure this path is correct

const TransactionStatistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const response = await ProductTransaction.getStatistics(selectedMonth);
        setStatistics(response.data.data); // Assuming the response data contains the statistics in the `data` object
      } catch (error) {
        setError("Error fetching statistics");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedMonth) {
      fetchStatistics();
    }
  }, [selectedMonth]);

  if (loading) return <p>Loading statistics...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white shadow-md p-4 rounded-lg mb-6">
      <h3 className="text-3xl font-extrabold text-blue-600 mb-4 text-center">
        Transaction Statistics
      </h3>
      <div className="flex space-x-4">
        <div className="flex-1 border border-gray-300 rounded-lg shadow-md p-4">
          <h4 className="font-medium text-center">Total Amount</h4>
          <p className="text-lg text-center">${statistics.totalSaleAmount}</p>
        </div>
        <div className="flex-1 border border-gray-300 rounded-lg shadow-md p-4">
          <h4 className="font-medium text-center">Total Sold Items</h4>
          <p className="text-lg text-center">{statistics.totalSoldItems}</p>
        </div>
        <div className="flex-1 border border-gray-300 rounded-lg shadow-md p-4">
          <h4 className="font-medium text-center">Total Not Sold Items</h4>
          <p className="text-lg text-center">{statistics.totalNotSoldItems}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionStatistics;
