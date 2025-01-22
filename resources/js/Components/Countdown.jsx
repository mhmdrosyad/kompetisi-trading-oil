import { Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

const Countdown = ({ targetDate, step }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        // Cleanup interval when component is unmounted
        return () => clearInterval(interval);
    }, [targetDate]);

    // Function to calculate the remaining time
    function calculateTimeLeft(targetDate) {
        const target = new Date(targetDate).getTime();
        const now = new Date().getTime();
        const difference = target - now;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    }

    if (
        timeLeft.days <= 0 &&
        timeLeft.hours <= 0 &&
        timeLeft.minutes <= 0 &&
        timeLeft.seconds <= 0
    ) {
        return (
            <div className="mt-6">
                <Link
                    href={route("journal.index")}
                    className="px-5 py-3 text-white duration-150 bg-green-500 rounded-full hover:bg-green-400 active:bg-green-600"
                >
                    {step > 2 ? "Lanjutkan Kompetisi" : "Mulai Sekarang"}
                </Link>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                    <div className="text-3xl">{timeLeft.days}</div>
                    <div className="text-sm -mt-1">Hari</div>
                </div>
                <span className="text-3xl">:</span>
                <div className="flex flex-col items-center">
                    <div className="text-3xl">{timeLeft.hours}</div>
                    <div className="text-sm -mt-1">Jam</div>
                </div>
                <span className="text-3xl">:</span>
                <div className="flex flex-col items-center">
                    <div className="text-3xl">{timeLeft.minutes}</div>
                    <div className="text-sm -mt-1">Menit</div>
                </div>
                <span className="text-3xl">:</span>
                <div className="flex flex-col items-center">
                    <div className="text-3xl">{timeLeft.seconds}</div>
                    <div className="text-sm -mt-1">Detik</div>
                </div>
            </div>
        </div>
    );
};

export default Countdown;
