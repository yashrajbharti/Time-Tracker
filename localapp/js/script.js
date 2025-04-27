import { isAuthenticated } from "../api/isAuthenticated.mjs";
import { handleEmployee } from "../handlers/handleEmployee.mjs";

(async function () {
  const user = await isAuthenticated();

  if (!user) window.location.href = "/login.html?redirect=true";
})();

handleEmployee();
