import axios from "axios";

export const loginUser = async (userLogin: unknown) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login_check`,
      userLogin
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching expense transactions:", error);
    throw error;
  }
};

export const logoutUser = async (token: unknown) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/token/invalidate`,
      token
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching expense transactions:", error);
    throw error;
  }
};

export const refreshAccessToken = async (refresh_token: unknown) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/token/refresh`,
      {refresh_token}
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};
