export const updateLastSynced = () => {
  const time = document.getElementById("time");
  const syncedTime = localStorage.getItem("lastSynced") || "00:00";
  time.textContent = syncedTime;
  time.setAttribute("datetime", syncedTime);
};
