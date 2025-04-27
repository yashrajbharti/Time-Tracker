import { handleScreenshot } from "../handlers/handleScreenshot.mjs";
import { handleTimelog } from "../handlers/handleTimelog.mjs";
import { handleWindowLogs } from "../handlers/handleWindowLogs.mjs";

export class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.timer = null;
    this.elapsedTime = 0;
    this.isRunning = false;
    this.saveInterval = null;
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

            &>div {
                display: flex;
                align-items: center;
                justify-content: space-between;
                inline-size: 100%;
                gap: 20px;
                flex-wrap: wrap;

                &>h2 {
                    color: var(--md-sys-color-on-secondary-container);
                }

                &>div {
                    display: flex;
                    gap: 15px;
                    align-items: center;
                    padding-inline-end: 15px;
                    background-color: var(--md-sys-color-secondary-container);
                    border-radius: 24px;

                    &>time {
                        font-family: "time", sans-serif;
                        padding-block-start: 2px;
                        min-inline-size: 100px;
                        font-size: 1.8rem;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                }
            }
        }
      </style>

      <article data-project="${this.getAttribute("id")}">
        <div>
          <h2>${this.getAttribute("title") || "Untitled Project"}</h2>
          <div>
            <md-filled-icon-button id="toggle-button" toggle slot="trailing-icon" type="button" aria-label="toggle timer">
              <md-icon>play_arrow</md-icon>
              <md-icon slot="selected">pause</md-icon>
            </md-filled-icon-button>
            <time datetime="00:00">00:00</time>
          </div>
        </div>
        <md-ripple></md-ripple>
      </article>
    `;

    this.button = this.shadowRoot.getElementById("toggle-button");
    this.timeDisplay = this.shadowRoot.querySelector("time");

    const projectId = this.getAttribute("id");
    const savedTime = localStorage.getItem(`timer-${projectId}`);
    this.elapsedTime = savedTime ? parseInt(savedTime) : 0;
    this.updateTimeDisplay();

    window.addEventListener("stop-all-timers", (event) => {
      if (this.isRunning && event.detail.projectId !== projectId) {
        this.stopTimer();
      }
    });

    this.button.addEventListener("click", () => {
      this.toggleTimer();
    });
  }

  toggleTimer() {
    if (this.isRunning) {
      this.stopTimer();
    } else {
      const projectId = this.getAttribute("id");
      window.dispatchEvent(
        new CustomEvent("stop-all-timers", {
          detail: { projectId },
        })
      );
      this.startTimer();
    }
  }

  startTimer() {
    this.isRunning = true;
    const projectId = this.getAttribute("id");
    const taskId = this.getAttribute("taskId");
    const employeeId = this.getAttribute("employeeId");

    this.timer = setInterval(() => {
      this.elapsedTime += 1;
      this.updateTimeDisplay();
    }, 1000);

    const FIVE_MINUTES = 5 * 60 * 1000;

    this.saveInterval = setInterval(() => {
      const startTime = parseInt(localStorage.getItem(`timer-${projectId}`));
      localStorage.setItem(`timer-${projectId}`, this.elapsedTime.toString());
      handleTimelog(employeeId, projectId, this.elapsedTime * 1000);
      handleWindowLogs(
        employeeId,
        projectId,
        taskId,
        startTime * 1000,
        this.elapsedTime * 1000
      );
      handleScreenshot(employeeId, projectId, taskId);
    }, FIVE_MINUTES);
  }

  stopTimer() {
    this.isRunning = false;
    const projectId = this.getAttribute("id");
    const employeeId = this.getAttribute("employeeId");

    clearInterval(this.timer);
    clearInterval(this.saveInterval);

    localStorage.setItem(`timer-${projectId}`, this.elapsedTime.toString());
    handleTimelog(employeeId, projectId, this.elapsedTime * 1000);
    this.button.selected = false;
  }

  updateTimeDisplay() {
    const hours = Math.floor(this.elapsedTime / 3600);
    const minutes = Math.floor((this.elapsedTime % 3600) / 60);
    const seconds = this.elapsedTime % 60;

    const updatedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    this.timeDisplay.setAttribute("datetime", updatedTime);

    this.timeDisplay.textContent = updatedTime;
  }
}
