import { getProjectById } from "../api/projectById.mjs";
import { getTasks } from "../api/task.mjs";
import { getProjectTime } from "../api/timelogging.mjs";

export const handleProjects = async (projects, employeeId) => {
  const projectWrapper = document.querySelector("section");
  const fragment = document.createDocumentFragment();
  const tasks = await getTasks();

  for (const id of projects) {
    const project = await getProjectById(id);
    const timelog = await getProjectTime(employeeId, id);
    const taskId = tasks.find((task) => task.projectId === id)?.id;

    if (timelog && timelog[0] && timelog[0].time)
      localStorage.setItem(`timer-${id}`, (timelog[0].time / 1000).toString());

    const projectCard = document.createElement("project-card");
    projectCard.setAttribute("title", project.name);
    projectCard.setAttribute("id", project.id);
    projectCard.setAttribute("taskId", taskId);
    projectCard.setAttribute("employeeId", employeeId);
    fragment.appendChild(projectCard);
  }

  projectWrapper.appendChild(fragment);
};
