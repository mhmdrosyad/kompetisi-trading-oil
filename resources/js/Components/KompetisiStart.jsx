import CountdownHome from "./CountdownHome";

export default function KompetisiStart() {
    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-screen-xl mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8">
                <div className="w-full grid gap-5 grid-cols-1 sm:grid-cols-4">
                    <div className="flex flex-row justify-between p-8 border-b sm:flex-col items-center sm:justify-center text-center sm:border-b-0 sm:border-r">
                        <h3 className="font-semibold">Durasi</h3>
                        <span className="text-3xl font-bold">1 bulan</span>
                    </div>
                    <div className="flex sm:col-span-2 flex-row justify-between sm:justify-center p-8 border-b sm:flex-col items-center text-center sm:border-b-0 sm:border-r">
                        <h3 className="hidden sm:flex font-semibold mb-1">
                            Kompetisi akan dimulai pada
                        </h3>
                        <CountdownHome targetDate="2025-02-01T00:00:00Z" />
                    </div>
                    <div className="flex flex-row justify-between sm:justify-center p-8 sm:flex-col items-center text-center">
                        <h3 className="font-semibold">Platform</h3>
                        <span className="text-3xl font-bold">MT4</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
