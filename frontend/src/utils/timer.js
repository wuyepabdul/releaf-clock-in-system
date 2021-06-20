const getCurrentTime = () => {
  const time = new Date();
  const ampm = time.toLocaleTimeString().split(" ")[1];
  var hour = time.getHours();
  hour = hour % 12;

  // cuurent time
  const currentTime = {
    currentHour: hour === 0 ? 12 : hour,
    ampm,
    currentMinute: time.getMinutes(),
    currentSecond: time.getSeconds(),
  };
  return currentTime;
};

export default getCurrentTime;
