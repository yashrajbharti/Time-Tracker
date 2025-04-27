export const calculateIncome = (timeInMs, ratePerHour = 100) => {
  const hours = timeInMs / (1000 * 60 * 60);
  const income = hours * ratePerHour;
  return Math.round(income * 100) / 100;
};
