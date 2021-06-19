import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import getCurrentTime from "../../utils/timer";

const GetCurrentTime = ({ history }) => {
  // component states
  const [time, setTime] = useState({
    hour: 0,
    minute: 0,
    second: 0,
    ampm: "",
  });

  useEffect(() => {
    const now = getCurrentTime();
    //set cuurent time
    const interval = setInterval(() => {
      setTime({
        ...time,
        hour: now.currentHour,
        minute: now.currentMinute,
        second: now.currentSecond,
        ampm: now.ampm,
      });
    }, [1000]);

    // cleanup
    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className="container p-5">
      <h1>
        {" "}
        {time.hour} : {time.minute}: {time.second} {time.ampm}{" "}
      </h1>
    </div>
  );
};

export default withRouter(GetCurrentTime);
