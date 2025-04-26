import { historyReplaceState } from "../utils/history.mjs";

export const getSelectedTabOnLoad = () => {
  const hash = window.location.hash;
  if (!hash) return;

  const tabs = document.querySelectorAll("md-primary-tab");
  tabs.forEach((tab) => (tab.selected = false));
  switch (hash) {
    case "#invite":
      tabs[0].selected = true;
      break;
    case "#employee":
      tabs[1].selected = true;
      break;
    case "#project":
      tabs[2].selected = true;
      break;
    default:
      tabs[0].selected = true;
  }
  updateVisibleSection();
};

export const syncHashWithTabsChange = () => {
  const tabs = document.querySelector("md-tabs");
  tabs.addEventListener("change", (event) => {
    const selectedTab = event.target.activeTabIndex;
    switch (selectedTab) {
      case 0:
        historyReplaceState("#invite");
        break;
      case 1:
        historyReplaceState("#employee");
        break;
      case 2:
        historyReplaceState("#project");
        break;
      default:
        return;
    }
    updateVisibleSection();
  });
};

const updateVisibleSection = () => {
  const hash = window.location.hash || "#invite";
  const sectionIds = ["invite", "employee", "project"];

  sectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (!section) return;

    if (`#${id}` === hash) section.hidden = false;
    else section.hidden = true;
  });
};
