import React from "react";

const Timer = ({ changeHandler, timer }) => {
  return (
    <div className="timer">
      <form>
        <p>Iterate every:</p>
        <input
          type="number"
          value={timer}
          name="timer"
          onChange={changeHandler}
          required
        />{" "}
        <p>ms</p>
      </form>
    </div>
  );
};

export default Timer;
