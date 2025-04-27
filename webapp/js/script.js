import { isAuthenticated } from "../api/isAuthenticated.mjs";
import { loadEmployeeCards, loadProjectCards } from "../module/cards.mjs";
import { EmployeeCard } from "../module/employee-card.mjs";
import { inviteEmployeesToProject } from "../module/invite.mjs";
import { ProjectCard } from "../module/project-card.mjs";
import {
  getSelectedTabOnLoad,
  syncHashWithTabsChange,
} from "../module/tabs.mjs";

(async function () {
  const user = await isAuthenticated();

  if (!user) window.location.href = "./login.html?redirect=true";
})();

getSelectedTabOnLoad();
syncHashWithTabsChange();

customElements.define("project-card", ProjectCard);
customElements.define("employee-card", EmployeeCard);

loadProjectCards();
loadEmployeeCards();
inviteEmployeesToProject();
