export const calculateSeatLeftPosition = (
  rowsLengths: Map<number, number>,
  seatNumber: number,
  row: number,
  seatWidth: number,
  seatSpace: number,
  centerSpace: number,
) => {
  // Calculating adding space for centering rows
  const seatsSpaceToAdd =
    ((Math.max(...rowsLengths.values()) - Number(rowsLengths.get(row))) / 2) *
    (seatWidth + seatSpace);

  if (seatNumber === 1) return seatsSpaceToAdd;
  if (seatNumber <= Number(rowsLengths.get(row)) / 2) {
    return (seatNumber - 1) * (seatWidth + seatSpace) + seatsSpaceToAdd;
  } else {
    return (
      centerSpace +
      (seatNumber - 1) * seatWidth +
      (seatNumber - 2) * seatSpace +
      seatsSpaceToAdd
    );
  }
};