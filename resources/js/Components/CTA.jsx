import { Link } from "@inertiajs/react";

export default function CTA() {
    return (
        <section className="relative bg-gray-100 rounded-lg max-w-screen-xl mx-auto py-4 px-4 md:px-8">
            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-40"></div>
            <div className="relative z-10 gap-5 items-center lg:flex">
                <div className="flex-1 max-w-lg py-5 sm:mx-auto sm:text-center lg:max-w-max lg:text-left">
                    <h3 className="text-3xl text-gray-800 font-semibold md:text-4xl">
                        Daftar sekarang{" "}
                        <span className="text-green-500">
                            kompetisi demo trading oil
                        </span>
                    </h3>
                    <p className="text-gray-500 leading-relaxed mt-3">
                        Uji kemampuan trading kamu di platform demo tanpa risiko
                        modal!
                    </p>
                    <Link
                        className="mt-5 px-4 py-2 text-green-500 font-medium bg-green-100 rounded-full inline-flex items-center"
                        href={route("register")}
                    >
                        Daftar Sekarang
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 ml-1 duration-150"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </Link>
                </div>
                <div className="bottom-0 flex-1 -mb-6 mx-auto sm:w-9/12 lg:mt-0 lg:w-auto">
                    <img src="/images/gf2.png" alt="" className="w-full" />
                </div>
            </div>
        </section>
    );
}
