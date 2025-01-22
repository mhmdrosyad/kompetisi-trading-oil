import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function DisqualifyModal({ isOpen, handleCloseModal, userId }) {
    const [reason, setReason] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!reason.trim()) {
            handleCloseModal();
            Swal.fire({
                icon: "warning",
                title: "Gagal!",
                text: "Harus isikan alasan diskualifikasi.",
            });
            return; // Menghentikan proses jika alasan kosong
        }

        try {
            router.post(route("journal.correction.disqualify", userId), {
                reason: reason,
            });
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "The disqualification reason has been submitted successfully.",
            });

            handleCloseModal();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "An error occurred while submitting the reason. Please try again.",
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
                            {" "}
                            Alasan Diskualifikasi
                        </Dialog.Title>
                        <Dialog.Description className="mt-1 text-sm leading-relaxed text-center text-gray-500">
                            Tuliskan alasan diskualifikasi di bawah ini..
                        </Dialog.Description>
                        <textarea
                            className="w-full mt-3 p-2 border focus:border-green-500 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            placeholder="Tuliskan disini..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                        <div className="items-center gap-2 mt-3 text-sm sm:flex">
                            <Dialog.Close asChild>
                                <button
                                    onClick={handleSubmit}
                                    className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 hover:bg-red-400 focus:ring-2"
                                >
                                    Diskualifikasi
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
