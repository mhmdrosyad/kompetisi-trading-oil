import Countdown from "@/Components/Countdown";
import { Rule } from "@/Components/Rule";
import { Step } from "@/Components/Step";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Finish() {
    const { userProgress } = usePage().props;
    const stepMapping = {
        isi_jurnal: 3,
        selesai_jurnal: 4,
        upload_bukti: 5,
    };

    const getCurrentStep = () => {
        if (userProgress && userProgress.length > 0) {
            const completedSteps = userProgress
                .filter((progress) => progress.completed === 1) // Hanya yang sudah selesai
                .map((progress) => stepMapping[progress.step]); // Mapping step ke angka

            return Math.max(...completedSteps); // Ambil langkah terbesar
        }
        return 2; // Default jika tidak ada progres
    };
    const currentStep = getCurrentStep();
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Selamat
                </h2>
            }
        >
            <Head title="Selamat" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mt-6 overflow-hidden bg-white shadow-sm sm:rounded-xl">
                        <div className="px-10 py-8 text-gray-900">
                            <h2 className="text-center text-xl font-bold sm:text-2xl mb-6">
                                Selamat Anda Telah Selesai!👏🏻🎉
                            </h2>
                            <p className="text-center mb-6">
                                Selamat telah menyelesaikan kompetisi, silahkan
                                tunggu pengumuman di tanggal yang sudah
                                ditentukan
                            </p>
                            <div className="mb-3">
                                <Step current={currentStep} />
                            </div>

                            <div className="flex justify-center mt-6">
                                <Link
                                    href={route("dashboard")}
                                    className="px-5 py-3 text-white duration-150 bg-green-500 rounded-full hover:bg-green-400 active:bg-green-600 flex items-center"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 15 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                                            fill="currentColor"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    Kembali ke Dashboard
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
