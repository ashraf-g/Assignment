module.exports = (app) => {
  require("dotenv").config();
  const base_URL = process.env.BASE_URL;

  const routes = require("express").Router();

  const ProductTransaction = require("../controllers/productTransaction.controller");

  routes.get("/getAll", ProductTransaction.getProductTransactions);
  routes.get("/getStatistics", ProductTransaction.getProductStatistics);
  routes.get("/getBarChart", ProductTransaction.getProductBarChart);
  routes.get("/getPieChart", ProductTransaction.getProductPieChart);
  routes.get("/getCombinedChart", ProductTransaction.getProductCombinedChart);

  app.use(base_URL, routes);
};
