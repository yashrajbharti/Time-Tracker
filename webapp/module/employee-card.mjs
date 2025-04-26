export class EmployeeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const name = this.getAttribute("name");
    const projects = this.getAttribute("projects")
      ? this.getAttribute("projects").split(",")
      : ["No Active Projects"];
    const link = this.getAttribute("link");

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
                  }
                 & > md-text-button {
                    max-inline-size: max-content;
                 }
              }
          </style>
          <article>
              <h2>${name || "Untitled Employee"}</h2>
              <md-chip-set class="projects">
                ${projects
                  .map(
                    (project) =>
                      `<md-assist-chip label="${project}"></md-assist-chip>`
                  )
                  .join("")}
                </md-chip-set>
                <md-text-button href="./pages/analytics.html?id=${link}">Check ${name}'s Details</md-text-button>
              <md-ripple></md-ripple>
          </article>
        `;
  }
}
