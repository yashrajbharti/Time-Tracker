import { isAuthenticated } from "../api/isAuthenticated.mjs";
import { handleEmployee } from "../handlers/handleEmployee.mjs";
import { InstallGuide } from "../module/install-guide.mjs";
import { ProjectCard } from "../module/project-card.mjs";
import { updateLastSynced } from "../utils/updateLastSynced.mjs";

(async function () {
  const user = await isAuthenticated();

  if (!user) window.location.href = "/login.html?redirect=true";
})();

handleEmployee();

customElements.define("project-card", ProjectCard);
customElements.define("install-guide", InstallGuide);

updateLastSynced();
