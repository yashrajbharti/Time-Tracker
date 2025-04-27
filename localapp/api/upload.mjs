import { URL } from "../utils/url.mjs";
const ENDPOINT = "upload";

export const uploadScreenshot = async (file) => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("Unauthorized: No token found");

  const formData = new FormData();
  formData.append("screenshot", file);

  try {
    const response = await fetch(URL + ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok)
      throw new Error(data.error || "Failed to upload screenshot");

    return data.link;
  } catch (error) {
    console.error("Screenshot upload failed:", error);
    throw error;
  }
};
