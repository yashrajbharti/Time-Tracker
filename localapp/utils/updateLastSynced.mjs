export const updateLastSynced = () => {
  document.getElementById("time").textContent =
    localStorage.getItem("lastSynced") || "00:00";
};
