// to generate expiring date for the card
export const generateExpiryDate = (): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 3);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `${month}/${year}`;
};