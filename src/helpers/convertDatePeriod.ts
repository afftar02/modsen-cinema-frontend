export const convertDatePeriod = (start: Date, end: Date) => {
  let startTimeStr = 'AM',
    endTimeStr = 'AM';
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (startDate.getHours() > 12) {
    startDate.setHours(startDate.getHours() - 12);
    startTimeStr = 'PM';
  }
  if (endDate.getHours() > 12) {
    endDate.setHours(endDate.getHours() - 12);
    endTimeStr = 'PM';
  }

  return `${startDate.getHours()}:${startDate.getMinutes()} ${startTimeStr} - ${endDate.getHours()}:${endDate.getMinutes()} ${endTimeStr}`;
};