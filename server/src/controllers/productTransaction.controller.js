const ProductTransaction = require("../models/productTransaction.model");

exports.getProductTransactions = async (req, res) => {
  try {
    const { month, search = "", page = 1, perPage = 10 } = req.query;

    if (!month) {
      return res.status(400).json({ message: "Month is required." });
    }

    const monthIndex = new Date(Date.parse(`${month} 1, 2020`)).getMonth();

    if (monthIndex === NaN || monthIndex < 0 || monthIndex > 11) {
      return res.status(400).json({ message: "Invalid month provided." });
    }

    // Building the search query
    const query = {
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] }, // Match month
    };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { price: !isNaN(parseFloat(search)) ? parseFloat(search) : undefined },
      ].filter((q) => q.price !== undefined || q.title || q.description);
    }

    // Pagination
    const limit = parseInt(perPage, 10);
    const skip = (parseInt(page, 10) - 1) * limit;

    // Fetching records
    const transactions = await ProductTransaction.find(query)
      .skip(skip)
      .limit(limit);

    // Counting total records for pagination
    const totalRecords = await ProductTransaction.countDocuments(query);

    res.status(200).json({
      message: "Transactions fetched successfully",
      data: transactions,
      pagination: {
        page: parseInt(page, 10),
        perPage: limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductStatistics = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: "Month is required." });
    }

    const monthIndex = new Date(Date.parse(`${month} 1, 2020`)).getMonth();

    if (monthIndex === NaN || monthIndex < 0 || monthIndex > 11) {
      return res.status(400).json({ message: "Invalid month provided." });
    }

    const query = {
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] },
    };

    // Fetching statistics
    const totalSaleAmount = await ProductTransaction.aggregate([
      { $match: query },
      { $match: { sold: true } },
      { $group: { _id: null, totalAmount: { $sum: "$price" } } },
    ]);

    const totalSoldItems = await ProductTransaction.countDocuments({
      ...query,
      sold: true,
    });
    const totalNotSoldItems = await ProductTransaction.countDocuments({
      ...query,
      sold: false,
    });

    res.status(200).json({
      message: "Statistics fetched successfully",
      data: {
        totalSaleAmount: totalSaleAmount[0]?.totalAmount || 0,
        totalSoldItems,
        totalNotSoldItems,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductBarChart = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: "Month is required." });
    }

    const monthIndex = new Date(Date.parse(`${month} 1, 2020`)).getMonth();

    if (monthIndex === NaN || monthIndex < 0 || monthIndex > 11) {
      return res.status(400).json({ message: "Invalid month provided." });
    }

    const query = {
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] },
    };

    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];

    // now for each price range, counting the items in that range
    const priceRangeCounts = await Promise.all(
      priceRanges.map(async (range) => {
        const count = await ProductTransaction.countDocuments({
          ...query,
          price: { $gte: range.min, $lte: range.max },
        });
        return {
          priceRange: `${range.min} - ${
            range.max === Infinity ? "above" : range.max
          }`,
          count,
        };
      })
    );

    res.status(200).json({
      message: "Bar chart data fetched successfully",
      data: priceRangeCounts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductPieChart = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: "Month is required." });
    }
    const monthIndex = new Date(Date.parse(`${month} 1, 2020`)).getMonth();

    if (monthIndex === NaN || monthIndex < 0 || monthIndex > 11) {
      return res.status(400).json({ message: "Invalid month provided." });
    }
    const query = {
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] },
    };

    const categoryCounts = await ProductTransaction.aggregate([
      { $match: query },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $project: { _id: 0, category: "$_id", count: 1 } },
    ]);

    res.status(200).json({
      message: "Pie chart data fetched successfully",
      data: categoryCounts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductCombinedChart = async (req, res) => {
  try {
    const { month, search = "", page = 1, perPage = 10 } = req.query;

    if (!month) {
      return res.status(400).json({ message: "Month is required." });
    }

    const monthIndex = new Date(Date.parse(`${month} 1, 2020`)).getMonth();

    if (monthIndex === NaN || monthIndex < 0 || monthIndex > 11) {
      return res.status(400).json({ message: "Invalid month provided." });
    }

    // 1. Fetching Transaction Data
    const transactionQuery = {
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] },
    };

    if (search) {
      const searchRegex = new RegExp(search, "i");
      transactionQuery.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { price: searchRegex },
      ];
    }

    const transactions = await ProductTransaction.find(transactionQuery)
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalTransactions = await ProductTransaction.countDocuments(
      transactionQuery
    );

    // 2. Fetching Statistics Data
    const statistics = await ProductTransaction.aggregate([
      {
        $match: { $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] } },
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: "$price" },
          totalSoldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },
          totalNotSoldItems: {
            $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] },
          },
        },
      },
      { $project: { _id: 0 } },
    ]);

    // 3. Fetching Pie Chart Data
    const pieChartData = await ProductTransaction.aggregate([
      {
        $match: { $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] } },
      },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $project: { _id: 0, category: "$_id", count: 1 } },
    ]);
    //Combining data into one JSOn object and sending response
    res.status(200).json({
      transactions: {
        total: totalTransactions,
        currentPage: page,
        perPage,
        data: transactions,
      },
      statistics: statistics[0] || {
        totalSaleAmount: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0,
      },
      pieChartData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
