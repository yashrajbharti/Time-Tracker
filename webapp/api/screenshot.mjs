import { URL } from "../utils/url.mjs";

const ENDPOINT = "screenshot";

export const getScreenshots = async (employeeId, projectId, start, end) => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("Unauthorized: No token found");

  const params = new URLSearchParams();

  if (employeeId) params.append("employeeId", employeeId);
  if (projectId) params.append("projectId", projectId);
  if (start) params.append("start", start);
  if (end) params.append("end", end);

  const queryString = params.toString() ? `?${params.toString()}` : "";

  try {
    const response = await fetch(URL + ENDPOINT + queryString, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok)
      throw new Error(data.error || "Failed to fetch screenshots");

    return data;
  } catch (error) {
    console.error("Fetching screenshots failed:", error);
    throw error;
  }
};
