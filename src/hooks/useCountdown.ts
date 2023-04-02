import { useEffect, useState } from "react"

const useCountdown = (time: number) => {
    const [timeLeft, setTimeLeft] = useState(time);
    const [timerIsActive, setTimerIsActive] = useState(false);

    useEffect(() => {
        if (timeLeft > 0 && timerIsActive) {
            setTimeout(setTimeLeft, 1000, timeLeft - 1);
        } else {
            setTimerIsActive(false);
        }
    }, [timeLeft, timerIsActive]);

    return {
        timeLeft, timerIsActive, setTimerIsActive
    }
}

export default useCountdown