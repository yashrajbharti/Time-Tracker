import { getProjectById } from "../api/projectById.mjs";

export const handleProjects = async (projects) => {
  const projectWrapper = document.querySelector("section");
  const fragment = document.createDocumentFragment();
  for (const id of projects) {
    const project = await getProjectById(id);
    const projectCard = document.createElement("project-card");
    projectCard.setAttribute("title", project.name);
    projectCard.setAttribute("id", project.id);
    fragment.appendChild(projectCard);
  }

  projectWrapper.appendChild(fragment);
};
