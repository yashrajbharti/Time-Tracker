import { adminLogin } from "../api/login.mjs";
import { getQueryUrl } from "../utils/getQuery.mjs";
import { togglePassword } from "../utils/togglePassword.mjs";

togglePassword();

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  adminLogin(email, password);
});

const isRedirect = getQueryUrl("redirect");
if (isRedirect) document.querySelector(".error").removeAttribute("hidden");
