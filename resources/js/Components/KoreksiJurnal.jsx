import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function KoreksiJurnal({ journal, index }) {
    const { data, setData, post, processing, errors } = useForm({
        is_valid:
            journal.journal_corrections.length > 0
                ? Boolean(journal.journal_corrections[0].is_valid)
                : true,
        correction_notes:
            journal.journal_corrections.length > 0 &&
            journal.journal_corrections[0].correction_notes != null
                ? journal.journal_corrections[0].correction_notes
                : "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        // Jika ada koreksi jurnal, update nilai data form sesuai dengan nilai koreksi
        if (journal.journal_corrections.length > 0) {
            setData({
                is_valid: Boolean(journal.journal_corrections[0].is_valid),
                correction_notes:
                    journal.journal_corrections[0].correction_notes != null
                        ? journal.journal_corrections[0].correction_notes
                        : "",
            });
            setIsSubmitted(true);
        }
    }, [journal.journal_corrections, setData]);

    const handleDeliveryChange = (e) => {
        const value = e.target.value === "DeliveryStandard" ? true : false;
        setData("is_valid", value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("journal.correction.storeOrUpdate", journal.id), {
            ...data,
        });

        setIsSubmitted(true);
    };

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
                    <h2 className="text-lg flex gap-3 sm:text-xl font-bold">
                        <span>Jurnal {index + 1}</span>
                        {isSubmitted && // Cek jika koreksi sudah disubmit
                            (data.is_valid ? (
                                <span className="bg-green-50 py-1 px-3 rounded-full text-green-500 flex items-center gap-1">
                                    <CheckIcon className="size-4" />
                                    <span className="text-sm">Sesuai</span>
                                </span>
                            ) : (
                                <span className="bg-red-50 py-1 px-3 rounded-full text-red-500 flex items-center gap-1">
                                    <XMarkIcon className="size-4" />
                                    <span className="text-sm">
                                        Tidak Sesuai
                                    </span>
                                </span>
                            ))}
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

                <span className="flex mt-4 items-center">
                    <span className="pr-6">Koreksi Jurnal</span>
                    <span className="h-px flex-1 bg-gray-300"></span>
                </span>
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="mt-4">
                        <fieldset className="grid sm:grid-cols-2 gap-4">
                            <legend className="sr-only">Delivery</legend>

                            <div>
                                <label
                                    htmlFor="DeliveryStandard"
                                    className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-green-500 has-[:checked]:ring-1 has-[:checked]:ring-green-500"
                                >
                                    <div>
                                        <p className="text-gray-700">Sesuai</p>
                                    </div>
                                    <input
                                        type="radio"
                                        name="DeliveryOption"
                                        value="DeliveryStandard"
                                        id="DeliveryStandard"
                                        className="size-5 border-gray-300 text-green-500 focus:ring-green-500 active:ring-green-500"
                                        checked={data.is_valid === true}
                                        onChange={handleDeliveryChange}
                                    />
                                </label>
                            </div>

                            <div>
                                <label
                                    htmlFor="DeliveryPriority"
                                    className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-red-500 has-[:checked]:ring-1 has-[:checked]:ring-red-500"
                                >
                                    <div>
                                        <p className="text-gray-700">
                                            Tidak Sesuai
                                        </p>
                                    </div>
                                    <input
                                        type="radio"
                                        name="DeliveryOption"
                                        value="DeliveryPriority"
                                        id="DeliveryPriority"
                                        className="size-5 border-gray-300 text-red-500 focus:ring-red-500"
                                        checked={data.is_valid === false}
                                        onChange={handleDeliveryChange}
                                    />
                                </label>
                            </div>
                        </fieldset>

                        <div className="mt-3">
                            <label className="text-sm">Catatan Koreksi</label>
                            <textarea
                                className="w-full focus:border-green-500 focus:ring-green-500 bg-gray-50 rounded-lg border-gray-200 p-3 text-sm"
                                value={data.correction_notes}
                                onChange={(e) =>
                                    setData("correction_notes", e.target.value)
                                }
                            />
                            {errors.correction_notes && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.correction_notes}
                                </div>
                            )}
                        </div>

                        <div className="mt-4">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-500 text-sm hover:bg-green-400 text-white rounded-lg"
                                disabled={processing}
                            >
                                {processing ? "Mengirim..." : "Kirim Koreksi"}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="mt-4 text-gray-700">
                        <p>
                            Koreksi telah dikirim. Tekan "Edit Koreksi" untuk
                            mengubahnya.
                        </p>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="text-sm hover:bg-green-400 mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
                        >
                            Edit Koreksi
                        </button>
                    </div>
                )}
            </details>
        </div>
    );
}
