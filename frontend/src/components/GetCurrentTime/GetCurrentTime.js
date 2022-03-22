import React, { useEffect, useState } from "react";
import getCurrentTime from "../../utils/timer";

const GetCurrentTime = () => {
  const [time, setTime] = useState({
    hour: 0,
    minute: 0,
    second: 0,
    ampm: "",
  });

  useEffect(() => {
    const now = getCurrentTime();

    const interval = setInterval(() => {
      setTime({
        ...time,
        hour: now.currentHour,
        minute: now.currentMinute,
        second: now.currentSecond,
        ampm: now.ampm,
      });
    }, [1000]);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className="container p-5">
      <h1 className="mb-2">
        {new Date().toDateString()}
        
      </h1>
      <h2>{time.hour} : {time.minute}: {time.second} {time.ampm}{" "}</h2>
    </div>
  );
};

export default GetCurrentTime;
