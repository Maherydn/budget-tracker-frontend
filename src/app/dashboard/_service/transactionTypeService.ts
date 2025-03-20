import api from "@/app/_services/api";

export const fetchExpenseTransactions = async (year: number, month: number) => {
  try {
    const response = await api.get(
      `/api/transaction-type/expense/${year}/${month}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching expense transactions:", error);
    throw error;
  }
};

export const fetchIncomeTransactions = async (year: number, month: number) => {
  try {
    const response = await api.get(
      `/api/transaction-type/income/${year}/${month}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching income transactions:", error);
    throw error;
  }
};
