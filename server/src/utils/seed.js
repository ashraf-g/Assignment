const axios = require("axios");
const ProductTransaction = require("../models/productTransaction.model");
const dbConnect = require("../configs/db.connect");

// Function to connect to the database
const connectToDatabase = async () => {
  try {
    await dbConnect();
    console.log("Database connected...");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

// Function to fetch transaction data from the API
const fetchTransactionData = async () => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    console.log("Fetched data from API...");
    return response.data;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error;
  }
};

// Function to seed the fetched data into the database
const seedTransactionData = async (transactions) => {
  try {
    await ProductTransaction.insertMany(transactions);
    console.log("Data seeded into database!");
  } catch (error) {
    console.error("Error seeding data into database:", error);
    throw error;
  }
};

// Main function to handle the seeding process
const seedDatabase = async () => {
  try {
    await connectToDatabase();
    const transactions = await fetchTransactionData();
    await seedTransactionData(transactions);
    console.log("Seeding complete..!!");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
  }
};

seedDatabase();
