import FingerprintJS from "../lib/fingerprint.js";

export const getFingerprint = async () => {
  const cachedFingerprint = localStorage.getItem("fingerprintId");

  if (cachedFingerprint) {
    return cachedFingerprint;
  }

  const fp = await FingerprintJS.load();
  const result = await fp.get();

  const visitorId = result.visitorId;
  localStorage.setItem("fingerprintId", visitorId);

  return visitorId;
};
