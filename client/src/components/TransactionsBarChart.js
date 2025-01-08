import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import ProductTransaction from "../services/productTransaction.service"; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TransactionsBarChart = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await ProductTransaction.getBarChart(selectedMonth);
        
        const priceRanges = response.data.data.map(item => item.priceRange);
        const itemsSold = response.data.data.map(item => item.count);

        // Update chartData state with fetched data
        setChartData({
          priceRanges,
          itemsSold,
        });
      } catch (error) {
        console.error("Error fetching chart data", error);
      }
    };

    if (selectedMonth) {
      fetchChartData();
    }
  }, [selectedMonth]); 

  const data = {
    labels: chartData?.priceRanges || [],
    datasets: [
      {
        label: "# of Items Sold",
        data: chartData?.itemsSold || [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return chartData ? (
    <div style={{ width: "80%", height: "400px" }}>
      <Bar data={data} width={400} height={200} />
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default TransactionsBarChart;
