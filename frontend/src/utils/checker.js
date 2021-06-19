const checker = (arr, todayDate) => {
  todayDate = new Date();

  // find clockin time if user is clockedIn
  arr.find((c) => {
    c.createdAt = new Date(c.createdAt);
    if (
      c.createdAt.getDay() === todayDate.getDay() &&
      c.createdAt.getDate() === todayDate.getDate() &&
      c.createdAt.getMonth() === todayDate.getMonth() &&
      c.createdAt.getFullYear() === todayDate.getFullYear()
    ) {
      return true;
    } else {
      return false;
    }
  });
};

export default checker;
