import Alur from "@/Components/Alur";
import CTA from "@/Components/CTA";
import { Hero } from "@/Components/Hero";
import HeroImage from "@/Components/HeroImage";
import KompetisiStart from "@/Components/KompetisiStart";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <GuestLayout>
            <HeroImage />
            <KompetisiStart />
            <Alur />
            <CTA />
        </GuestLayout>
    );
}
