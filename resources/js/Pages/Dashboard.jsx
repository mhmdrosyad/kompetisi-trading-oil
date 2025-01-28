import Countdown from "@/Components/Countdown";
import { CountdownEnd } from "@/Components/CountdownEnd";
import { DynamicCarousel } from "@/Components/DynamicCarousel";
import ProductList from "@/Components/ProductList";
import { Rule } from "@/Components/Rule";
import SimpleYouTubeEmbed from "@/Components/SimpleYoutubeEmbed";
import { Step } from "@/Components/Step";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Dashboard({ auth }) {
    const {
        userProgress,
        products,
        userRank,
        isPublish,
        isCompetitionEnded,
        targetDate,
    } = usePage().props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const stepMapping = {
        isi_jurnal: 3,
        selesai_jurnal: 4,
        upload_bukti: 5,
    };

    const getPrize = (rank) => {
        switch (rank) {
            case 1:
                return {
                    title: "Selamat Anda Juara 1",
                    prize: "Uang Rp. 2.500.000 + merchandise NTC",
                };
            case 2:
                return {
                    title: "Selamat Anda Juara 2",
                    prize: "Uang Rp. 1.500.000 + merchandise NTC",
                };
            case 3:
                return {
                    title: "Selamat Anda Juara 3",
                    prize: "Uang Rp. 1.000.000 + merchandise NTC",
                };
            case 4:
                return {
                    title: "Selamat Anda Juara 4",
                    prize: "Merchandise NTC",
                };
            case 5:
                return {
                    title: "Selamat Anda Juara 5",
                    prize: "Merchandise NTC",
                };
            case 6:
                return {
                    title: "Selamat Anda Juara 6",
                    prize: "Merchandise NTC",
                };
            case 7:
                return {
                    title: "Selamat Anda Juara 7",
                    prize: "Merchandise NTC",
                };
            case 8:
                return {
                    title: "Selamat Anda Juara 8",
                    prize: "Merchandise NTC",
                };
            case 9:
                return {
                    title: "Selamat Anda Juara 9",
                    prize: "Merchandise NTC",
                };
            case 10:
                return {
                    title: "Selamat Anda Juara 10",
                    prize: "Merchandise NTC",
                };
            default:
                return null;
        }
    };
    const prize = userRank ? getPrize(userRank) : null;

    useEffect(() => {
        if (userRank) {
            setIsModalVisible(true); // Tampilkan modal jika userRank ada
        }
    }, [userRank]);
    const handleCloseModal = () => setIsModalVisible(false);
    const handleOpenModal = () => setIsModalVisible(true);

    const getCurrentStep = () => {
        if (isPublish && isPublish.value == true) {
            return 6;
        }
        if (userProgress && userProgress.length > 0) {
            const completedSteps = userProgress
                .filter((progress) => progress.completed === 1) // Hanya yang sudah selesai
                .map((progress) => stepMapping[progress.step]); // Mapping step ke angka

            return Math.max(...completedSteps); // Ambil langkah terbesar
        }
        return 2;
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
                            {isCompetitionEnded &&
                            isCompetitionEnded == true ? (
                                <h2 className="text-xl font-bold sm:text-2xl mb-3">
                                    Kompetisi Telah Selesai
                                </h2>
                            ) : (
                                <h2 className="text-xl font-bold sm:text-2xl mb-3">
                                    Mulai Kompetisi Demo Trading Oil🚀
                                </h2>
                            )}

                            {targetDate ? (
                                <CountdownEnd
                                    isCompetitionEnded={isCompetitionEnded}
                                    targetDate={targetDate}
                                    startDateProps="2025-02-01T00:00:00Z"
                                />
                            ) : null}

                            <Countdown
                                isCompetitionEnded={isCompetitionEnded}
                                step={currentStep}
                                targetDate="2025-02-01T00:00:00Z"
                            />

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
                            {isPublish && isPublish.value == true ? (
                                <div className="mt-6 flex justify-end">
                                    <Link
                                        className="inline-flex justify-center items-center gap-2 rounded border border-green-500 bg-green-500 px-8 py-3 text-white hover:bg-transparent hover:text-green-500 focus:outline-none focus:ring active:text-green-400"
                                        href={route("pengumuman.user")}
                                    >
                                        <span className="text-sm font-medium">
                                            {" "}
                                            Lihat Pengumuman{" "}
                                        </span>

                                        <svg
                                            className="size-5 rtl:rotate-180"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            ) : null}
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
                            <div className="flex gap-2 items-center mb-4">
                                <h2 className="text-xl font-bold sm:text-2xl">
                                    Produk Kami
                                </h2>
                                <a
                                    href="https://ptntc.com/shop"
                                    target="_blank"
                                    className="py-1 px-3 rounded-full text-sm bg-green-100 text-green-500"
                                >
                                    Lihat Lainya
                                </a>
                            </div>
                            <div>
                                <ProductList products={products} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {userRank &&
                isModalVisible &&
                isPublish &&
                isPublish.value == true && (
                    <div
                        className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
                        onClick={handleCloseModal}
                    >
                        <div className="bg-white max-w-xl p-6 rounded-lg shadow-lg">
                            <div className="mb-3 flex justify-center">
                                <img src="/images/winner.png" width={200} />
                            </div>
                            <h2 className="text-xl md:text-3xl font-bold text-center mb-4">
                                {prize.title}🎉
                            </h2>
                            <p className="text-center text-gray-500">
                                Anda mendapatkan: {prize.prize}
                            </p>
                            <div className="mt-4 flex flex-col sm:flex-row gap-2">
                                <Link
                                    className="w-full inline-flex justify-center items-center gap-2 rounded border border-green-500 bg-green-500 px-8 py-3 text-white hover:bg-transparent hover:text-green-500 focus:outline-none focus:ring active:text-green-400"
                                    href={route("pengumuman.user")}
                                >
                                    <span className="text-sm font-medium">
                                        {" "}
                                        Daftar Pemenang{" "}
                                    </span>

                                    <svg
                                        className="size-5 rtl:rotate-180"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </Link>
                                <a
                                    className="w-full justify-center inline-flex items-center gap-2 rounded border border-green-500 px-8 py-3 text-green-500 hover:bg-green-500 hover:text-white focus:outline-none focus:ring active:bg-green-400"
                                    href="https://wa.me/6282299942080"
                                    target="_blank"
                                >
                                    <span className="text-sm font-medium">
                                        {" "}
                                        Klaim Hadiah{" "}
                                    </span>

                                    <svg
                                        className="size-5 rtl:rotate-180"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
        </AuthenticatedLayout>
    );
}
