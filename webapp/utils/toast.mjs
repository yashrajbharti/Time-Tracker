export const showToast = (message, type = "warning", duration = 5000) => {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.id = type;
  toast.setAttribute("popover", "");
  toast.textContent = message;
  document.body.appendChild(toast);
  toast.showPopover();
  setTimeout(() => {
    toast.hidePopover();
    toast.remove();
  }, duration);
};
