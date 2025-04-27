import { showToast } from "../utils/toast.mjs";
import { URL } from "../utils/url.mjs";

const ENDPOINT = "user/login";

export const acceptInvitation = async (employeeId, email, projectId) => {
  try {
    const response = await fetch(URL + ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeId,
        email,
        projectId,
      }),
    });

    const data = await response.json();

    if (!response.ok)
      throw new Error(data.error || "Failed to accept invitation");

    localStorage.setItem("token", data.token);
    localStorage.setItem("employeeId", employeeId);
    window.location.href = "/";

    return data;
  } catch (error) {
    console.error("Accept invitation failed:", error);
    showToast(
      "Unable to accept the invitation. Please try again or contact support."
    );
    throw error;
  }
};
