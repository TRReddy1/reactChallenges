import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [time, setTime] = useState(["00", "00", "00"]);
  const [id, setId] = useState(null);

  const handleClick = () => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        let milli = parseInt(prevTime[2]) + 1;
        let secs = parseInt(prevTime[1]);
        let mins = parseInt(prevTime[0]);

        if (milli === 100) {
          secs++;
          milli = 0;
        }

        if (secs === 60) {
          secs = 0;
          mins++;
        }

        return [
          mins.toString().padStart(2, "0"),
          secs.toString().padStart(2, "0"),
          milli.toString().padStart(2, "0"),
        ];
      });
    }, 10);

    setId(intervalId);
  };
  const handleStop = () => {
    clearInterval(id);
  };

  const handleReset = () => {
    clearInterval(id);
    setTime(["00", "00", "00"]);
  };

  useEffect(() => {
    return () => {
      clearInterval(id);
    };
  }, [id]);

  return (
    <>
      <div
        style={{
          height: "10rem",
          width: "10rem",
          borderRadius: "50%",
          border: "solid",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        stopWatch
        <div>{`${time[0]} : ${time[1]} : ${time[2]}`}</div>
        <button onClick={handleClick}>start</button>
        <button onClick={handleStop}>stop</button>
        <button onClick={handleReset}>reset</button>
      </div>
    </>
  );
}

export default App;
