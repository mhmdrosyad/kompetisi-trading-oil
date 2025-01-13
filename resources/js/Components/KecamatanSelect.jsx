import React from "react";
import Select from "react-select";

const KecamatanSelect = ({ districts, selectedDistrict, onChange }) => {
    const districtOptions = districts.map((district) => ({
        value: district.id,
        label: district.name,
    }));

    return (
        <div className="mb-4">
            <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-700"
            >
                Pilih Kecamatan
            </label>
            <Select
                id="district"
                className="mt-1"
                options={districtOptions}
                value={districtOptions.find(
                    (option) => option.value === selectedDistrict
                )}
                onChange={(selectedOption) => onChange(selectedOption.value)}
                placeholder="Pilih Kecamatan"
            />
        </div>
    );
};

export default KecamatanSelect;
