export default (from, to) => {
  try {
    const toDate = new Date(to);
    const fromDate = new Date(from);

    return Math.ceil(Math.abs(toDate - fromDate) / 36e5);
  } catch (err) {
    return NaN;
  }
};
