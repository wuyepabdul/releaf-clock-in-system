const todayDate = new Date("May 20, 2021 00:00:00");

const array = [
  {
    name: "james",
    createdAt: "June 20, 2021 00:00:00",
  },

  {
    name: "pete",
    createdAt: "May 20, 2021 00:00:00",
  },
  {
    name: "math",
    createdAt: "May 30, 2021 00:00:00",
  },
];

const checker = (arr) => {
  arr.find((c) => {
    c.createdAt = new Date(c.createdAt);
    if (
      c.createdAt.getDay() === todayDate.getDay() &&
      c.createdAt.getDate() === todayDate.getDate() &&
      c.createdAt.getMonth() === todayDate.getMonth() &&
      c.createdAt.getFullYear() === todayDate.getFullYear()
    ) {
      console.log("true");
      return true;
    } else {
      console.log("false");
      return false;
    }
  });
};

checker(array);
