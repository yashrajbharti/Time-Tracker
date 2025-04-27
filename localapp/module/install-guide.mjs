export class InstallGuide extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
        <style>
          @media screen and (display-mode: standalone) {
            #install-guide {
              display: none;
            }
          }
  
          #install-guide {
            font-family: sans-serif;
          }
  
          #install-guide > h2 {
            font-size: clamp(2rem, 1.8333rem + 0.8333vw, 2.5rem);
            margin-block: 30px;
          }
  
          #install-guide > ul {
            line-height: 2;
            padding-inline-start: 12px;
          }
  
          #install-guide > ul > li > p {
            display: flex;
            margin-block: 24px;
            flex-wrap: wrap;
            font-size: 1.2rem;
            gap: 5px;
          }
  
          #install-guide .chip {
            position: relative;
            display: flex;
            align-items: center;
            gap: 5px;
            background-color: var(--md-sys-color-surface-container-highest);
            padding-inline-end: 15px;
            border-radius: 24px;
            font-weight: 500;
          }
  
          #install-guide .chip > img {
            padding-inline-start: 8px;
          }
  
          #install-guide > p {
            padding: 12px;
            max-inline-size: max-content;
            color: var(--md-sys-color-on-secondary-container);
            align-items: center;
            gap: 5px;
            border-radius: 4px;
            margin-block: 10px;
            margin-block-start: 50px;
            background-color: var(--md-sys-color-secondary-container);
            border-inline-start: 3px solid var(--md-sys-color-primary);
          }
        </style>
  
        <section id="install-guide">
          <img src="./icons/mercury.svg" alt="Mercury" height="200px">
          <h2>Set up the Mercury Desktop App</h2>
          <ul>
            <li>
              <p>
                Use
                <strong class="chip" title="Google Chrome">
                  <img src="./icons/Chrome.webp" alt="" height="24px" width="24px"> Google Chrome
                  <md-ripple></md-ripple>
                </strong> on your desktop to open this site.
              </p>
            </li>
            <li>
              <p>
                Click the
                <strong class="chip" title="Install Mercury">
                  <md-icon-button aria-label="desktop">
                    <md-icon>install_desktop</md-icon>
                  </md-icon-button>
                  Install
                  <md-ripple></md-ripple>
                </strong> icon found in the address bar.
              </p>
            </li>
            <li>
              <p>
                Already installed? Click the
                <strong>Mercury</strong>
                <strong class="chip" title="Open in App">
                  <img src="./icons/mercury.svg" alt="Mercury" height="32px">Open in App
                  <md-ripple></md-ripple>
                </strong> icon to launch it.
              </p>
            </li>
          </ul>
          <p>
            Mercury works best when installed with Chrome on desktop for a seamless time-tracking experience.
          </p>
        </section>
      `;
  }
}
