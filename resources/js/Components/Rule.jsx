export const Rule = () => {

    const tableItems = [
        {
            name: "Open Posisi (OP/entry) hanya di pair Oil (CLR.isf)",
            status: "Diskualifikasi",
        },
        {
            name: "Bebas menggunakan Strategi apapun",
            status: "-",
        },
        {
            name: "Tidak ada batasan maksimum Open Posisi setiap hari",
            status: "-",
        },
        {
            name: "Tidak ada batasan maksimum Lot",
            status: "-",
        },
        {
            name: "Tidak boleh menggunakan EA",
            status: "Diskualifikasi",
        },
        {
            name: "Wajib Clear Posisi pada saat kompetisi berakhir (tidak ada posisi floating)",
            status: "Diskualifikasi",
        },
    ]


    return (
        <div>
            <div className="mt-4 relative h-max overflow-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3">No</th>
                            <th className="py-3 pr-6">Aturan</th>
                            <th className="py-3 pr-6">Sanksi Pelanggaran</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            tableItems.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="pr-6 py-4 whitespace-nowrap">{idx+1}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">{item.name}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-2 rounded-full font-semibold text-xs ${item.status == "Diskualifikasi" ? "text-red-600 bg-red-50" : ""}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}