import React from "react";
import DateTimeDisplay from "./DateTimeDisplay";
import { useCountdown } from "./useCountdown";
import { Table } from "react-bootstrap";

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span style={{ color: "orangered", fontWeight: "bolder" }}>
        Expired!!!
      </span>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
      <Table className="mb-0" striped bordered hover size="sm">
        <thead>
          <tr>
            <th style={{ background: "gray", color: "white" }}>D</th>
            <th style={{ background: "gray", color: "white" }}>H</th>
            <th style={{ background: "gray", color: "white" }}>M</th>
            <th style={{ background: "gray", color: "white" }}>S</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <DateTimeDisplay
                value={days}
                type={"Days"}
                isDanger={days <= 3}
              />
            </td>
            <td>
              <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
            </td>
            <td>
              {" "}
              <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
            </td>
            <td>
              {" "}
              <DateTimeDisplay
                value={seconds}
                type={"Seconds"}
                isDanger={false}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
