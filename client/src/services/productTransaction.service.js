import http from "./axios";

class ProductTransaction {
  getAll(month, page, perPage, searchText) {
    return http.get(
      `/getAll?month=${month}&search=${searchText}&page=${page}&perPage=${perPage}`
    );
  }
  getStatistics(month) {
    return http.get(`/getStatistics?month=${month}`);
  }
  getBarChart(month) {
    return http.get(`/getBarChart?month=${month}`);
  }
  getPieChart(month) {
    return http.get(`/getPieChart?month=${month}`);
  }
  getCombinedChart(month) {
    return http.get(`/getCombinedChart?month=${month}`);
  }
}

export default new ProductTransaction();
