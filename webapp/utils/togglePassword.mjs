export const togglePassword = () => {
  document.querySelector("md-icon-button").addEventListener("click", () => {
    const passwordField = document.getElementById("password");
    if (passwordField.getAttribute("type") === "text")
      passwordField.setAttribute("type", "password");
    else passwordField.setAttribute("type", "text");
  });
};
