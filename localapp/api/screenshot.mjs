const ENDPOINT = "screenshot";

export const postScreenshotMetadata = async ({
  employeeId,
  projectId,
  taskId,
  link,
  timestamp,
  permissionGranted,
  fingerprint,
}) => {
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
        link,
        timestamp,
        permissionGranted,
        fingerprint,
      }),
    });

    const data = await response.json();

    if (!response.ok)
      throw new Error(data.error || "Failed to log screenshot metadata");

    return data;
  } catch (error) {
    console.error("Post screenshot metadata failed:", error);
    throw error;
  }
};
