import { getEmployee } from "../api/employee.mjs";
import { getProjects } from "../api/project.mjs";
import { sendInvite } from "../api/sendInvite.mjs";
import { invalidEmail } from "../utils/checkEmail.mjs";

const projectMap = new Map();

export const inviteEmployeesToProject = async () => {
  await addProjectOptions();

  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const projectName = document.getElementById("projectName").value;
    const emails = document
      .getElementById("emails")
      .value.split(",")
      .map((email) => email.toLowerCase().trim());

    const projectId = projectMap.get(projectName);
    const employeeIds = await getEmployeeIds(emails);

    for (let i = 0; i < emails.length; i++) {
      if (invalidEmail(emails[i]) || !employeeIds[i]) continue;
      sendInvite(employeeIds[i], projectId, emails[i]);
    }

    form.reset();
  });
};

const addProjectOptions = async () => {
  const projects = await getProjects();
  const select = document.querySelector("md-outlined-select");
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < projects.length; i++) {
    const projectName = i + 1 + " - " + projects[i].name;
    projectMap.set(projectName, projects[i].id);

    const option = document.createElement("md-select-option");
    if (i === 0) {
      option.setAttribute("selected", "true");
      option.setAttribute("default", "true");
    }
    option.value = projectName;

    const headline = document.createElement("div");
    headline.slot = "headline";
    headline.textContent = projectName;

    option.appendChild(headline);
    fragment.appendChild(option);
  }
  select.appendChild(fragment);
};

export const getEmployeeIds = async (emails) => {
  const employees = await getEmployee();

  const matchedIds = emails.map((email) => {
    const employee = employees.find((emp) => emp.identifier === email);
    return employee ? employee.id : undefined;
  });

  return matchedIds;
};
