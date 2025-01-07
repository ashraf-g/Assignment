import React, { useState, useEffect } from "react";
import ProductTransaction from "../services/productTransaction.service";

const TransactionsTable = ({ selectedMonth, searchQuery }) => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0); // Total number of records for pagination
  const [totalPages, setTotalPages] = useState(0); // Total number of pages for pagination
  const [perPage] = useState(2); // Set the number of records per page to 2

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await ProductTransaction.getAll(
          selectedMonth,
          currentPage,
          perPage,
          searchQuery
        );
        console.log("Response", response);
        setTransactions(response.data.data);
        setTotalRecords(response.data.pagination.totalRecords); // Set total records count
        setTotalPages(response.data.pagination.totalPages); // Set total pages count
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };
    fetchTransactions();
  }, [selectedMonth, searchQuery, currentPage, perPage]);

  // Ensure the current page doesn't exceed totalPages
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Image</th> {/* New Image Column */}
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-4 py-2 border">
                  {/* Displaying Image */}
                  <img
                    src={transaction.image} // Assuming `image` is the field containing the image URL
                    alt={transaction.title}
                    // className="w-16 h-16 object-cover rounded-full"
                  />
                </td>
                <td className="px-4 py-2 border">{transaction.title}</td>
                <td className="px-4 py-2 border">{transaction.description}</td>
                <td className="px-4 py-2 border">${transaction.price}</td>
                <td className="px-4 py-2 border">{transaction.dateOfSale}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center px-4 py-2 border">
                No transactions available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          {/* Page numbers */}
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`p-2 rounded-md mx-1 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionsTable;
