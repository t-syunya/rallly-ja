export function weekdayColor(day: number) {
  if (day === 0) return "text-red-600 dark:text-red-400";
  if (day === 6) return "text-blue-600 dark:text-blue-400";
  return undefined;
}
