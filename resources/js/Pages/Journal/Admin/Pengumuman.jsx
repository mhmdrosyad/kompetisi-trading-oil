import Container from "@/Components/Container";
import WinnerCard from "@/Components/WinnerCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Pengumuman({ auth }) {
    const { users, emailStatus, publishStatus } = usePage().props;
    const [isSentEmail, setIsSentEmail] = useState(emailStatus);
    const [isPublish, setIsPublish] = useState(publishStatus);

    const handelSendEmail = (e) => {
        e.preventDefault();
        router.post(
            route("send.email.winner"),
            {},
            {
                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Email Terkirim",
                        text: "Email berhasil dikirim kepada pemenang!",
                        confirmButtonText: "OK",
                    });
                    setIsSentEmail(true);
                },
                onError: () => {
                    Swal.fire({
                        icon: "error",
                        title: "Gagal Mengirim Email",
                        text: "Terjadi kesalahan saat mengirim email. Silakan coba lagi.",
                        confirmButtonText: "OK",
                    });
                },
            }
        );
    };
    const handlePublish = (e) => {
        e.preventDefault();
        router.post(
            route("pengumuman.admin.publish"),
            {},
            {
                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: "Pengumuman telah dipublish ke website ini dan bisa dilihat seluruh user!",
                        confirmButtonText: "OK",
                    });
                    setIsPublish((prevState) => !prevState);
                },
                onError: () => {
                    Swal.fire({
                        icon: "error",
                        title: "Gagal Publish",
                        text: "Terjadi kesalahan saat publish pengumuman. Silakan coba lagi.",
                        confirmButtonText: "OK",
                    });
                },
            }
        );
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Pemenang
                </h2>
            }
        >
            <Head title="Pemenang Kompetisi" />
            <div className="max-w-xl mx-auto mt-8">
                <div className="p-3">
                    <h2 className="mb-6 font-bold text-xl sm:text-3xl text-center">
                        Daftar Pemenang Kompetisi
                    </h2>

                    {users
                        ? users.map((user, index) => (
                              <WinnerCard
                                  key={index}
                                  user={user}
                                  index={index}
                              />
                          ))
                        : "Belum ada pemenang"}

                    <div className="mt-3 flex flex-col sm:flex-row gap-3 ">
                        <button
                            onClick={handlePublish}
                            className="w-full inline-block rounded border border-green-500 bg-green-500 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-green-500 focus:outline-none focus:ring active:text-green-400"
                        >
                            {isPublish ? "Unpublish" : "Publish Pengumuman"}
                        </button>

                        <button
                            onClick={handelSendEmail}
                            className="w-full inline-block rounded border border-green-500 px-12 py-3 text-sm font-medium text-green-500 hover:bg-green-500 hover:text-white focus:outline-none focus:ring active:bg-indigo-400 disabled:bg-gray-200"
                            disabled={isSentEmail}
                        >
                            {isSentEmail
                                ? "Email Sudah Dikirim"
                                : "Kirim Email"}
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
