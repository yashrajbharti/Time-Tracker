import { showToast } from "../utils/toast.mjs";
import { URL } from "../utils/url.mjs";

const ENDPOINT = "employee";

export const getEmployee = async (fields = []) => {
  const token = localStorage.getItem("token");

  let query = "";
  if (fields.length > 0) {
    query = `?select=${fields.join(",")}`;
  }

  const response = await fetch(URL + ENDPOINT + query, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch employees");

  const employees = await response.json();
  return employees;
};

export const createNewEmployee = async (name, email) => {
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
        email,
      }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Failed to add employee");

    showToast("Successfully added Employee!", "success");
    return data;
  } catch (error) {
    console.error("Failed to add employee", error);
    showToast(
      "Failed to create, remember employee emails must be unique, please try again!"
    );
    throw error;
  }
};
