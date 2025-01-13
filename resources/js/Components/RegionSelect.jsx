import React, { useState, useEffect } from "react";
import ProvinsiSelect from "./ProvinceSelect";
import KabupatenSelect from "./KabupatenSelect";
import KecamatanSelect from "./KecamatanSelect";
import DesaSelect from "./DesaSelect";

const RegionSelect = ({ setData }) => {
    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedRegency, setSelectedRegency] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedVillage, setSelectedVillage] = useState("");

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await fetch(
                    `https://mhmdrosyad.github.io/api-wilayah-indonesia/api/provinces.json`
                );
                const data = await response.json();
                setProvinces(data);
            } catch (error) {
                console.error("Failed to fetch provinces:", error);
            }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            const fetchRegencies = async () => {
                try {
                    const response = await fetch(
                        `https://mhmdrosyad.github.io/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`
                    );
                    const data = await response.json();
                    setRegencies(data);
                } catch (error) {
                    console.error("Failed to fetch regencies:", error);
                }
            };
            fetchRegencies();
        } else {
            setRegencies([]); // Clear regencies if province is not selected
        }
    }, [selectedProvince]); // Only runs when selectedProvince changes

    // Fetch districts based on selected regency
    useEffect(() => {
        if (selectedRegency) {
            const fetchDistricts = async () => {
                try {
                    const response = await fetch(
                        `https://mhmdrosyad.github.io/api-wilayah-indonesia/api/districts/${selectedRegency}.json`
                    );
                    const data = await response.json();
                    setDistricts(data);
                } catch (error) {
                    console.error("Failed to fetch districts:", error);
                }
            };
            fetchDistricts();
        } else {
            setDistricts([]); // Clear districts if regency is not selected
        }
    }, [selectedRegency]); // Only runs when selectedRegency changes

    // Fetch villages based on selected district
    useEffect(() => {
        if (selectedDistrict) {
            const fetchVillages = async () => {
                try {
                    const response = await fetch(
                        `https://mhmdrosyad.github.io/api-wilayah-indonesia/api/villages/${selectedDistrict}.json`
                    );
                    const data = await response.json();
                    setVillages(data);
                } catch (error) {
                    console.error("Failed to fetch villages:", error);
                }
            };
            fetchVillages();
        }
    }, [selectedDistrict]);

    useEffect(() => {
        if (selectedProvince) {
            const provinceName = provinces.find(
                (province) => province.id === selectedProvince
            )?.name;
            setData("province", provinceName || "");
        }

        if (selectedRegency) {
            const regencyName = regencies.find(
                (regency) => regency.id === selectedRegency
            )?.name;
            setData("regency", regencyName || "");
        }

        if (selectedDistrict) {
            const districtName = districts.find(
                (district) => district.id === selectedDistrict
            )?.name;
            setData("district", districtName || "");
        }

        if (selectedVillage) {
            const villageName = villages.find(
                (village) => village.id === selectedVillage
            )?.name;
            setData("village", villageName || "");
        }
    }, [
        selectedProvince,
        selectedRegency,
        selectedDistrict,
        selectedVillage,
        provinces,
        regencies,
        districts,
        villages,
    ]);

    return (
        <div className="col-span-6">
            <ProvinsiSelect
                provinces={provinces}
                selectedProvince={selectedProvince}
                onChange={setSelectedProvince}
            />
            {selectedProvince && (
                <KabupatenSelect
                    regencies={regencies}
                    selectedRegency={selectedRegency}
                    onChange={setSelectedRegency}
                />
            )}
            {selectedRegency && (
                <KecamatanSelect
                    districts={districts}
                    selectedDistrict={selectedDistrict}
                    onChange={setSelectedDistrict}
                />
            )}
            {selectedDistrict && (
                <DesaSelect
                    villages={villages}
                    selectedVillage={selectedVillage}
                    onChange={setSelectedVillage}
                />
            )}
        </div>
    );
};

export default RegionSelect;
