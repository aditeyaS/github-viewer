import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.github.com/",
  timeout: 3000,
  headers: {
    "Content-Type": "application/vnd.github.v3+json",
  },
});

// const getUserData = async (username: string) => {
//   const response = ;
// };
