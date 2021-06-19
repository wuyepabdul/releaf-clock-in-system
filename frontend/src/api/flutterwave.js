import axios from "axios";

// get all transdactions
export const getAllTransactions = async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_FLUTTER_SECRET}`,
      },
    };

    const data = await axios
      .get(`https://api.flutterwave.com/v3/transactions`, config)
      .then((response) => console.log(response))
      .catch((err) => err);
    return data;
  } catch (error) {
    console.log("getAll transactions error: ", error.message);
  }
};

// verify a transaction
export const verifyTransaction = async (trans_ref, userToken) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    const response = await axios.get(
      `/api/orders/verifyPayment/${trans_ref}`,
      config
    );
    console.log("verifyTransaction data: ", response);
    return response;
  } catch (error) {
    console.log("verifyTransaction error: ", error.message);
  }
};
