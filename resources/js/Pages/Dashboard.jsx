import Countdown from "@/Components/Countdown";
import { DynamicCarousel } from "@/Components/DynamicCarousel";
import ProductList from "@/Components/ProductList";
import { Rule } from "@/Components/Rule";
import SimpleYouTubeEmbed from "@/Components/SimpleYoutubeEmbed";
import { Step } from "@/Components/Step";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    const { userProgress, products } = usePage().props;
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

    const slides = [
        <div className="w-full">
            <img
                className="w-full"
                src="/images/imlek.png"
                alt="robot trading"
            />
        </div>,
        <div className="w-full">
            <img
                className="w-full"
                src="https://ptntc.com/wp-content/uploads/2025/01/Lomba-Demo-WEB-1024x307.png"
                alt="robot trading"
            />
        </div>,
        <div className="w-full">
            <img
                className="w-full"
                src="https://ptntc.com/wp-content/uploads/2024/12/robot-web-1024x307.png"
                alt="robot trading"
            />
        </div>,

        <a
            href="https://ptntc.com/akademi-trading-oil/"
            target="_blank"
            className="w-full"
        >
            <img
                className="w-full"
                src="https://ptntc.com/wp-content/uploads/2024/11/affiliate-WEB-1024x308.png"
                alt="robot trading"
            />
        </a>,
    ];

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

            <div className="pt-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-xl relative">
                        <div className="px-10 py-8 text-gray-900">
                            <DynamicCarousel slides={slides} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-xl relative">
                        <div className="px-10 py-8 text-gray-900">
                            <h2 className="text-xl font-bold sm:text-2xl mb-3">
                                Mulai Kompetisi Demo Trading Oil🚀
                            </h2>

                            <Countdown targetDate="2025-01-01T00:00:00Z" />
                            <img
                                width={245}
                                className="hidden md:block absolute -bottom-10 right-0"
                                src="/images/gf1.png"
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
                            <h2 className="text-xl font-bold sm:text-2xl mb-6">
                                Tutorial Isi Jurnal
                            </h2>
                            <p className="mb-3">
                                Berikut adalah video tutorial isi jurnal pada
                                kompetisi ini. Jika kurang jelas bisa lihat
                                artikel kami:{" "}
                                <a
                                    className="font-semibold text-green-500 hover:text-green-400"
                                    target="_blank"
                                    href="https://ptntc.com/cara-isi-jurnal-kompetisi-demo-trading-oil/"
                                >
                                    Tutorial Isi Jurnal Kompetisi Demo Trading
                                    Oil
                                </a>
                            </p>
                            <SimpleYouTubeEmbed videoId="OVyonGkxBFk" />
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
                    <div className="mt-6 overflow-hidden bg-white shadow-sm sm:rounded-xl">
                        <div className="px-10 py-8 text-gray-900">
                            <h2 className="text-xl font-bold sm:text-2xl mb-3">
                                Produk Kami
                            </h2>
                            <div>
                                <ProductList products={products} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
