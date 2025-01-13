import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { GuestHeader } from "./Components/GuestHeader";
import { GuestFooter } from "./Components/GuestFooter";

export default function GuestLayout({ children }) {
    return (
        <>
            <GuestHeader />
                {children}
            <GuestFooter/>
        </>
    );
}
