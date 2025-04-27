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

  if (!response.ok) throw new Error("Failed to fetch tasks");

  const tasks = await response.json();
  return tasks;
};
