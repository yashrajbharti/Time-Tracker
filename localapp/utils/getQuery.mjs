export const getQueryUrl = (key) => {
  const params = new URLSearchParams(window.location.search);
  const value = params.get(key);

  return value || null;
};
