import { postScreenshotMetadata } from "../api/screenshot.mjs";
import { uploadScreenshot } from "../api/upload.mjs";
import { getFingerprint } from "../utils/fingerprint.mjs";

export const handleScreenshot = async (employeeId, projectId, taskId) => {
  const link = await uploadScreenshot();
  const timeStamp = new Date().toISOString();
  const permissionGranted = true;
  const fingerprint = getFingerprint();

  postScreenshotMetadata(
    employeeId,
    projectId,
    taskId,
    link,
    timeStamp,
    permissionGranted,
    fingerprint
  );
};
