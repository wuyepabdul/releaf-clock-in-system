const checkClockIn = (staff) => {
    return staff.clockIns.find(
        (c) =>
          c.clockedInAt.getDate().toString() ===
          currentTime.getDate().toString()
      );
}

const checkClockOut = (staff) => {
    staff.clockIns.find(
        (c) =>
          c.clockedOutAt.getDate().toString() ===
          currentTime.getDate().toString()
      );
}

module.exports = {checkClockIn, checkClockOut}