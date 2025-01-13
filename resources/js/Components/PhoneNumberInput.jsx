import React, { useState } from "react";

const PhoneNumberInput = ({ value, onChange, name, className, required }) => {
    const handlePhoneNumberChange = (e) => {
        let value = e.target.value;
        value = value.replace(/[^\d]/g, "");
        if (value && !value.startsWith("62")) {
            value = "62" + value; // Tambahkan "62" di depan
        }

        onChange({ target: { name, value: "+62" + value.slice(2) } });
    };

    return (
        <input
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={handlePhoneNumberChange}
            className={
                "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 " +
                className
            }
            placeholder="+62 xxxxxxxxxx"
            maxLength={14}
            required={required}
        />
    );
};

export default PhoneNumberInput;
