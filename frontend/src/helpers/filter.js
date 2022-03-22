const todaysDate = new Date();
export const filterClockins = (clockins) => {
  const result = clockins.filter((clockin) => {
    const clockinDate = new Date(clockin.createdAt);
    return clockinDate.toDateString() === todaysDate.toDateString();
  });
  console.log("result", result);
};
