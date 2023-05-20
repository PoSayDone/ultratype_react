import { useEffect, useState } from "react";

const useWpm = (text: string, timeLeft: number, timeConst : number | null = null): number => {
    const [wpm, setWpm] = useState<number>(0);

    useEffect(() => {
        let timeElapsed = timeLeft;
        if (timeConst !== null)
            timeElapsed = timeConst - timeLeft;
        const words = text.length / 5;
        const minutes = timeElapsed / 60;
        const wpm = Math.round(words / minutes);

        setWpm(wpm);
    }, [text, timeLeft]);

    return wpm;
};

export default useWpm;
