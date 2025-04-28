export class AnalyticsCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const title = this.getAttribute("title");
    const description = this.getAttribute("description");
    const images = this.getAttribute("images")?.split(",");
    const time = this.getAttribute("time");
    const income = this.getAttribute("income");
    const ONE_HOUR = 1000 * 60 * 60;

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
                    margin-block-end: 0;
                  }
                  & > p {
                    margin-block-start: 10px;
                    inline-size: 100%;
                  }
                  & > .image-wrapper {
                    & > img {
                        border-radius: 8px;
                        margin-block: 5px;
                    }
                  }
              }
          </style>
          <article>
              <h2>${title || "Untitled Project"}</h2>
              <p>${description || "No description provided."}</p>
              <md-chip-set>
                  <md-assist-chip label="${
                    Math.round(parseInt(time) / ONE_HOUR) || 0
                  } hours worked"></md-assist-chip> 
                  
                  <md-assist-chip label="$ ${
                    parseInt(income) || 0
                  } earned"></md-assist-chip> 
              </md-chip-set>
              <div class="image-wrapper">
              ${
                images && images[0]
                  ? images
                      .map(
                        (screenshot) =>
                          `<img src="${screenshot}" alt="screenshot" width="100%" height="auto"></img>`
                      )
                      .join("")
                  : ""
              }
              </div>
              <md-ripple></md-ripple>
          </article>
        `;
  }
}
