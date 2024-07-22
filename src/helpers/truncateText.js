export default (text, limit) =>
  text ? (text.length < limit ? text : text.substring(0, limit) + "...") : "";
