import { URL } from "../utils/url.mjs";

const ENDPOINT = "invite/send";

export const sendInvite = async (employeeId, projectId, email) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Unauthorized: Admin token missing");
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
        email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to send invite");
    }

    return data;
  } catch (error) {
    console.error("Send invite failed:", error);
    throw error;
  }
};
