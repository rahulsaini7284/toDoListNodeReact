import React from "react";
import CountdownTimer from "./Timer";

const ShowTimer = ({ time }) => {
  return (
    <div>
      <CountdownTimer targetDate={time} />
    </div>
  );
};

export default ShowTimer;
