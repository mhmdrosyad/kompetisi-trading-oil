import WinnerCardUser from "@/Components/WinnerCardUser";
import Winners from "@/Components/Winners";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

export default function Index({ auth }) {
    const { users, isPublish } = usePage().props;
    const isWinner = auth.user.custom_rank <= 10 ? true : false;
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
            {isPublish && isPublish.value == true ? (
                <div className="mt-8 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-8 bg-white rounded-lg">
                        <div>
                            <h2 className="mb-6 font-bold text-xl sm:text-3xl text-center">
                                Daftar Pemenang Kompetisi
                            </h2>

                            {users
                                ? users.map((user, index) => (
                                      <WinnerCardUser
                                          key={index}
                                          user={user}
                                          index={index}
                                          userId={auth.user.id}
                                      />
                                  ))
                                : "Belum ada pemenang"}
                        </div>
                    </div>
                    <div className="p-8 bg-white rounded-lg">
                        <h2 className="text-xl  font-bold text-gray-900 sm:text-3xl text-center">
                            Hadiah & Klaim
                        </h2>
                        <img
                            src="/images/hadiah.png"
                            className="rounded"
                            alt=""
                        />
                        <div className="mt-1">
                            <Winners />
                        </div>
                        {isWinner ? (
                            <a
                                className="w-full justify-center inline-flex items-center gap-2 rounded border border-green-500 px-8 py-3 text-green-500 hover:bg-green-500 hover:text-white focus:outline-none focus:ring active:bg-green-400"
                                href="https://wa.me/6282299942080"
                                target="_blank"
                            >
                                <span className="text-sm font-medium">
                                    {" "}
                                    Klaim Hadiah Sekarang
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
                        ) : null}
                    </div>
                </div>
            ) : (
                <div className="bg-white max-w-6xl rounded-lg mx-auto mt-12 p-3 sm:p-6 md:p-8 shadow">
                    <h2 className="text-xl md:text-3xl font-bold text-center mb-3">
                        Pengumuman Pemenang Akan Tampil Disini
                    </h2>
                    <p>
                        Pengumuman pemenang akan tampil disini setelah kompetisi
                        dan proses penilaian dari juri selesai. Untuk pemenang
                        kami akan mengirimkan pengumuman di email dan di
                        dashboard, pastikan selalu cek email dan dashboard Anda.
                    </p>
                    <img src="/images/hadiah.png" />
                </div>
            )}
        </AuthenticatedLayout>
    );
}
