import React from "react";

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <span className={isDanger ? "countdown danger" : "countdown"}>
      <span style={{ fontWeight: "bolder" }}>{value}</span>{" "}
    </span>
  );
};

export default DateTimeDisplay;
