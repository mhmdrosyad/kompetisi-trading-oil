import { Link } from "@inertiajs/react";
import StepHome from "./StepHome";
import Winners from "./Winners";

export default function Alur() {
    return (
        <section className="py-12">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-3">
                    <div className="flex flex-col gap-3">
                        <h2 className="text-2xl font-bold text-gray-900 sm:text-4xl">
                            Siapa yang menang?
                        </h2>
                        <div className="my-6">
                            <div className="flex items-start gap-4">
                                <div className="block bg-yellow-300 rounded-full p-2 text-white shrink-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        class="w-6 h-6"
                                    >
                                        <path d="M21 3h-4V2H7v1H3a1 1 0 0 0-1 1v3a5.002 5.002 0 0 0 4 4.9A6.973 6.973 0 0 0 11 14.93V20H8v2h8v-2h-3v-5.07A6.973 6.973 0 0 0 18 11.9 5.002 5.002 0 0 0 22 7V4a1 1 0 0 0-1-1ZM4 7V4h2v5a3 3 0 0 1-2-2Zm16 0a3 3 0 0 1-2 2V4h2Z" />
                                    </svg>
                                </div>

                                <div>
                                    <h3 className="sm:text-2xl">
                                        Peserta dengan profit paling tinggi di
                                        akhir kompetisi.
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <h2 className="mt-4 text-2xl font-bold text-gray-900 sm:text-4xl">
                            Cara Bergabung
                        </h2>
                        <p className="mt-4 text-gray-700">
                            Berikut alur cara mengikuti kompetisi demo trading
                            oil.
                        </p>
                        <StepHome />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 sm:text-4xl">
                            Raih hadiah jutaan rupiah!
                        </h2>
                        <img
                            src="/images/hadiah.png"
                            className="rounded"
                            alt=""
                        />
                        <div className="mt-1">
                            <Winners />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
