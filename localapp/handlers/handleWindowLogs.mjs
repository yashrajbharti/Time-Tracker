import { postWindowLog } from "../api/window.mjs";
import { getFingerprint } from "../utils/fingerprint.mjs";

export const handleWindowLogs = async (
  employeeId,
  projectId,
  taskId,
  start,
  end
) => {
  const duration = end - start;
  const fingerprint = await getFingerprint();
  await postWindowLog(
    employeeId,
    projectId,
    taskId,
    start,
    end,
    duration,
    fingerprint
  );
};
