const currentTime = new Date();

const checkClockIn = (staff) => {
    return clockIns.find(
        (c) =>
          c.clockedInAt.getDate().toString() ===
          currentTime.getDate().toString()
      );
}

const checkClockOut = (staff) => {
    return clockOuts.find(
        (c) =>
          c.clockedOutAt.getDate().toString() ===
          currentTime.getDate().toString()
      );
}

module.exports = {checkClockIn, checkClockOut}