import axios from "axios";

// login api request
export const login = async (userData) => {
  try {
    const { data } = await axios.post("/api/auth/login", userData);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

// create staff api request
export const register = async (userData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post("/api/auth/create", userData, config);
    return response;
  } catch (error) {
    console.log("error", error.message);
  }
};
