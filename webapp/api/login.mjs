import { showToast } from "../utils/toast.mjs";
import { URL } from "../utils/url.mjs";
export const ENDPOINT = "admin/login";

export const adminLogin = async (email, password) => {
  try {
    const response = await fetch(URL + ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } else {
      console.error(data.error || "Login failed");
      showToast("Invalid Email or Password, please try again!");
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    showToast("We are facing Network problem, please try again later!");
  }
};
