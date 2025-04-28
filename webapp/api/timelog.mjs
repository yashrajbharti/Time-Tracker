import { URL } from "../utils/url.mjs";
const ENDPOINT = "analytics/project-time";

export const getProjectTime = async (employeeId, projectId) => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("Unauthorized: No token found");

  const params = new URLSearchParams();

  if (employeeId) params.append("employeeId", employeeId);
  if (projectId) params.append("projectId", projectId);

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
      throw new Error(data.error || "Failed to fetch project-time data");

    return data;
  } catch (error) {
    console.error("Fetching project-time failed:", error);
    throw error;
  }
};
