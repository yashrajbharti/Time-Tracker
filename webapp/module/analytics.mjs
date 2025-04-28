import { getEmployeeById } from "../api/employeeById.mjs";
import { getProjectById } from "../api/projectById.mjs";
import { getScreenshots } from "../api/screenshot.mjs";
import { getProjectTime } from "../api/timelog.mjs";
import { getQueryUrl } from "../utils/getQuery.mjs";

const employeeId = getQueryUrl("id");

export const handleAnalytics = async () => {
  const employee = await getEmployeeById(employeeId);

  document.querySelector(
    ".employeeName"
  ).textContent = `${employee.name}'s Projects`;

  const analyticsWrapper = document.getElementById("analytics");
  const fragment = document.createDocumentFragment();

  for (const projectId of employee.projects) {
    const project = await getProjectById(projectId);
    const screenshots = await getScreenshots(employeeId, projectId);
    const timelogs = await getProjectTime(employeeId, projectId);

    const images = screenshots.map((item) => item.link);

    const analyticsCard = document.createElement("analytics-card");
    analyticsCard.setAttribute("title", project.name);
    analyticsCard.setAttribute("description", project.description);
    analyticsCard.setAttribute("images", images.toString());
    analyticsCard.setAttribute("time", timelogs[0]?.time);
    analyticsCard.setAttribute("income", timelogs[0]?.income);

    fragment.appendChild(analyticsCard);
  }
  analyticsWrapper.appendChild(fragment);
};
