export function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}
