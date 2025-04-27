export class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
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
                  color: var(--md-sys-color-on-secondary-container);
                }
            }
        </style>
        <article>
            <h2>${this.getAttribute("title") || "Untitled Project"}</h2>
            <md-ripple></md-ripple>
        </article>
      `;
  }
}
