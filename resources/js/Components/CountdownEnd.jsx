import React, { useEffect, useState } from "react";

export const CountdownEnd = ({ isCompetitionEnded, targetDate }) => {
    const startDate = new Date();
    const isDateValid = new Date() >= startDate;
    const [timeLeft, setTimeLeft] = useState(0);
    useEffect(() => {
        // Jika kompetisi sudah berakhir atau targetDate tidak ada, hentikan countdown
        if (isCompetitionEnded || !targetDate) return;

        // Cek apakah targetDate hanya berupa tanggal dan tambahkan waktu 23:59:59
        const adjustedTargetDate = new Date(targetDate);

        // Set waktu ke 23:59:59 jika jam, menit, dan detik 0
        adjustedTargetDate.setHours(23, 59, 59, 999);

        // Dapatkan waktu target dalam milidetik
        const target = adjustedTargetDate.getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime(); // Waktu lokal dalam milidetik
            const distance = target - now;

            if (distance <= 0) {
                clearInterval(interval);
                setTimeLeft(0);
            } else {
                setTimeLeft(distance);
            }
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval
    }, [targetDate, isCompetitionEnded]);

    // Mengubah waktu ke format yang lebih mudah dibaca
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return (
        <div>
            {targetDate && isDateValid ? (
                !isCompetitionEnded ? (
                    <div>
                        <p>
                            Waktu Tersisa: {days} Hari {hours} Jam {minutes}{" "}
                            Menit {seconds} Detik
                        </p>
                    </div>
                ) : (
                    <p>Kompetisi telah berakhir</p>
                )
            ) : null}
        </div>
    );
};
