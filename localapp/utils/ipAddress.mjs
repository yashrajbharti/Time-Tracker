export const getIPAddress = async () => {
  const cachedIP = localStorage.getItem("ipAddress");
  if (cachedIP) return cachedIP;

  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();

    if (data && data.ip) {
      localStorage.setItem("ipAddress", data.ip);
      return data.ip;
    }

    throw new Error("IP not found");
  } catch (error) {
    console.error("Failed to fetch IP address:", error);
    return null;
  }
};
