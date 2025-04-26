import { showToast } from "../utils/toast.mjs";
import { URL } from "../utils/url.mjs";

const ENDPOINT = "project";

export const getProjects = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(URL + ENDPOINT, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch projects");

  const projects = await response.json();
  return projects;
};

export const createNewProject = async (name, description, employees = []) => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("Unauthorized: Admin token missing");

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
        employees,
      }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Failed to create project");

    showToast("Successfully added Project!", "success");
    return data;
  } catch (error) {
    console.error("Failed to create project", error);
    showToast("Failed to create project, please try again!");
    throw error;
  }
};
