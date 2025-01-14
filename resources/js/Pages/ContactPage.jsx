import Contact from "@/Components/Contact";
import GuestLayout from "@/Layouts/GuestLayout";

export default function ContactPage() {
    return (
        <GuestLayout>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="my-3">
                    <Contact />
                </div>
            </div>
        </GuestLayout>
    );
}
