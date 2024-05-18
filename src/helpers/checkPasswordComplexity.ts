export const checkPasswordComplexity = (value: string): string => {
  if (
    value.length >= 12 &&
    value.length <= 16 &&
    value !== value.toLowerCase() &&
    /[.,!?/]/.test(value)
  ) {
    return 'High';
  } else if (
    value.length >= 8 &&
    value.length <= 16 &&
    value !== value.toLowerCase()
  ) {
    return 'Medium';
  } else if (value.length >= 4 && value.length <= 16) {
    return 'Low';
  } else {
    return 'None';
  }
};
