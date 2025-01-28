import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";

export default function Setting({ auth }) {
    const { endCompetition } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        value: endCompetition?.value || "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("setting.store"));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Pengaturan
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="pt-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-xl relative">
                        <div className="px-10 py-8 text-gray-900">
                            <h1 className="text-2xl font-bold text-center mb-6">
                                {endCompetition
                                    ? "Update Akhir Kompetisi"
                                    : "Pengaturan Akhir Kompetisi"}
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="value"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Pilih tanggal akhir kompetisi
                                    </label>
                                    <input
                                        type="date"
                                        id="value"
                                        name="value"
                                        value={data.value}
                                        onChange={(e) =>
                                            setData("value", e.target.value)
                                        }
                                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                                            errors.value ? "border-red-500" : ""
                                        }`}
                                    />
                                    {errors.value && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.value}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-2 px-4 text-white bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded-md shadow"
                                >
                                    {endCompetition ? "Update" : "Simpan"}
                                </button>
                            </form>

                            {endCompetition && (
                                <div className="mt-6 text-center">
                                    <p className="text-sm text-gray-500">
                                        Akhir Kompetisi:{" "}
                                        <span className="font-medium">
                                            {endCompetition.value}
                                        </span>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
