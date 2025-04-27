import { updateProjectTime } from "../api/timelogging.mjs";
import { calculateIncome } from "../utils/calculateIncome.mjs";
import { updateLastSynced } from "../utils/updateLastSynced.mjs";

export const handleTimelog = async (employeeId, projectId, time) => {
  const income = calculateIncome(time);

  const data = await updateProjectTime(employeeId, projectId, time, income);
  if (data) {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    localStorage.setItem("lastSynced", formattedTime);
    updateLastSynced();
  }
};
