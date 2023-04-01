import { useEffect, useState } from "react"

const useCountdown = (time: number) => {
    const [seconds, setSeconds] = useState(time);
    const [timerIsActive, setTimerActive] = useState(false);

    useEffect(() => {
        if (seconds > 0 && timerIsActive) {
            setTimeout(setSeconds, 1000, seconds - 1);
        } else {
            setTimerActive(false);
        }
    }, [seconds, timerIsActive]);

    return {
        seconds, timerIsActive, setTimerActive
    }
}

export default useCountdown