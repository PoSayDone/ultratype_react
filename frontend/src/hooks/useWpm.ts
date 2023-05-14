import { useEffect, useState } from "react";

const useWpm = (text: string, timeConst: number, timeLeft: number): number => {
    const [wpm, setWpm] = useState<number>(0);

    useEffect(() => {
        const timeElapsed = timeConst - timeLeft
        const words = text.length/5;
        const minutes = timeElapsed / 60;
        const wpm = Math.round(words / minutes);

        setWpm(wpm);
    }, [text, timeLeft]);

    return wpm;
};

export default useWpm