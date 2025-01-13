import Countdown from "@/Components/Countdown";
import { Rule } from "@/Components/Rule";
import { Step } from "@/Components/Step";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Dashboard({ auth }) {
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
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-xl relative">
                        <div className="px-10 py-8 text-gray-900">
                            <h2 className="text-xl font-bold sm:text-2xl mb-3">
                                Mulai Kompetisi Demo Trading Oil🚀
                            </h2>

                            <Countdown targetDate="2025-01-01T00:00:00Z" />
                            <img
                                className="hidden md:block absolute bottom-0 right-0"
                                src="https://my.octafxidn.site/_scripts/react/assets/coin-wide-BbJzrCMF.webp"
                            />
                        </div>
                    </div>
                    <div className="mt-6 overflow-hidden bg-white shadow-sm sm:rounded-xl">
                        <div className="px-10 py-8 text-gray-900">
                            <h2 className="text-xl font-bold sm:text-2xl mb-6">
                                Perjalanan kompetisi Anda
                            </h2>
                            <Step current={currentStep} />
                        </div>
                    </div>
                    <div className="mt-6 overflow-hidden bg-white shadow-sm sm:rounded-xl">
                        <div className="px-10 py-8 text-gray-900">
                            <h2 className="text-xl font-bold sm:text-2xl mb-3">
                                Aturan kompetisi
                            </h2>
                            <div>
                                <Rule />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
