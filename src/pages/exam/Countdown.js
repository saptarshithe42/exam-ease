import React from 'react'

import { useState, useEffect } from "react";

function Countdown({ examDuration, onTimerEnd }) {
    const [timeLeft, setTimeLeft] = useState(examDuration);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            onTimerEnd();
        }
    }, [timeLeft, onTimerEnd]);

    // calculate the hours, minutes, and seconds
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    // format the time as hh:mm:ss
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return (
        <div>
            Time Left: {formattedTime}
        </div>
    );
}


export default Countdown