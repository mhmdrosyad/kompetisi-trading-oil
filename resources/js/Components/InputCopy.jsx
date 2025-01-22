"use client";
import { Clipboard } from "flowbite-react";

export function InputCopy({ label, value }) {
    if (!value) {
        console.warn("Value to copy is empty");
    }
    console.log("Value to copy:", value);

    return (
        <div className="grid w-full max-w-80">
            <div className="relative">
                <label htmlFor={label} className="sr-only">
                    Label
                </label>
                <input
                    id={label}
                    type="text"
                    className="col-span-6 block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-4 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    value={value}
                    readOnly
                />
                <Clipboard.WithIconText valueToCopy={value} />
            </div>
        </div>
    );
}
