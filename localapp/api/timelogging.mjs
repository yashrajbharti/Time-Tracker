import { URL } from "../utils/url.mjs";
const ENDPOINT = "analytics/project-time";

export const updateProjectTime = async (
  employeeId,
  projectId,
  time,
  income
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  try {
    const response = await fetch(URL + ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeId,
        projectId,
        time,
        income,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to create or update project-time");
    }

    return data;
  } catch (error) {
    console.error("Project-time POST failed:", error);
    showToast("Unable to log time. Please try again or contact support.");
    throw error;
  }
};

export const getProjectTime = async (employeeId = null, projectId = null) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  let query = "";

  if (employeeId || projectId) {
    const params = new URLSearchParams();
    if (employeeId) params.append("employeeId", employeeId);
    if (projectId) params.append("projectId", projectId);
    query = `?${params.toString()}`;
  }

  try {
    const response = await fetch(URL + ENDPOINT + query, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch project-time data");
    }

    return data;
  } catch (error) {
    console.error("Project-time GET failed:", error);
    throw error;
  }
};
