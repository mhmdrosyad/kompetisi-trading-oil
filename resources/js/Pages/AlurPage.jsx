import StepHome from "@/Components/StepHome";
import GuestLayout from "@/Layouts/GuestLayout";

export default function AlurPage() {
    return (
        <GuestLayout>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <h2 className="text-center text-xl md:text-3xl my-6 font-bold">
                    Alur Kompetisi Demo Trading Oil
                </h2>
                <img
                    src="/images/alur.png"
                    alt="Alur kompetisi"
                    className="rounded-lg"
                />
                <div className="my-3">
                    <StepHome />
                </div>
            </div>
        </GuestLayout>
    );
}
