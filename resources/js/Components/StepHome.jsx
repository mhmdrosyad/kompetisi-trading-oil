import { Link } from "@inertiajs/react";

export default function StepHome() {
    const steps = [
        {
            text: (
                <>
                    Baca dan setujui{" "}
                    <Link href="/syarat">
                        <span className="underline decoration-1">
                            Syarat dan ketentuan
                        </span>
                    </Link>{" "}
                    kompetisi.
                </>
            ),
        },
        {
            text: (
                <>
                    Buka akun MT4 baru di broker IndoSukses Future{" "}
                    <Link href="/register">
                        <span className="underline decoration-1">
                            Lihat tutorial.
                        </span>
                    </Link>
                </>
            ),
        },
        {
            text: (
                <>
                    Daftar atau login di website ini{" "}
                    <Link href="/register">
                        <span className="underline decoration-1">
                            Daftar sekarang
                        </span>
                    </Link>{" "}
                    atau{" "}
                    <Link href="/login">
                        <span className="underline decoration-1">Login</span>
                    </Link>
                    .
                </>
            ),
        },
        {
            text: "Mulai trading di akun demo Anda.",
        },
        {
            text: "Isi jurnal di website ini sesuai hasil trading Anda di MT4.",
        },
        {
            text: "Upload bukti atau screenshot MT4 ke sistem.",
        },
        {
            text: "Tunggu pengumuman sesuai tanggal yang ditentukan, juri akan memverifikasi dan menilai hasil Anda.",
        },
    ];

    return (
        <div className="mt-4">
            {steps.map((step, idx) => (
                <div
                    key={idx}
                    className="relative flex items-center gap-4 mb-6"
                >
                    {/* Lingkaran Nomor */}
                    <div className="w-12 h-12 flex-shrink-0 rounded-full border-2 border-yellow-300 flex items-center justify-center text-xl font-bold">
                        <span>{idx + 1}</span>
                    </div>

                    <div>
                        <h5 className="text-gray-800">{step.text}</h5>
                        {/* Garis Vertikal */}
                        {idx < steps.length - 1 && (
                            <div className="absolute top-full left-6 h-6 w-px bg-yellow-300"></div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
