import { acceptInvitation } from "../api/acceptInvitation.mjs";
import { getQueryUrl } from "../utils/getQuery.mjs";

export const handleLogin = () => {
  const form = document.querySelector("form");
  const email = document.getElementById("email");

  const emailQuery = getQueryUrl("email");
  const projectId = getQueryUrl("projectId");
  const employeeId = getQueryUrl("employeeId");

  if (emailQuery) email.value = emailQuery;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    acceptInvitation(employeeId, emailQuery, projectId);
  });
};
