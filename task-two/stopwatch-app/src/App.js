import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
  };

  const pauseStopwatch = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container">
      <h1>⏱ Stopwatch Web Application</h1>
      <div className="stopwatch">
        <h2>{formatTime(time)}</h2>
        <div className="buttons">
          {!isRunning ? (
            <button onClick={startStopwatch}>Start</button>
          ) : (
            <button onClick={pauseStopwatch}>Pause</button>
          )}
          <button onClick={resetStopwatch}>Reset</button>
          <button onClick={addLap} disabled={!isRunning}>
            Lap
          </button>
        </div>
      </div>
      <div className="laps">
        <h3>Lap Times</h3>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>
              Lap {index + 1}: {formatTime(lap)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
