import { handleLogin } from "../handlers/handleLogin.mjs";
import { getQueryUrl } from "../utils/getQuery.mjs";

const isRedirect = getQueryUrl("redirect");
if (isRedirect) document.querySelector(".error").removeAttribute("hidden");

handleLogin();
