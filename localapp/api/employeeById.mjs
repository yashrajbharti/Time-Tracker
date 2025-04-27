import { URL } from "../utils/url.mjs";
const ENDPOINT = "employee";

export const getEmployeeById = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  try {
    const response = await fetch(`${URL}${ENDPOINT}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch employee");
    }

    return data;
  } catch (error) {
    console.error("Fetch employee failed:", error);
    throw error;
  }
};
