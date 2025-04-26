import { getEmployee } from "../api/employee.mjs";
import { getProjects } from "../api/project.mjs";

export const loadProjectCards = async () => {
  const projectWrapper = document.querySelector(".project-wrapper");

  if (!projectWrapper) {
    console.error("No project-wrapper found!");
    return;
  }

  const projects = await getProjects();

  const fragment = document.createDocumentFragment();

  for (const project of projects) {
    const projectCard = document.createElement("project-card");
    projectCard.setAttribute("title", project.name);
    projectCard.setAttribute("description", project.description);

    fragment.appendChild(projectCard);
  }

  projectWrapper.appendChild(fragment);
};

export const loadEmployeeCards = async () => {
  const employeeWrapper = document.querySelector(".employee-wrapper");

  if (!employeeWrapper) {
    console.error("No employee-wrapper found!");
    return;
  }
  const employees = await getEmployee();
  const projects = await getProjects();

  const fragment = document.createDocumentFragment();

  for (const employee of employees) {
    const employeeCard = document.createElement("employee-card");
    employeeCard.setAttribute("name", employee.name);
    employeeCard.setAttribute("link", employee.id);
    employeeCard.setAttribute("email", employee.email);
    employeeCard.setAttribute("deactivated", !!employee.deactivated);

    const projectNames = employee.projects.map((projectId) => {
      const project = projects.find((project) => project.id === projectId);
      return project ? project.name : "Unknown Project";
    });

    employeeCard.setAttribute("projects", projectNames);

    fragment.appendChild(employeeCard);
  }

  employeeWrapper.appendChild(fragment);
};
