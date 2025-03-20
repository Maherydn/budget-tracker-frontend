import api from "@/app/_services/api";
// import axios from "axios";


export const fetchTransactions = async (  ) => {
  try {
    const response = await api.get(`/api/transaction`);
    return response.data
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const createTransaction = async (transactionData: unknown) => {
  try {
    const response = await api.post(
      `/api/transaction/create`,
      transactionData
    );
    console.log("User created:", response.data); 
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

export const updateTransaction = async (transactionData: unknown, id: number) => {
    try {
      const response = await api.post(
        `/api/transaction/update/${id}`,
        transactionData
      );
      console.log("User created:", response.data); 
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  
