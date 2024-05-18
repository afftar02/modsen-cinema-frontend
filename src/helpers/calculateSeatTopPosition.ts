export const calculateSeatTopPosition = (row: number, seatWidth: number, seatSpace: number) => {
  if (row === 1) return 0;
  return (row - 1) * (seatWidth + seatSpace);
};