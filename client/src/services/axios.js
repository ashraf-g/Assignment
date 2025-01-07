import axios from "axios";

const URL = "http://localhost:5000/api/v1";

// Create an axios instance
const makeRequest = axios.create({
  baseURL: URL,
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
});

export default makeRequest;
