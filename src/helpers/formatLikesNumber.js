export default (number) => {
  const parsedNumber = +number;

  if (parsedNumber > 1000) {
    return `${Math.floor(parsedNumber / 1000)}K`;
  } else if (parsedNumber > 1000000) {
    return `${Math.floor(parsedNumber / 1000000)}M`;
  } else {
    return parsedNumber;
  }
};
