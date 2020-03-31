import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import dateformat from 'dateformat';

function App() {
  const [time, setTime] = useState(new Date());
  const [rotation, setRotation] = useState(getRotation(new Date()));

  useEffect(() => {
    const interval = setInterval(() => getTime(), 200);
    return () => clearInterval(interval);
  }, [])


  function getTime() {
    const time = new Date();
    setTime(time);
    setRotation(getRotation(time));
  }

  const Number = ({ num }) => {
    return (
      <div className="number"
        style={{ transform: `rotate(${num * 30}deg) translateY(40px)` }}>
        {num}
      </div>
    );
  }
  const NumberMemo = useCallback((props) => Number(props), []);

  const Hand = ({ type }) => {
    return (
      <>
        <div className={`${type} hand`}
          style={{ transform: `translateX(-50%) rotate(${rotation[type]}deg)` }}>
        </div>
        <div className={`${type} hand hand-after`}
          style={{ transform: `translateX(-50%) rotate(${rotation[type] + 180}deg)` }}>
        </div>
      </>
    );
  }


  const Mark = ({ mark }) => {
    return (
      <div className={`mark-container`}
        style={{ transform: `rotate(${mark * 6}deg) translateY(5px)` }}>
        <div className={`mark`}
          style={{
            height: (mark % 5 === 0) ? '32px' : '18px',
            width: (mark % 5 === 0) ? '5px' : '2px',
          }}>
        </div>
      </div>
    );
  }
  const MarkMemo = useCallback((props) => Mark(props), []);


  function getRotation(time) {
    const secondsRatio = time.getSeconds() / 60 + (time.getMilliseconds() / 1000) / 60;
    const minutesRatio = (secondsRatio + time.getMinutes()) / 60;
    const hoursRatio = (minutesRatio + time.getHours()) / 12;
    return { hour: hoursRatio * 360, minute: minutesRatio * 360, second: secondsRatio * 360 };
  }

  return (
    <>
      <div id="time">{dateformat(time)}</div>
      <div className="content">
        <div className="clock-container">
          {['second', 'minute', 'hour'].map(type => <Hand key={type} type={type} />)}
          {Array(12).fill(0).map((x, i) => (<NumberMemo key={i} num={i + 1} />))}
          {Array(60).fill(0).map((x, i) => (<MarkMemo key={i} mark={i + 1} />))}
        </div>
      </div>
    </>
  );
}

export default App;
