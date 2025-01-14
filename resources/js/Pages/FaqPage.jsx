import Faqs from "@/Components/Faqs";
import GuestLayout from "@/Layouts/GuestLayout";

export default function FaqPage() {
    return (
        <GuestLayout>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <h2 className="text-center text-xl md:text-3xl my-6 font-bold">
                    Pertanyaan Umum
                </h2>
                <div className="my-3">
                    <Faqs />
                </div>
            </div>
        </GuestLayout>
    );
}
