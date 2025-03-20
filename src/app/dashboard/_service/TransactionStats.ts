import api from "@/app/_services/api";

export const fetchTransactionStats = async (year: number, month: number) => {
  try {
    const response = await api.get(
      `/transaction-stats/total/${year}/${month}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
