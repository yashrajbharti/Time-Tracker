export class EmployeeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const name = this.getAttribute("name");
    const email = this.getAttribute("email");
    const projects = this.getAttribute("projects")
      ? this.getAttribute("projects").split(",")
      : ["No Active Projects"];
    const link = this.getAttribute("link");
    const isDeactivated = this.getAttribute("deactivated");

    this.shadowRoot.innerHTML = `
          <style>
              article {
                  position: relative;
                  display: flex;
                  box-sizing: border-box;
                  flex-direction: column;
                  max-inline-size: 900px;
                  max-block-size: 100%;
                  inline-size: 100%;
                  margin-inline: auto;
                  gap: 20px;
                  padding: 20px;
                  margin-block: 20px;
                  background-color: var(--md-sys-color-surface-container);
                  border-radius: 20px;
                  & > h2 {
                    inline-size: 100%;
                    padding-inline-start: 11px;
                    margin-block-end: 0;
                    padding-block: 0;
                  }
                  & > p {
                    padding-inline-start: 11px;
                    margin-block-start: 0;
                    margin-block-end: 10px;
                    padding-block: 0;
                  }
                  & > md-chip-set {
                    padding-inline: 12px;
                  }
                  & > md-text-button {
                    max-inline-size: max-content;
                  }
                &.deactivated {
                    filter: brightness(0.7)
                }
              }
          </style>
          <article class="${isDeactivated === "true" ? "deactivated" : ""}">
              <h2>${name || "Untitled Employee"} ${
      isDeactivated === "true" ? "(DEACTIVATED)" : ""
    }</h2>
              <p>${email}</p>
              <md-chip-set class="projects">
                ${projects
                  .map(
                    (project) =>
                      `<md-assist-chip label="${project}"></md-assist-chip>`
                  )
                  .join("")}
                </md-chip-set>
                <md-text-button ${
                  isDeactivated === "true" ? "disabled" : ""
                } href="./pages/analytics.html?id=${link}">Check ${name}'s Details</md-text-button>
              <md-ripple></md-ripple>
          </article>
        `;
  }
}
