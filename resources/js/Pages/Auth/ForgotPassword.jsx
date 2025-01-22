import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <main className="sm:border w-full mx-auto max-w-lg rounded-lg py-6 px-8 my-12 flex flex-col items-center justify-center">
                <h1 className="mb-4 font-bold text-lg">Reset Password</h1>
                <div className="mb-4 text-sm text-gray-600">
                    Lupa password? silahkan masukkan email Anda di bawah ini,
                    kami akan mengirimkan link untuk reset password.
                </div>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form className="w-full" onSubmit={submit}>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />

                    <div className="mt-4 flex items-center justify-end">
                        <PrimaryButton disabled={processing}>
                            Kirim Email
                        </PrimaryButton>
                    </div>
                </form>
            </main>
        </GuestLayout>
    );
}
