import GuestLayout from "@/Layouts/GuestLayout";

export default function PemenangPage() {
    const tableItems = [
        {
            name: "1",
            date: "Namamu",
            status: "1000%",
        },
        {
            name: "2",
            date: "Namamu",
            status: "900%",
        },
        {
            name: "3",
            date: "Namamu",
            status: "875%",
        },
    ];
    return (
        <GuestLayout>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <h2 className="text-center text-xl md:text-3xl my-6 font-bold">
                    Daftar Pemenang
                </h2>
                <p className="mb-3 text-center">
                    Daftar pemenang akan muncul disini ketika kompetisi selesai.
                </p>

                <div className="my-3">
                    <div className="mt-12 relative h-max overflow-auto">
                        <table className="w-full table-auto text-sm text-left">
                            <thead className="text-gray-600 font-medium border-b">
                                <tr>
                                    <th className="py-3 pr-6">Peringkat</th>
                                    <th className="py-3 pr-6">Nama</th>
                                    <th className="py-3 pr-6">Total Profit</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 divide-y">
                                {tableItems.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="py-4 whitespace-nowrap">
                                            {item.name}
                                        </td>
                                        <td className="pr-6 py-4 whitespace-nowrap">
                                            {item.date}
                                        </td>
                                        <td className="pr-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-3 py-2 rounded-full font-semibold text-xs ${
                                                    item.status == "Active"
                                                        ? "text-green-600 bg-green-50"
                                                        : "text-blue-600 bg-blue-50"
                                                }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
