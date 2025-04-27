import { URL } from "../utils/url.mjs"; // your base URL
const ENDPOINT = "analytics/window";

export const postWindowLog = async (
  employeeId,
  projectId,
  taskId,
  start,
  end,
  duration,
  fingerprint
) => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("Unauthorized: No token found");

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
        taskId,
        start,
        end,
        duration,
        fingerprint,
      }),
    });

    const data = await response.json();

    if (!response.ok)
      throw new Error(data.error || "Failed to post time window log");

    return data;
  } catch (error) {
    console.error("Post time window failed:", error);
    throw error;
  }
};
