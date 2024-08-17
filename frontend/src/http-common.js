import axios from "axios";
export default axios.create({
  baseURL: "http://54.211.21.101:3000/", // Ensure this is correct
  headers: {
    "Content-type": "application/json"
  }
});
