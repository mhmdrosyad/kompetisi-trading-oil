import React from "react";
import Select from "react-select";
import InputLabel from "./InputLabel";

const DesaSelect = ({ villages, selectedVillage, onChange }) => {
    const villageOptions = villages.map((village) => ({
        value: village.id,
        label: village.name,
    }));

    return (
        <div className="mb-4">
            <InputLabel
                htmlFor="village"
                className="block text-sm font-medium text-gray-700"
            >
                Pilih Desa
            </InputLabel>
            <Select
                id="village"
                className="mt-1"
                options={villageOptions}
                value={villageOptions.find(
                    (option) => option.value === selectedVillage
                )}
                onChange={(selectedOption) => onChange(selectedOption.value)}
                placeholder="Pilih Desa"
            />
        </div>
    );
};

export default DesaSelect;
