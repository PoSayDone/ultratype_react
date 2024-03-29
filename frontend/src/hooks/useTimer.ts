import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTypedSelector } from './useTypedSelector';
import { TimerActionTypes } from '../store/reducers/timerReducer';

const useTimer = () => {
    const dispatch = useDispatch();
    const { timerIsActive, time} = useTypedSelector(state => state.timer);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timerIsActive) {
                dispatch({
                    type: TimerActionTypes.TICK_TIMER
                });
            }
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [timerIsActive, time]);

    const handleStart = () => {
        dispatch({ type: TimerActionTypes.START_TIMER });
    };

    const handleStop = () => {
        dispatch({ type: TimerActionTypes.STOP_TIMER });
    };

    const handleReset = () => {
        dispatch({ type: TimerActionTypes.RESET_TIMER });
    };

    return { time, handleStart, handleStop, timerIsActive , handleReset};
};

export default useTimer;