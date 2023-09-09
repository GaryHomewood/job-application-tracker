import axios from 'axios';

const token = import.meta.env.VITE_API_TOKEN

export default axios.create({
  baseURL: "http://localhost:1337",
  headers: {
    "Authorization": `bearer ${token}`,
    "Content-type": "application/json",
  },
})