import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DataTable from "@/Components/DataTable";
import Container from "@/Components/Container";

export default function Index({ auth }) {
    const { users, disqualifiedUsers } = usePage().props;
    const usersArray = Object.values(users);
    const disqualifiedUsersArray = Object.values(disqualifiedUsers);
    const columns = [
        {
            id: "index", // Tambahkan ID untuk nomor urut
            header: "Peringkat", // Header untuk kolom nomor urut
            cell: ({ row }) => {
                return row.original.rank ? row.original.rank : row.index + 1;
            },
        },
        {
            id: "name",
            header: "Nama",
            accessorKey: "name",
        },
        {
            id: "email",
            header: "Email",
            accessorKey: "email",
        },
        {
            id: "profit_loss",
            header: "Profit/Loss",
            cell: ({ row }) => {
                const totalProfitLoss =
                    parseFloat(row.original.total_profit_loss) || 0; // Menggunakan nullish coalescing
                const totalProfitLossPercentage =
                    totalProfitLoss !== 0
                        ? Math.round((totalProfitLoss / 5000) * 100)
                        : 0;

                const formattedProfitLoss =
                    totalProfitLoss % 1 === 0
                        ? totalProfitLoss.toFixed(0)
                        : totalProfitLoss.toFixed(2);
                return `$${formattedProfitLoss} (${totalProfitLossPercentage}%)`;
            },
        },
        {
            id: "corrected", // ID untuk kolom status koreksi
            header: "Status Koreksi", // Header untuk kolom status koreksi
            cell: ({ row }) => {
                const isCorrected = row.original.is_corrected; // Periksa apakah is_corrected true
                return isCorrected ? "✅" : ""; // Menampilkan ceklis jika sudah dikoreksi
            },
        },
        {
            id: "actions",
            header: "Aksi",
            cell: ({ row }) => (
                <Link
                    href={route("juries.edit", `${row.original.id}`)} // Menggunakan ID pengguna dari data
                    className={`inline-block rounded px-4 py-2 text-xs font-medium text-white ${
                        row.original.is_corrected
                            ? "bg-yellow-300 hover:bg-yellow-400"
                            : "bg-green-500 hover:bg-green-600"
                    }`}
                >
                    {row.original.is_corrected ? "Edit Koreksi" : "Koreksi"}
                </Link>
            ),
        },
    ];

    const columnsDis = [
        {
            id: "index", // Tambahkan ID untuk nomor urut
            header: "Peringkat", // Header untuk kolom nomor urut
            cell: ({ row }) => {
                return row.original.rank ? row.original.rank : row.index + 1;
            },
        },
        {
            id: "name",
            header: "Nama",
            accessorKey: "name",
        },
        {
            id: "email",
            header: "Email",
            accessorKey: "email",
        },
        {
            id: "profit_loss",
            header: "Profit/Loss",
            cell: ({ row }) => {
                const totalProfitLoss =
                    parseFloat(row.original.total_profit_loss) || 0; // Menggunakan nullish coalescing
                const totalProfitLossPercentage =
                    totalProfitLoss !== 0
                        ? Math.round((totalProfitLoss / 5000) * 100)
                        : 0;

                const formattedProfitLoss =
                    totalProfitLoss % 1 === 0
                        ? totalProfitLoss.toFixed(0)
                        : totalProfitLoss.toFixed(2);
                return `$${formattedProfitLoss} (${totalProfitLossPercentage}%)`;
            },
        },
        {
            id: "corrected", // ID untuk kolom status koreksi
            header: "Catatan Diskualifikasi", // Header untuk kolom status koreksi
            cell: ({ row }) => {
                return row.original.disqualification_reason; // Periksa apakah is_corrected true
            },
        },
        {
            id: "actions",
            header: "Aksi",
            cell: ({ row }) => (
                <Link
                    href={route("juries.edit", `${row.original.id}`)} // Menggunakan ID pengguna dari data
                    className="inline-block rounded bg-green-500 px-4 py-2 text-xs font-medium text-white hover:bg-green-600"
                >
                    Ubah
                </Link>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Daftar Peserta
                </h2>
            }
        >
            <Head title="Daftar Peserta" />
            <Container>
                <div className="p-6 rounded-lg bg-white shadow">
                    <h1 className="text-2xl font-bold mb-4">Peserta</h1>
                    {usersArray.length > 0 ? (
                        <DataTable columns={columns} data={usersArray} />
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
                <div className="mt-6 p-6 rounded-lg bg-white shadow">
                    <h1 className="text-2xl font-bold mb-4">
                        Peserta Diskualifikasi
                    </h1>
                    {disqualifiedUsersArray.length > 0 ? (
                        <DataTable
                            columns={columnsDis}
                            data={disqualifiedUsersArray}
                        />
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
