import { useState } from "react";

const InputSelect = ({ id, name, label, options, value, onChange }) => {
    return (
        <div>
            {label && (
                <label htmlFor={id} className="block text-sm">
                    {label}
                </label>
            )}
            <select
                name={name}
                id={id}
                className="mt-1.5 w-full p-3 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                value={value}
                onChange={onChange} // Menangani perubahan
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default InputSelect;
