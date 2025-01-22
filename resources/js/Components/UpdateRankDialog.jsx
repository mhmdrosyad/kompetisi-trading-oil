import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function UpdateRankDialog({
    isOpen,
    handleCloseModal,
    userId,
    rank,
    allCorected,
    isCorrected,
    used,
}) {
    const [reason, setReason] = useState("");
    const [userRank, setUserRank] = useState(rank);
    const [usedRanks, setUsedRanks] = useState(used);

    const increaseRank = () => {
        let newRank = userRank + 1;

        if (rank === newRank) {
            setUserRank(newRank);
            return;
        }
        // Cari rank yang belum digunakan
        while (usedRanks.includes(newRank)) {
            newRank++; // Skip ke rank berikutnya yang belum digunakan
        }

        // Pastikan rank tidak melampaui peringkat terakhir yang valid
        if (!usedRanks.includes(newRank)) {
            setUserRank(newRank); // Pilih rank yang valid
        }
    };

    const decreaseRank = () => {
        let newRank = userRank - 1;

        if (rank === newRank) {
            setUserRank(newRank);
            return;
        }

        while (
            newRank >= 1 &&
            usedRanks.includes(newRank) &&
            newRank !== rank
        ) {
            newRank--;
        }

        if (newRank >= 1) {
            setUserRank(newRank); // Pilih rank yang valid
        }
    };

    const isIncreaseDisabled = () => {
        // Nonaktifkan tombol "increase" jika tidak ada rank yang bisa dipilih lebih tinggi
        return usedRanks[usedRanks.length - 1] <= userRank;
    };

    const isDecreaseDisabled = () => {
        // Jika userRank <= 1, tombol turunkan peringkat tetap dinonaktifkan
        if (userRank <= 1) {
            return true;
        }

        // Cek apakah ada rank yang lebih rendah yang belum digunakan
        for (let i = userRank - 1; i >= 1; i--) {
            if (!usedRanks.includes(i) || i === rank) {
                return false; // Tombol aktif jika ada rank lebih rendah yang belum digunakan
            }
        }

        // Jika semua rank lebih rendah sudah digunakan dan rank asli tidak ada di usedRanks, disable tombol
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            router.post(route("journal.correction.updateRank", userId), {
                custom_rank: userRank,
            });
            Swal.fire({
                icon: "success",
                title: "Sukses!",
                text: "Data koreksi berhasil disimpan.",
            });

            handleCloseModal();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Ada kesalahan.",
            });
            handleCloseModal();
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={handleCloseModal}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
                <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
                    <div className="bg-white rounded-md shadow-lg px-4 py-6">
                        <Dialog.Title className="text-xl font-bold text-gray-800 text-center mt-3">
                            {isCorrected ? "Edit Peringkat" : "Selesai Koreksi"}
                        </Dialog.Title>
                        <Dialog.Description className="mt-1 text-sm leading-relaxed text-center text-gray-500">
                            Silahkan cek data dibawah.
                        </Dialog.Description>
                        {!allCorected ? (
                            <div className="mt-3 px-4 rounded-md bg-amber-50 md:px-8">
                                <div className="py-3">
                                    <div className="flex">
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 rounded-full text-amber-500"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div className="self-center ml-3">
                                            <span className="text-amber-600 font-semibold">
                                                Warning
                                            </span>
                                            <p className="text-amber-600 mt-1">
                                                Ada jurnal yang belum dikoreksi,
                                                silahkan cek kembali.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        <div className="mt-3 flex flex-col rounded-lg bg-green-50 px-4 py-8 text-center">
                            <dt className="text-sm mb-1 font-medium text-gray-500">
                                Peringkat
                            </dt>

                            <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">
                                {userRank}
                            </dd>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 mt-2">
                            <button
                                className="w-full px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
                                onClick={decreaseRank}
                                disabled={isDecreaseDisabled()}
                            >
                                Naikkan Peringkat
                            </button>
                            <button
                                className="w-full px-4 py-2 bg-red-500 text-white rounded"
                                onClick={increaseRank}
                            >
                                Turunkan Peringkat
                            </button>
                        </div>
                        <div className="items-center gap-2 mt-3 text-sm sm:flex">
                            <Dialog.Close asChild>
                                <button
                                    onClick={handleSubmit}
                                    className="w-full mt-2 p-2.5 flex-1 text-white bg-green-600 rounded-md outline-none ring-offset-2 ring-green-600 hover:bg-green-400 focus:ring-2"
                                >
                                    Selesai
                                </button>
                            </Dialog.Close>
                            <Dialog.Close asChild>
                                <button
                                    onClick={handleCloseModal} // Reset textarea when canceled
                                    className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                >
                                    Batal
                                </button>
                            </Dialog.Close>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
