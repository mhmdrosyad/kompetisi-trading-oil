import React from "react";
import Select from "react-select";

const ProvinsiSelect = ({ provinces, selectedProvince, onChange }) => {
    const provinceOptions = provinces.map((province) => ({
        value: province.id,
        label: province.name,
    }));

    return (
        <div className="mb-4">
            <label
                htmlFor="province"
                className="block text-sm font-medium text-gray-700"
            >
                Pilih Provinsi
            </label>
            <Select
                id="province"
                className="mt-1"
                options={provinceOptions}
                value={provinceOptions.find(
                    (option) => option.value === selectedProvince
                )}
                onChange={(selectedOption) => onChange(selectedOption.value)}
                placeholder="Pilih Provinsi"
            />
        </div>
    );
};

export default ProvinsiSelect;
