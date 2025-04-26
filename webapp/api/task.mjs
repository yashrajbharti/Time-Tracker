import { URL } from "../utils/url.mjs";

const ENDPOINT = "task";

export const getTasks = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(URL + ENDPOINT, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const tasks = await response.json();
  return tasks;
};

export const createNewTask = async (
  name,
  description,
  projectId,
  employees = []
) => {
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
        name,
        description,
        projectId,
        employees,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to create task");
    }

    return data;
  } catch (error) {
    console.error("Failed to create task", error);
    throw error;
  }
};
