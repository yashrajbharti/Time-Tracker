import { postWindowLog } from "../api/window.mjs";
import { getFingerprint } from "../utils/fingerprint.mjs";
import { getIPAddress } from "../utils/ipAddress.mjs";

export const handleWindowLogs = async (
  employeeId,
  projectId,
  taskId,
  start,
  end
) => {
  const duration = end - start;
  const fingerprint = await getFingerprint();
  const ipAddress = await getIPAddress();

  await postWindowLog(
    employeeId,
    projectId,
    taskId,
    start,
    end,
    duration,
    fingerprint,
    ipAddress
  );
};
