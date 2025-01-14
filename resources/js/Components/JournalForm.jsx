import InputDate from "./InputDate";
import InputTime from "./InputTime";
import InputSelect from "./SelectInput";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";

export default function JournalForm({ number }) {
    const [formData, setFormData] = useState({
        open_date: new Date().toISOString().split("T")[0],
        close_date: new Date().toISOString().split("T")[0],
        open_time: "",
        close_time: "",
        triggerSO: "h1m30",
        tipeOrder: "buy",
        jmlLayer: 1,
        layers: {},
        note: "",
        tp: "",
        sl: "",
        averaging: "",
        totalProfitLoss: 0,
    });

    const defaultFormData = {
        open_date: new Date().toISOString().split("T")[0],
        close_date: new Date().toISOString().split("T")[0],
        open_time: "",
        close_time: "",
        triggerSO: "h1m30",
        tipeOrder: "buy",
        jmlLayer: 1,
        layers: {},
        note: "",
        tp: "",
        sl: "",
        averaging: "",
        totalProfitLoss: 0,
    };

    const tipeOptions = [
        { label: "Buy", value: "buy" },
        { label: "Sell", value: "sell" },
    ];
    const trigerOptions = [
        { label: "H1/M30", value: "h1m30" },
        { label: "H1/M15", value: "h1m15" },
        { label: "M30/M15", value: "m30m15" },
    ];
    const layerOptions = [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
    ];
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, // Menyimpan perubahan di formData
        }));
    };

    const calculateProfitLoss = () => {
        let totalProfitLoss = 0;

        for (let i = 1; i <= formData.jmlLayer; i++) {
            const layerValue = parseFloat(
                formData.layers[`layer-${i}`]?.value || 0
            );
            const closeValue = parseFloat(
                formData.layers[`layer-${i}`]?.close || 0
            );
            const lot = parseFloat(formData.layers[`layer-${i}`]?.lot || 0);

            if (layerValue && closeValue && lot && closeValue !== 0) {
                const profitLoss =
                    formData.tipeOrder === "buy"
                        ? (closeValue - layerValue) * (lot * 1000)
                        : (layerValue - closeValue) * (lot * 1000); // 1 lot = 100 unit
                totalProfitLoss += profitLoss;
            } else {
                console.log(
                    `Layer ${i} tidak dihitung karena close = 0 atau data tidak lengkap!`
                );
            }
        }

        return totalProfitLoss;
    };

    const formatProfitLoss = (totalProfitLoss) => {
        if (totalProfitLoss >= 0) {
            return `$${totalProfitLoss}`;
        } else {
            return `-$${Math.abs(totalProfitLoss)}`;
        }
    };

    useEffect(() => {
        const totalProfitLoss = calculateProfitLoss(); // Menghitung total profit/loss setiap kali formData berubah
        if (totalProfitLoss !== formData.totalProfitLoss) {
            setFormData((prevData) => ({
                ...prevData,
                totalProfitLoss, // Memperbarui totalProfitLoss di formData
            }));
        }
    }, [formData.layers, formData.jmlLayer, formData.tipeOrder]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (!/^[0-9]*\.?[0-9]*$/.test(value)) {
            return;
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value, // Memperbarui formData sesuai dengan nama input
        }));
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLayerChange = (index, type, value) => {
        if (!/^[0-9]*\.?[0-9]*$/.test(value)) {
            return;
        }

        setFormData((prevData) => ({
            ...prevData,
            layers: {
                ...prevData.layers,
                [`layer-${index}`]: {
                    ...prevData.layers[`layer-${index}`],
                    [type]: value,
                    order: index,
                },
            },
        }));
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        const newDate = new Date(value);
        setFormData((prevData) => ({
            ...prevData,
            [name]: newDate.toISOString().split("T")[0], // Menyimpan perubahan ke formData
        }));
    };

    const handleTimeChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, // Menyimpan perubahan ke formData
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const requiredFields = [
            "open_date",
            "close_date",
            "open_time",
            "close_time",
            "triggerSO",
            "tipeOrder",
            "tp",
            "sl",
        ];
        for (let field of requiredFields) {
            if (!formData[field]) {
                alert(`Field ${field} is required`);
                return;
            }
        }

        router.post("/journal", formData, {
            onSuccess: () => {
                setFormData(defaultFormData);
                Swal.fire({
                    title: "Success!",
                    text: "Data created successfully!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
            onError: (errors) => {
                console.log(formData);
                console.error("Terjadi kesalahan:", errors);
            },
        });
    };

    const renderLayerSection = () => {
        const layerSection = [];
        for (let i = 1; i <= formData.jmlLayer; i++) {
            layerSection.push(
                <div key={i}>
                    <label htmlFor={`layer-${i}`} className="block text-sm">
                        Entry Layer {i}
                    </label>
                    <input
                        type="text"
                        id={`layer-${i}`}
                        name={`layer-${i}`}
                        className="mt-1.5 w-full p-3 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                        value={formData.layers[`layer-${i}`]?.value || ""}
                        onChange={(e) =>
                            handleLayerChange(i, "value", e.target.value)
                        }
                        required
                    />
                </div>
            );
        }
        return layerSection;
    };

    const renderLotSection = () => {
        const lotSection = [];
        for (let i = 1; i <= formData.jmlLayer; i++) {
            lotSection.push(
                <div key={i}>
                    <label
                        htmlFor={`lot-layer-${i}`}
                        className="block text-sm mt-2"
                    >
                        Lot Layer {i}
                    </label>
                    <input
                        type="text"
                        id={`lot-layer-${i}`}
                        name={`lot-layer-${i}`}
                        className="mt-1.5 w-full p-3 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                        value={formData.layers[`layer-${i}`]?.lot || ""}
                        onChange={(e) =>
                            handleLayerChange(i, "lot", e.target.value)
                        }
                        required
                    />
                </div>
            );
        }
        return lotSection;
    };

    const renderCloseSection = () => {
        const closeSection = [];
        for (let i = 1; i <= formData.jmlLayer; i++) {
            closeSection.push(
                <div key={i}>
                    <label
                        htmlFor={`close-layer-${i}`}
                        className="block text-sm mt-2"
                    >
                        Close Layer {i}
                    </label>
                    <input
                        type="text"
                        id={`close-layer-${i}`}
                        name={`close-layer-${i}`}
                        className="mt-1.5 w-full p-3 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                        value={formData.layers[`layer-${i}`]?.close || ""}
                        onChange={(e) =>
                            handleLayerChange(i, "close", e.target.value)
                        }
                        required
                    />
                </div>
            );
        }
        return closeSection;
    };
    return (
        <div className="rounded-lg bg-white p-8 border mt-6 lg:col-span-3 lg:p-12">
            <h2 className="font-bold text-xl sm:text-2xl mb-3">
                Jurnal {number}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <InputDate
                            name="open_date"
                            id="open_date"
                            label="Tanggal Open Posisi"
                            value={formData["open_date"] || ""}
                            onChange={handleDateChange}
                        />
                        <InputTime
                            name="open_time"
                            id="open_time"
                            label="Waktu Open Posisi"
                            value={formData["open_time"] || ""}
                            onChange={handleTimeChange}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <InputDate
                            name="close_date"
                            id="close_date"
                            label="Tanggal Close Posisi"
                            value={formData["close_date"] || ""}
                            onChange={handleDateChange}
                        />
                        <InputTime
                            name="close_time"
                            id="close_time"
                            label="Waktu Close Posisi"
                            value={formData["close_time"] || ""}
                            onChange={handleTimeChange}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                    <InputSelect
                        id="tipeOrder"
                        name="tipeOrder"
                        label="Tipe Order"
                        options={tipeOptions}
                        value={formData.tipeOrder}
                        onChange={handleSelectChange}
                    />
                    <InputSelect
                        id="triggerSO"
                        name="triggerSO"
                        label="Trigger SO"
                        options={trigerOptions}
                        value={formData.triggerSO}
                        onChange={handleSelectChange}
                    />
                    <div className="">
                        <label className="block text-sm" htmlFor="averaging">
                            Averaging
                        </label>
                        <input
                            className="mt-1.5 w-full rounded-lg border-gray-300 p-3 text-sm"
                            name="averaging"
                            type="text"
                            id="averaging"
                            required
                            value={formData.averaging}
                            onChange={handleInputChange}
                        />
                    </div>
                    <InputSelect
                        id="jmlLayer"
                        name="jmlLayer"
                        label="Jumlah Layer"
                        options={layerOptions}
                        value={formData.jmlLayer}
                        onChange={handleSelectChange}
                    />
                </div>

                <span className="flex items-center">
                    <span className="font-bold pr-6">Entry</span>
                    <span className="h-px flex-1 bg-gray-300"></span>
                </span>
                <div
                    className={`grid grid-cols-1 gap-4 sm:grid-cols-${formData.jmlLayer}`}
                >
                    {renderLayerSection()}
                </div>
                <span className="flex items-center">
                    <span className="font-bold pr-6">Lot</span>
                    <span className="h-px flex-1 bg-gray-300"></span>
                </span>
                <div
                    className={`grid grid-cols-1 gap-4 sm:grid-cols-${formData.jmlLayer}`}
                >
                    {renderLotSection()}
                </div>
                <span className="flex items-center">
                    <span className="font-bold pr-6">TP dan SL</span>
                    <span className="h-px flex-1 bg-gray-300"></span>
                </span>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="text-sm" htmlFor="tp">
                            TP
                        </label>
                        <input
                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                            type="text"
                            id="tp"
                            name="tp"
                            required
                            value={formData.tp}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label className="text-sm" htmlFor="sl">
                            SL
                        </label>
                        <input
                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                            name="sl"
                            type="text"
                            id="sl"
                            required
                            value={formData.sl}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <span className="flex items-center">
                    <span className="font-bold pr-6">Close</span>
                    <span className="h-px flex-1 bg-gray-300"></span>
                </span>
                <div
                    className={`grid grid-cols-1 gap-4 sm:grid-cols-${formData.jmlLayer}`}
                >
                    {renderCloseSection()}
                </div>

                <div>
                    <label className="sr-only" htmlFor="note">
                        Catatan Peserta
                    </label>

                    <textarea
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Catatan dari peserta"
                        rows="8"
                        id="note"
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                    <dl className="-my-3 divide-y divide-gray-100 text-sm">
                        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">
                                Total Profit/Loss
                            </dt>
                            <dd className="font-bold text-gray-700 sm:col-span-2">
                                {formatProfitLoss(formData.totalProfitLoss)}
                            </dd>
                        </div>
                    </dl>
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                    >
                        Simpan Jurnal
                    </button>
                </div>
            </form>
        </div>
    );
}
