import React, { useEffect, useState } from 'react';

function Test(): JSX.Element {
    const [lastKeyPressTime, setLastKeyPressTime] = useState<number | null>(null);
    const [totalKeyPressTime, setTotalKeyPressTime] = useState<number>(0);
    const [elapsedTime, setElapsedTime] = useState<number>(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setElapsedTime((prevElapsedTime) => prevElapsedTime + 1000);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
        if (lastKeyPressTime !== null) {
            const timeSinceLastKeyPress = new Date().getTime() - lastKeyPressTime;
            console.log(`Time since last key press: ${timeSinceLastKeyPress}ms`);
            setTotalKeyPressTime(totalKeyPressTime + timeSinceLastKeyPress);
        }
        setLastKeyPressTime(new Date().getTime());
    }

    return (
        <div onKeyDown={handleKeyDown} tabIndex={0}>
            Press a key to track time between key presses
            <br />
            Total time between key presses: {totalKeyPressTime}ms
            <br />
            Elapsed time: {elapsedTime / 1000}s
        </div>
    );
}

export default Test