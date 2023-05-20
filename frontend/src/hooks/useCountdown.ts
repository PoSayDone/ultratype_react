import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCountdown, stopCountdown, resetCountdown, tickCountdown, CountdownActionTypes } from '../store/reducers/countDownReducer';
import { useTypedSelector } from './useTypedSelector';

const useCountDown = (timerConst: number) => {
    const dispatch = useDispatch();
    const { timerIsActive, time } = useTypedSelector(state => state.countDown);

    useEffect(() => {
        dispatch({ type: CountdownActionTypes.SET_START_TIME, payload: timerConst })
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (time > 0 && timerIsActive) {
                dispatch({
                    type: CountdownActionTypes.TICK_COUNTDOWN
                });
            }
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [timerIsActive, time]);


    const handleStart = () => {
        dispatch({ type: CountdownActionTypes.START_COUNTDOWN });
    };

    const handleStop = () => {
        dispatch({ type: CountdownActionTypes.STOP_COUNTDOWN });
    };

    const handleReset = () => {
        dispatch({ type: CountdownActionTypes.SET_START_TIME, payload: timerConst })
    }

    return { time, handleStart, handleStop, timerIsActive, handleReset };
};

export default useCountDown;