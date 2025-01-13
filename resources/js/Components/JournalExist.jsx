import React from "react";
export default function JournalExist({ journal, index }) {
    const formatProfitLoss = (totalProfitLoss) => {
        if (totalProfitLoss >= 0) {
            return `$${totalProfitLoss}`;
        } else {
            return `-$${Math.abs(totalProfitLoss)}`;
        }
    };

    const mappingTrigger = {
        h1m30: "H1/M30",
        h1m15: "H1/M15",
        m30m15: "M30/M15",
    };

    const formatNumber = (value) => {
        return parseFloat(value).toString();
    };
    return (
        <div
            key={index}
            className="mt-4 divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white"
        >
            <details className="group p-8 lg:p-12 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                    <h2 className="text-lg sm:text-xl font-bold">
                        Jurnal {index + 1}
                    </h2>

                    <span className="relative size-5 shrink-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </span>
                </summary>

                <div className="mt-4 grid grid-cols-1 gap-4 leading-relaxed text-gray-700">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div>
                                <label className="text-sm">
                                    Tanggal Open Posisi
                                </label>
                                <input
                                    className="w-full bg-gray-50 rounded-lg border-gray-200 p-3 text-sm"
                                    value={journal.open_date}
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="text-sm">
                                    {" "}
                                    Waktu Open Posisi
                                </label>
                                <input
                                    className="w-full bg-gray-50 rounded-lg border-gray-200 p-3 text-sm"
                                    value={journal.open_time}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div>
                                <label className="text-sm">
                                    Tanggal Open Posisi
                                </label>
                                <input
                                    className="w-full bg-gray-50 rounded-lg border-gray-200 p-3 text-sm"
                                    value={journal.close_date}
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="text-sm">
                                    {" "}
                                    Waktu Open Posisi
                                </label>
                                <input
                                    className="w-full bg-gray-50 rounded-lg border-gray-200 p-3 text-sm"
                                    value={journal.close_time}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                        <div>
                            <label className="text-sm">Tipe Order</label>
                            <input
                                className="w-full bg-gray-50 rounded-lg border-gray-200 p-3 text-sm"
                                value={
                                    journal.tipe_order == "buy" ? "Buy" : "Sell"
                                }
                                disabled
                            />
                        </div>
                        <div>
                            <label className="text-sm">Trigger SO</label>
                            <input
                                className="w-full bg-gray-50 rounded-lg border-gray-200 p-3 text-sm"
                                value={
                                    mappingTrigger[journal.trigger_so] ||
                                    journal.trigger_so
                                }
                                disabled
                            />
                        </div>
                        <div>
                            <label className="text-sm">Averaging</label>
                            <input
                                className="w-full bg-gray-50 rounded-lg border-gray-200 p-3 text-sm"
                                value={formatNumber(journal.averaging)}
                                disabled
                            />
                        </div>
                        <div>
                            <label className="text-sm">Jumlah Layer</label>
                            <input
                                className="w-full bg-gray-50 rounded-lg border-gray-200 p-3 text-sm"
                                value={journal.jml_layer}
                                disabled
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="text-sm">TP</label>
                            <input
                                className="w-full bg-gray-50 rounded-lg border-gray-200 p-3 text-sm"
                                value={formatNumber(journal.tp)}
                                disabled
                            />
                        </div>
                        <div>
                            <label className="text-sm">SL</label>
                            <input
                                className="w-full bg-gray-50 rounded-lg border-gray-200 p-3 text-sm"
                                value={formatNumber(journal.sl)}
                                disabled
                            />
                        </div>
                    </div>
                    <div
                        className={`grid grid-cols-1 gap-4 sm:grid-cols-${journal.layers.length}`}
                    >
                        {journal.layers.map((layer, index) => (
                            <div key={index}>
                                <label className="text-sm">
                                    Entry Layer {index + 1}
                                </label>
                                <input
                                    className="w-full bg-gray-50 rounded-lg border-gray-200 p-3 text-sm"
                                    value={formatNumber(layer.value)}
                                    disabled
                                />
                            </div>
                        ))}
                    </div>
                    <div
                        className={`grid grid-cols-1 gap-4 sm:grid-cols-${journal.layers.length}`}
                    >
                        {journal.layers.map((layer, index) => (
                            <div key={index}>
                                <label className="text-sm">
                                    Lot Layer {index + 1}
                                </label>
                                <input
                                    className="w-full bg-gray-50 rounded-lg border-gray-200 p-3 text-sm"
                                    value={formatNumber(layer.lot)}
                                    disabled
                                />
                            </div>
                        ))}
                    </div>
                    <div
                        className={`grid grid-cols-1 gap-4 sm:grid-cols-${journal.layers.length}`}
                    >
                        {journal.layers.map((layer, index) => (
                            <div key={index}>
                                <label className="text-sm">
                                    Close Layer {index + 1}
                                </label>
                                <input
                                    className="w-full bg-gray-50 rounded-lg border-gray-200 p-3 text-sm"
                                    value={formatNumber(layer.close)}
                                    disabled
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                        <dl className="-my-3 divide-y divide-gray-100 text-sm">
                            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-medium text-gray-900">
                                    Total Profit/Loss
                                </dt>
                                <dd className="font-bold text-gray-700 sm:col-span-2">
                                    {formatProfitLoss(
                                        formatNumber(journal.profit_loss)
                                    )}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </details>
        </div>
    );
}
