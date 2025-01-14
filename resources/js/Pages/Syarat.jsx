import GuestLayout from "@/Layouts/GuestLayout";

export default function Syarat() {
    return (
        <GuestLayout>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <article className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6">
                    {/* <span className="inline-block rounded bg-blue-600 p-2 text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                            />
                        </svg>
                    </span> */}

                    <h3 className="mt-0.5 text-lg font-bold text-xl text-gray-900">
                        🏆 RULES KOMPETISI DEMO TRADING OIL 🛢
                    </h3>

                    <p className="mt-4 line-clamp-3 text-gray-500">
                        Persyaratan Peserta:
                    </p>
                    <ol className="pl-5 list-decimal text-gray-500">
                        <li>
                            Membuat akun demo di broker IndoSukses Futures (type
                            Forex-ISF) dengan saldo $5,000.
                        </li>
                        <li>
                            Akun demo harus dibuat melalui aplikasi Metatrader 4
                            (tutorial tersedia).
                        </li>
                        <li>
                            {" "}
                            Investor Password yang telah didaftarkan tidak boleh
                            diganti. Jika ditemukan perubahan, peserta akan
                            langsung didiskualifikasi.
                        </li>
                    </ol>

                    <p className="mt-4 line-clamp-3 text-gray-500">
                        Aturan Kompetisi:
                    </p>
                    <ol className="pl-5 list-decimal text-gray-500">
                        <li>
                            Modal Awal: Saldo awal hanya diperbolehkan $5,000
                        </li>
                        <li>
                            Pair Trading: Transaksi hanya boleh dilakukan pada
                            pair Oil (CLR.isf).
                        </li>
                        <li>
                            Strategi Trading: Bebas menggunakan strategi apa
                            pun, kecuali penggunaan Expert Advisor (EA).
                        </li>
                        <li>
                            Posisi Akhir: Semua posisi wajib ditutup (tidak
                            boleh ada posisi floating) pada saat kompetisi
                            berakhir. Hasil akhir wajib disertai dengan
                            screenshot portofolio sebagai bukti laporan.
                        </li>
                        <li>
                            Open Posisi: Tidak ada batasan maksimum jumlah open
                            posisi per hari atau ukuran lot.
                        </li>
                        <li>
                            Jurnal Trading: Jurnal wajib diisi setiap kali
                            posisi ditutup atau per momentum trading, sesuai
                            dengan tutorial yang telah diberikan. Data yang
                            dicatat dalam jurnal harus mencakup waktu entry,
                            waktu exit, lot, pair, dan hasil (profit/loss).{" "}
                            <strong>
                                Hati-hati! Data yang sudah disimpan di jurnal
                                tidak bisa diedit atau dihapus.
                            </strong>
                        </li>
                        <li>
                            Manipulasi Data: Dilarang membuat dua akun untuk
                            kompetisi. Dilarang memanipulasi hasil trading,
                            screenshot, atau data laporan. Peserta yang terbukti
                            melakukan manipulasi akan langsung didiskualifikasi
                            tanpa toleransi.
                        </li>
                    </ol>

                    <p className="mt-4 line-clamp-3 text-gray-500">
                        Kriteria Pemenang:
                    </p>
                    <ol className="pl-5 list-decimal text-gray-500">
                        <li>
                            Peserta dengan profit terbesar pada platform MT4 di
                            akhir kompetisi.
                        </li>
                        <li>
                            Hasil trading akan diverifikasi berdasarkan data
                            portofolio, jurnal trading, dan screenshot yang
                            dikirimkan.
                        </li>
                    </ol>

                    <p className="my-2 text-gray-500">
                        💡Tips: Ikuti panduan yang telah diberikan, isi jurnal
                        dengan benar, dan kirimkan screenshot tepat waktu untuk
                        menghindari diskualifikasi. 🔥 Jadikan kompetisi ini
                        sebagai kesempatan untuk mengasah skill trading Anda.
                        Tetap semangat, adil, dan tunjukkan performa
                        terbaik Anda! 💪
                    </p>

                    <div className="my-6 px-4 rounded-md bg-amber-50 md:px-8">
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
                                        Catatan Penting
                                    </span>
                                    <p className="text-amber-600 mt-1">
                                        Panitia berhak mendiskualifikasi peserta
                                        jika ditemukan pelanggaran terhadap
                                        aturan kompetisi. Keputusan panitia
                                        bersifat final dan tidak dapat diganggu
                                        gugat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </GuestLayout>
    );
}
