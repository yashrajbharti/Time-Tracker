import { URL } from "../utils/url.mjs";
const ENDPOINT = "auth/validate";

const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (e) {
    return null;
  }
};

export const isAuthenticated = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const payload = decodeToken(token);
  if (!payload) {
    localStorage.removeItem("token");
    localStorage.removeItem("employeeId");
    return false;
  }

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) {
    localStorage.removeItem("token");
    localStorage.removeItem("employeeId");
    return false;
  }

  try {
    const response = await fetch(URL + ENDPOINT, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      localStorage.removeItem("token");
      localStorage.removeItem("employeeId");
      return false;
    }

    const data = await response.json();

    if (data.role !== "employee") {
      localStorage.removeItem("token");
      localStorage.removeItem("employeeId");
      return false;
    }

    return data;
  } catch (error) {
    console.error("Auth validation failed:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("employeeId");
    return false;
  }
};
