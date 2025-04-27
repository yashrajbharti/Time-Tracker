import { getEmployeeById } from "../api/employeeById.mjs";

export const handleEmployee = async () => {
  const employeeId = localStorage.getItem("employeeId");
  const employee = await getEmployeeById(employeeId);

  document.querySelector("h1").textContent = `Hey ${employee.name
    .split(" ", 1)
    .join("")}!`;
};
