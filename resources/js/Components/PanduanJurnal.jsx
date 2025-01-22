export default function PanduanJurnal() {
    return (
        <div className="w-full">
            <div className="flex justify-between p-4 rounded-md bg-yellow-50 border border-yellow-300">
                <div className="flex gap-3">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-yellow-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <div className="self-center">
                        <span className="text-yellow-600 font-medium">
                            Panduan Isi Jurnal
                        </span>
                        <div className="text-yellow-600">
                            <ul className="list-disc mt-3">
                                <li>
                                    Rekomendasi browser: Google Chrome Versi
                                    Terbaru
                                </li>
                                <li>
                                    Pengisian waktu open dan close posisi: klik
                                    logo jam, jika tidak bisa isi/ketik manual
                                    sesuai format.
                                </li>
                                <li>
                                    Pengisian input desimal (Entry, Lot, Close,
                                    TP, SL): Menggunakan titik (.) contoh: 71.5,
                                    0.1, dsb.
                                </li>
                                <li>
                                    Jika Anda menggunakan lebih dari 1 layer,
                                    dan sebelum layer berikutnya ter-entry sudah
                                    TP maka close posisi untuk layer yang tidak
                                    ter-entry silahkan isi dengan angka 0.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
