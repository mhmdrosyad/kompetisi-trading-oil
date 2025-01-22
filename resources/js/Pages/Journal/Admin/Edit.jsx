import React, { useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import KoreksiJurnal from "@/Components/KoreksiJurnal";
import UserGallery from "@/Components/UserGallery";
import DisqualifyModal from "@/Components/DisqualifyModal";
import Swal from "sweetalert2";
import UpdateRankDialog from "@/Components/UpdateRankDialog";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    HomeIcon,
} from "@heroicons/react/24/solid";

export default function Edit({ auth }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenUpdateRank, setIsOpenUpdateRank] = useState(false);
    const { user, usedRanks, prevUser, nextUser } = usePage().props;
    const areAllJournalsCorrected = user.journals.every(
        (journal) => journal.journal_corrections.length > 0
    );
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleOpenUpdateRank = () => setIsOpenUpdateRank(true);
    const handleCloseUpdateRank = () => setIsOpenUpdateRank(false);

    function profitLost(totalProfitLoss) {
        const totalProfitLossPercentage =
            totalProfitLoss !== 0
                ? Math.round((totalProfitLoss / 5000) * 100)
                : 0;
        return `$${totalProfitLoss} (${totalProfitLossPercentage}%)`;
    }

    const handleCancelDisqualify = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Apakah yakin?",
            text: "Apakah yakin untuk membatalkan diskualifikasi untuk peserta ini?",
            icon: "warning",
            showCancelButton: true, // Menampilkan tombol batal
            confirmButtonText: "Ya, batalkan diskualifikasi!",
            cancelButtonText: "Tidak",
            reverseButtons: true, // Membalik posisi tombol
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    router.post(
                        route("journal.correction.undoDisqualify", user.id)
                    );
                    Swal.fire({
                        icon: "success",
                        title: "Sukses!",
                        text: "Peserta tidak jadi didiskualifikasi.",
                    });
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: "Gagal." + error,
                    });
                }
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Koreksi Jurnal {user.name}
                </h2>
            }
        >
            <Head title={`Koreksi Jurnal ${user.name}`} />
            <Container>
                <div className="p-6 rounded-lg bg-white shadow">
                    <div className="flex flex-col gap-2 sm:flex-row justify-between mb-4">
                        <h1 className="text-2xl font-bold">
                            Koreksi Jurnal {user.name}
                        </h1>
                        <div className="flex items-center">
                            {user.is_corrected ? (
                                <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-3 py-0.5 text-emerald-700">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="-ms-1 me-1.5 size-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>

                                    <p className="whitespace-nowrap text-sm">
                                        Sudah Dikoreksi
                                    </p>
                                </span>
                            ) : (
                                <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="-ms-1 me-1.5 size-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                        />
                                    </svg>

                                    <p className="whitespace-nowrap text-sm">
                                        Belum Dikoreksi
                                    </p>
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                        <dl className="-my-3 divide-y divide-gray-100 text-sm">
                            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-medium text-gray-900">
                                    Peringkat
                                </dt>
                                <dd className="text-gray-700 sm:col-span-2">
                                    {Boolean(!user.is_disqualified) ? (
                                        user.custom_rank ? (
                                            user.custom_rank
                                        ) : (
                                            user.rank
                                        )
                                    ) : (
                                        <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="-ms-1 me-1.5 size-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                                />
                                            </svg>

                                            <p className="whitespace-nowrap text-sm">
                                                Diskualifikasi
                                            </p>
                                        </span>
                                    )}
                                </dd>
                            </div>
                            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-medium text-gray-900">
                                    Nama
                                </dt>
                                <dd className="text-gray-700 sm:col-span-2">
                                    {user.profile.full_name}
                                </dd>
                            </div>

                            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-medium text-gray-900">
                                    Email
                                </dt>
                                <dd className="text-gray-700 sm:col-span-2">
                                    {user.email}
                                </dd>
                            </div>

                            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-medium text-gray-900">
                                    No. WA
                                </dt>
                                <dd className="text-gray-700 sm:col-span-2">
                                    {user.profile.whatsapp_number}
                                </dd>
                            </div>

                            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-medium text-gray-900">
                                    Total Profit/Loss:
                                </dt>
                                <dd className="text-gray-700 sm:col-span-2">
                                    {profitLost(user.total_profit_loss)}
                                </dd>
                            </div>
                            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-medium text-gray-900">
                                    Nama Akun MT4:
                                </dt>
                                <dd className="text-gray-700 sm:col-span-2">
                                    {user.profile.mt4_account_name}
                                </dd>
                            </div>
                            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-medium text-gray-900">
                                    Nomor Login MT4:
                                </dt>
                                <dd className="text-gray-700 sm:col-span-2">
                                    {user.profile.mt4_login_number}
                                </dd>
                            </div>
                            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-medium text-gray-900">
                                    Investor Password:
                                </dt>
                                <dd className="text-gray-700 sm:col-span-2">
                                    {user.profile.investor_password}
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <span className="flex items-center mt-6 mb-3">
                        <span className="pr-6 font-bold">
                            Gambar dari Peserta
                        </span>
                        <span className="h-px flex-1 bg-gray-300"></span>
                    </span>
                    <div className="my-4">
                        <UserGallery images={user.images} />
                    </div>
                    <span className="flex items-center mt-6 mb-3">
                        <span className="pr-6 font-bold">Jurnal Peserta</span>
                        <span className="h-px flex-1 bg-gray-300"></span>
                    </span>
                    {user?.journals?.length > 0 &&
                        user.journals.map((journal, index) => (
                            <KoreksiJurnal
                                key={journal.id || index}
                                index={index}
                                journal={journal}
                            />
                        ))}

                    <div className="mt-6">
                        <span className="flex items-center mt-6 mb-3">
                            <span className="pr-6 font-bold">
                                Ringkasan Koreksi
                            </span>
                            <span className="h-px flex-1 bg-gray-300"></span>
                        </span>
                        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-between">
                            <div>
                                <div className="max-w-fit flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                                    <dl className="-my-3 divide-y divide-gray-100 text-sm">
                                        <div className="grid gap-1 p-3 grid-cols-3 sm:gap-4">
                                            <dt className="font-medium text-gray-900">
                                                Jumlah Jurnal
                                            </dt>
                                            <dd>:</dd>
                                            <dd className="font-bold text-gray-700">
                                                {user.journals.length}
                                            </dd>
                                        </div>

                                        <div className="grid gap-1 p-3 grid-cols-3 sm:gap-4">
                                            <dt className="font-medium text-gray-900">
                                                Sesuai
                                            </dt>
                                            <dd>:</dd>
                                            <dd className="font-bold text-green-500">
                                                {
                                                    user.journals.filter(
                                                        (journal) =>
                                                            journal
                                                                .journal_corrections[0]
                                                                ?.is_valid ==
                                                            true
                                                    ).length
                                                }
                                            </dd>
                                        </div>

                                        <div className="grid gap-1 p-3 grid-cols-3 sm:gap-4">
                                            <dt className="font-medium text-gray-900">
                                                Tidak Sesuai
                                            </dt>
                                            <dd>:</dd>
                                            <dd className="font-bold text-red-600">
                                                {
                                                    user.journals.filter(
                                                        (journal) =>
                                                            journal
                                                                .journal_corrections[0]
                                                                ?.is_valid ==
                                                            false
                                                    ).length
                                                }
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                            {Boolean(!user.is_disqualified) ? (
                                <div className="flex gap-2 flex-col">
                                    <div className="flex flex-col rounded-lg bg-green-50 px-4 py-8 text-center">
                                        <dt className="text-sm mb-1 font-medium text-gray-500">
                                            Peringkat
                                        </dt>

                                        <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">
                                            {user.custom_rank
                                                ? user.custom_rank
                                                : user.rank}
                                        </dd>
                                    </div>
                                    <div className="flex gap-2 flex-col sm:flex-row">
                                        <button
                                            className="inline-block rounded border border-red-500 bg-red-500 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-red-500 focus:outline-none focus:ring active:text-red-500"
                                            onClick={handleOpenModal}
                                        >
                                            Diskualifikasi
                                        </button>

                                        <button
                                            className="inline-block rounded border border-green-500 px-12 py-3 text-sm font-medium text-green-500 hover:bg-green-500 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                                            onClick={handleOpenUpdateRank}
                                        >
                                            {user.is_corrected
                                                ? "Edit Peringkat"
                                                : "Selesai Koreksi"}
                                        </button>
                                    </div>
                                    <DisqualifyModal
                                        isOpen={isModalOpen}
                                        handleCloseModal={handleCloseModal}
                                        userId={user.id}
                                    />
                                    <UpdateRankDialog
                                        isOpen={isOpenUpdateRank}
                                        handleCloseModal={handleCloseUpdateRank}
                                        userId={user.id}
                                        rank={
                                            user.custom_rank
                                                ? user.custom_rank
                                                : user.rank
                                        }
                                        allCorected={areAllJournalsCorrected}
                                        isCorrected={user.is_corrected}
                                        used={usedRanks}
                                    />
                                </div>
                            ) : (
                                <div className="flex gap-2 flex-col sm:flex-row sm:items-baseline">
                                    <button
                                        className="inline-block rounded border border-red-500 bg-red-500 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-red-500 focus:outline-none focus:ring active:text-red-500"
                                        onClick={handleCancelDisqualify}
                                    >
                                        Batalkan Diskualifikasi
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-6 py-6 rounded-lg bg-white shadow">
                    <div className="px-4 text-gray-600 md:px-8">
                        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between text-sm text-gray-600 font-medium">
                            {prevUser ? (
                                <Link
                                    href={route("juries.edit", `${prevUser}`)}
                                    className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50 inline-flex items-center gap-2"
                                >
                                    <ArrowLeftIcon className="size-4" />
                                    Koreksi Peringkat Sebelumnya
                                </Link>
                            ) : null}
                            <Link
                                className="bg-green-500 hover:bg-green-400 p-3 rounded-lg"
                                href={route("juries.index")}
                            >
                                <HomeIcon className="size-4 text-white" />
                            </Link>
                            {nextUser ? (
                                <Link
                                    href={route("juries.edit", `${nextUser}`)}
                                    className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50 inline-flex items-center gap-2"
                                >
                                    Koreksi Peringkat Selanjutnya
                                    <ArrowRightIcon className="size-4" />
                                </Link>
                            ) : null}
                        </div>
                    </div>
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
