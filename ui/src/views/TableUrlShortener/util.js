const EnumMonths = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "April",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dic"
};

export const formatDate = date => {
  console.log(date);
  return `${EnumMonths[date.getMonth()]} ${date.getDate()}, ${date.getHours()}:${date.getMinutes()}`;
};
