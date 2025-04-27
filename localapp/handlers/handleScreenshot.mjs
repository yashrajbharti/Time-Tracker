import { uploadScreenshot } from "../api/upload.mjs";
import { postScreenshotMetadata } from "../api/screenshot.mjs";
import { getFingerprint } from "../utils/fingerprint.mjs";
import { getIPAddress } from "../utils/ipAddress.mjs";

let mediaStream = null;

export const handleScreenshot = async (employeeId, projectId, taskId) => {
  let link = "";
  let permissionGranted = false;

  try {
    if (!mediaStream)
      mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: "always" },
        audio: false,
      });

    const videoTrack = mediaStream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(videoTrack);
    const bitmap = await imageCapture.grabFrame();

    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(bitmap, 0, 0);

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );

    link = await uploadScreenshot(blob);
    permissionGranted = true;
  } catch (error) {
    console.warn("Screenshot capture failed or permission error:", error);
  }

  try {
    const timestamp = Date.now();
    const fingerprint = await getFingerprint();
    const ipAddress = await getIPAddress();

    await postScreenshotMetadata({
      employeeId,
      projectId,
      taskId,
      link,
      timestamp,
      permissionGranted,
      fingerprint,
      ipAddress,
    });
  } catch (metaError) {
    console.error("Failed to post screenshot metadata:", metaError);
  }
};

export const stopScreenCapture = () => {
  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => track.stop());
    mediaStream = null;
  }
};
