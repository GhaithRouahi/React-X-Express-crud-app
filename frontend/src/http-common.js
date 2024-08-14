import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/", // Ensure this is correct
  headers: {
    "Content-type": "application/json"
  }
});