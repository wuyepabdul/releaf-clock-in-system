const getCurrentTime = () => {
  const time = new Date();
  var hour = time.getHours();
  hour = hour % 12;

  // cuurent time
  const currentTime = {
    currentHour: hour === 0 ? 12 : hour,
    ampm: hour <= 12 ? "pm" : "am",
    currentMinute: time.getMinutes(),
    currentSecond: time.getSeconds(),
  };
  return currentTime;
};

export default getCurrentTime;
