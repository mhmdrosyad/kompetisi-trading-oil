import React from "react";
import Select from "react-select";

const KabupatenSelect = ({ regencies, selectedRegency, onChange }) => {
    const regencyOptions = regencies.map((regency) => ({
        value: regency.id,
        label: regency.name,
    }));

    return (
        <div className="mb-4">
            <label
                htmlFor="regency"
                className="block text-sm font-medium text-gray-700"
            >
                Pilih Kabupaten/Kota
            </label>
            <Select
                id="regency"
                className="mt-1"
                options={regencyOptions}
                value={regencyOptions.find(
                    (option) => option.value === selectedRegency
                )}
                onChange={(selectedOption) => onChange(selectedOption.value)}
                placeholder="Pilih Kabupaten/Kota"
            />
        </div>
    );
};

export default KabupatenSelect;
