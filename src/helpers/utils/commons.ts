export const combineClassNames = (
  ...classNames: ReadonlyArray<string | undefined | boolean>
) => {
  return classNames.filter((className) => !!className).join(" ");
};

export function categorizeDate(dateStr: string): string {
  const inputDate = new Date(dateStr);
  const now = new Date();
  
  const inputYear = inputDate.getFullYear();
  const currentYear = now.getFullYear();

  if (inputYear < currentYear) {
      return inputYear.toString();
  }

  const inputMonth = inputDate.getMonth();
  const currentMonth = now.getMonth();

  const dayDifference = Math.floor((now.getTime() - inputDate.getTime()) / (1000 * 60 * 60 * 24));

  if (dayDifference === 0) {
      return 'today';
  } else if (dayDifference === 1) {
      return 'yesterday';
  } else if (dayDifference <= 7) {
      return 'last 7 days';
  } else if (inputMonth === currentMonth) {
      return 'this month';
  } else {
      return inputDate.toLocaleString('default', { month: 'long' });
  }
}