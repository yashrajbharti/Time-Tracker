import { createNewEmployee } from "../api/employee.mjs";
import { isAuthenticated } from "../api/isAuthenticated.mjs";
import { createNewProject } from "../api/project.mjs";
import { createNewTask } from "../api/task.mjs";

(async function () {
  const user = await isAuthenticated();

  if (!user) window.location.href = "/login.html?redirect=true";
})();

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (form.id === "employee") {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    await createNewEmployee(name, email);
  }
  if (form.id === "project") {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;

    const { id } = await createNewProject(name, description);

    await createNewTask(name, description, id);
  }

  form.reset();
});
