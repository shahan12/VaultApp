import axios from "axios";

export default axios.create({
  baseURL: "https://apivaultreact.herokuapp.com/safes",
});
