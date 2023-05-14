import { useState, useEffect } from 'react';
import { useInput } from '../hooks/useInput';
import { useEngine } from '../hooks/useEngine';
import { useAccuracy } from '../hooks/useAccuracy';
import { useWpm } from '../hooks/useWpm';
import { useTimer } from '../hooks/useTimer';

const text = 'The quick brown fox jumps over the lazy dog';

const TypingTest = () => {
  const [inputValue, handleInputChange, resetInputValue] = useInput('');
  const { stage, index, duration, errors, start, finish, reset, ref } = useEngine(text);
  const accuracy = useAccuracy(text, index);
  const { time, isRunning, start: startTimer, stop: stopTimer, reset: resetTimer } = useTimer();
  const wpm = useWpm(text, duration);

  useEffect(() => {
    if (stage === 'run') {
      startTimer();
    } else {
      stopTimer();
    }
  }, [stage]);

  const handleReset = () => {
    resetInputValue();
    reset();
    resetTimer();
  };

  return (
    <div>
      <div>Text: {text}</div>
      <div>Input Value: {inputValue}</div>
      <div>Stage: {stage}</div>
      <div>Index: {index}</div>
      <div>Duration: {duration}</div>
      <div>Errors: {errors}</div>
      <div>Accuracy: {accuracy}%</div>
      <div>Time: {time}s</div>
      <div>WPM: {wpm}</div>
      <button onClick={start}>Start</button>
      <button onClick={finish}>Finish</button>
      <button onClick={handleReset}>Reset</button>
      <div ref={ref} contentEditable={stage === 'run' ? 'true' : 'false'} onInput={handleInputChange}></div>
    </div>
  );
};

export default TypingTest;