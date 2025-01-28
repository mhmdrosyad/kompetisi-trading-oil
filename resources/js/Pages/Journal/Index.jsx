import { CountdownEnd } from "@/Components/CountdownEnd";
import JournalExist from "@/Components/JournalExist";
import JournalForm from "@/Components/JournalForm";
import PanduanJurnal from "@/Components/PanduanJurnal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Index({ auth }) {
    const { journals, finishJournal, profile, isCompetitionEnded, targetDate } =
        usePage().props;
    const numberJurnal = journals.length + 1;
    const totalProfitLossMember = journals?.reduce((total, journal) => {
        // Pastikan profit_loss ada dan berupa angka
        const profitLoss = parseFloat(journal.profit_loss) || 0;
        return total + profitLoss;
    }, 0);
    const totalProfitLossPrecentage = Math.round(
        (totalProfitLossMember / 5000) * 100
    );
    const formatProfitLoss = (totalProfitLoss) => {
        // Format dengan pemisah ribuan
        const formattedAmount = totalProfitLoss.toLocaleString();

        if (totalProfitLoss >= 0) {
            return `$${formattedAmount}`;
        } else {
            return `-$${formattedAmount}`;
        }
    };

    const handleConfirmation = (e) => {
        e.preventDefault(); // Mencegah navigasi langsung

        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Jika melanjutkan, isian jurnal tidak bisa diubah!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, lanjutkan",
            cancelButtonText: "Batal",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router.get(route("images.index"));
            }
        });
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Isi Jurnal
                </h2>
            }
        >
            <Head title="Isi Jurnal" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-xl relative">
                        <div className="px-6 sm:px-10 py-8 text-gray-900">
                            <h2 className="text-xl font-bold sm:text-2xl md:text-3xl mb-4">
                                Isi jurnal sesuai aturan
                            </h2>
                            <p className="mb-3">
                                Jika belum mengerti silahkan lihat tutorial di{" "}
                                <a
                                    className="text-green-500 hover:text-green-400"
                                    target="_blank"
                                    href="https://ptntc.com/cara-isi-jurnal-kompetisi-demo-trading-oil/"
                                >
                                    link ini
                                </a>{" "}
                                atau lihat video di{" "}
                                <Link
                                    className="text-green-500 hover:text-green-400"
                                    href={route("dashboard")}
                                >
                                    Dasboard
                                </Link>
                                .
                            </p>

                            <div className="mb-3">
                                <PanduanJurnal />
                            </div>
                            <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                                    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium text-gray-900">
                                            Nama Peserta
                                        </dt>
                                        <dd className="text-gray-700 sm:col-span-2">
                                            {profile ? profile.full_name : "-"}
                                        </dd>
                                    </div>

                                    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium text-gray-900">
                                            Nama akun MT4
                                        </dt>
                                        <dd className="text-gray-700 sm:col-span-2">
                                            {profile
                                                ? profile.mt4_account_name
                                                : "-"}
                                        </dd>
                                    </div>

                                    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium text-gray-900">
                                            No Akun MT4
                                        </dt>
                                        <dd className="text-gray-700 sm:col-span-2">
                                            {profile
                                                ? profile.mt4_login_number
                                                : "-"}
                                        </dd>
                                    </div>

                                    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium text-gray-900">
                                            Modal awal
                                        </dt>
                                        <dd className="text-gray-700 sm:col-span-2">
                                            $5,000
                                        </dd>
                                    </div>
                                    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium text-gray-900">
                                            Total Profit
                                        </dt>
                                        <dd className="text-gray-700 sm:col-span-2">
                                            {formatProfitLoss(
                                                totalProfitLossMember
                                            )}{" "}
                                            ({totalProfitLossPrecentage}%)
                                        </dd>
                                    </div>
                                    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium text-gray-900">
                                            Waktu Kompetisi
                                        </dt>
                                        <dd className="text-gray-700 font-bold sm:col-span-2">
                                            {targetDate ? (
                                                <CountdownEnd
                                                    isCompetitionEnded={
                                                        isCompetitionEnded
                                                    }
                                                    targetDate={targetDate}
                                                />
                                            ) : null}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                            {journals?.length > 0 &&
                                journals.map((journal, index) => (
                                    <JournalExist
                                        key={journal.id || index}
                                        index={index}
                                        journal={journal}
                                    />
                                ))}
                            {!isCompetitionEnded ? (
                                !finishJournal || !finishJournal.completed ? (
                                    <JournalForm number={journals.length + 1} />
                                ) : (
                                    <div className="w-full mt-4">
                                        <div className="flex justify-between p-4 rounded-md bg-green-50 border border-green-300">
                                            <div className="flex items-start gap-3 w-full">
                                                <div>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 text-green-500"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="flex-1 self-center">
                                                    <span className="text-green-600 font-medium">
                                                        Anda telah selesai
                                                    </span>
                                                    <div className="text-green-600">
                                                        <p className="mt-2 sm:text-sm">
                                                            Anda telah
                                                            menyelesaikan
                                                            pengisian jurnal.
                                                        </p>
                                                    </div>
                                                </div>
                                                <button className="">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        className="w-5 h-5 text-green-600"
                                                    >
                                                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <div className="w-full mt-4">
                                    <div className="flex justify-between p-4 rounded-md bg-red-50 border border-red-300">
                                        <div className="flex items-start gap-3 w-full">
                                            <div>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 text-red-500"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="flex-1 self-center">
                                                <span className="text-red-600 font-medium">
                                                    Kompetisi telah berakhir
                                                </span>
                                                <div className="text-red-600">
                                                    <p className="mt-2 sm:text-sm">
                                                        Anda tidak dapat mengisi
                                                        jurnal lagi karena
                                                        kompetisi telah
                                                        berakhir.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-12">
                                {!finishJournal || !finishJournal.completed ? (
                                    <button
                                        onClick={handleConfirmation}
                                        className="px-5 py-3 text-white duration-150 bg-green-500 rounded-lg hover:bg-green-400 active:bg-green-600"
                                    >
                                        Selanjutnya
                                    </button>
                                ) : (
                                    <Link
                                        href={route("images.index")}
                                        className="px-5 py-3 text-white duration-150 bg-green-500 rounded-lg hover:bg-green-400 active:bg-green-600"
                                    >
                                        Selanjutnya
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
