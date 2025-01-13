"use client";

import { Datepicker } from "flowbite-react";

export default function InputDate({ name, id, label, onChange }) {
    const handleDateChange = (date) => {
        onChange({
            target: {
                name,
                value: date, // date adalah objek tanggal yang dipilih
            },
        });
    };
    const customTheme = {
        root: {
            base: "w-full relative",
            input: {
                field: {
                    base: "w-full rounded-lg focus:ring-blue-500 focus:border-blue-500",
                    input: {
                        base: "border w-full border-gray-200  bg-white text-gray-900 placeholder-gray-400",
                        sizes: {
                            sm: "text-sm px-2 py-1",
                            md: "text-sm px-3 py-3",
                            lg: "text-lg px-4 py-3",
                        },
                        colors: {
                            gray: "border-gray-200",
                            info: "border-blue-300 focus:ring-blue-500 focus:border-blue-500",
                            failure:
                                "border-red-300 focus:ring-red-500 focus:border-red-500",
                            warning:
                                "border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500",
                            success:
                                "border-green-300 focus:ring-green-500 focus:border-green-500",
                        },
                        withShadow: false,
                    },
                },
            },
        },
        popup: {
            footer: {
                button: {
                    today: "bg-black text-white hover:opacity-60",
                    clear: "bg-red-700 text-white hover:opacity-60",
                },
            },
        },
    };

    return (
        <div className="flex flex-col flex-1 gap-2">
            {label && (
                <label htmlFor={id} className="text-sm">
                    {label}
                </label>
            )}
            <Datepicker
                id={id}
                name={name}
                language="id-ID"
                labelTodayButton="Hari ini"
                labelClearButton="Hapus"
                theme={customTheme}
                onChange={handleDateChange}
            />
        </div>
    );
}
