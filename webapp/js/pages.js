import { isAuthenticated } from "../api/isAuthenticated.mjs";

(async function () {
  const user = await isAuthenticated();

  if (!user) window.location.href = "/login.html?redirect=true";
})();
