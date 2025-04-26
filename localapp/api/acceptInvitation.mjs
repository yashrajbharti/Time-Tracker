import { URL } from "../utils/url.mjs";

const ENDPOINT = "user/login";

export const acceptInvitation = async (employeeId, projectId, email) => {
  try {
    const response = await fetch(URL + ENDPOINT, {
      method: "POST",
      headers: {
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
      throw new Error(data.error || "Failed to accept invitation");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("employeeId", employeeId);

    return data;
  } catch (error) {
    console.error("Accept invitation failed:", error);
    throw error;
  }
};
