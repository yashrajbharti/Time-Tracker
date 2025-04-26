export const historyReplaceState = (hash, path = "/index.html") => {
  history.replaceState(null, "", window.location.origin + path + hash);
};
