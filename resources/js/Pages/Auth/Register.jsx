import ApplicationLogo from "@/Components/ApplicationLogo";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PasswordInput from "@/Components/PasswordInput";
import PhoneNumberInput from "@/Components/PhoneNumberInput";
import PrimaryButton from "@/Components/PrimaryButton";
import RegionSelect from "@/Components/RegionSelect";
import { Rule } from "@/Components/Rule";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        full_name: "",
        whatsapp_number: "",
        mt4_account_name: "",
        mt4_login_number: "",
        investor_password: "",
        province: "",
        regency: "",
        district: "",
        village: "",
        address: "",
    });

    const handleChange = (name, value) => {
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <section className="bg-white">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <aside className="relative block lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                        <div className="border-l h-full p-8">
                            <h2 className="mt-6 text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
                                Syarat Mengikuti Kompetisi
                            </h2>
                            <div className="py-5">
                                <ol className="list-decimal pl-6">
                                    <li>
                                        Membuat akun Demo di broker IndoSukses
                                        Futures (type Forex-ISF) dengan saldo
                                        $5.000. Pembuatan akun Demo langsung
                                        dari aplikasi Metatrader 4 (Lihat
                                        tutorial)
                                    </li>
                                    <li>
                                        Mendaftar di website ini dengan
                                        melengkapi form isian, termasuk nama
                                        akun, nomor, akun, dan investor
                                        password.
                                    </li>
                                    <li>Satu orang hanya boleh satu akun.</li>
                                </ol>
                            </div>

                            <h2 className="mt-6 text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
                                Aturan kompetisi
                            </h2>
                            <div>
                                <Rule />
                            </div>

                            <h2 className="mt-6 text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
                                Ketentuan Pemenang
                            </h2>
                            <div className="mt-3">
                                <p className="mb-3">
                                    Pemenang diambil 10 dengan profit terbesar
                                    di MT4. Dengan ketentuan hadiah:
                                </p>
                                <ul className="list-disc pl-6">
                                    <li>
                                        <strong>
                                            Juara 1: Rp. 2.500.000 + Merchandise
                                            NTC
                                        </strong>
                                    </li>
                                    <li>
                                        <strong>
                                            Juara 2: Rp. 1.500.000 + Merchandise
                                            NTC
                                        </strong>
                                    </li>
                                    <li>
                                        <strong>
                                            Juara 3: Rp. 1.000.000 + Merchandise
                                            NTC
                                        </strong>
                                    </li>
                                    <li>
                                        <strong>
                                            Juara 4-10: Merchandise NTC
                                        </strong>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </aside>

                    <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-8 xl:col-span-6">
                        <div className="max-w-xl lg:max-w-3xl">
                            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                                Form Pendaftaran Kompetisi
                            </h1>

                            <p className="mt-4 leading-relaxed text-gray-500">
                                Harap mengisi formulir registrasi dengan data
                                yang benar dan sesuai agar kompetisi dapat
                                berjalan dengan lancar.
                            </p>

                            <form
                                onSubmit={submit}
                                className="mt-8 grid grid-cols-6 gap-6"
                            >
                                <div className="col-span-6 sm:col-span-3">
                                    <InputLabel
                                        htmlFor="name"
                                        value="Nama Panggilan"
                                    />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <InputLabel
                                        htmlFor="full_name"
                                        value="Nama Lengkap Sesuai KTP/Rekening"
                                    />

                                    <TextInput
                                        id="full_name"
                                        name="full_name"
                                        value={data.full_name}
                                        className="mt-1 block w-full"
                                        autoComplete="full_name"
                                        onChange={(e) =>
                                            setData("full_name", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.full_name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <InputLabel htmlFor="email" value="Email" />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <InputLabel
                                        htmlFor="whatsapp_number"
                                        value="Nomor WhatsApp (WA)"
                                    />

                                    <PhoneNumberInput
                                        id="whatsapp_number"
                                        name="whatsapp_number"
                                        value={data.whatsapp_number}
                                        className="mt-1 block w-full"
                                        autoComplete="whatsapp_number"
                                        onChange={(e) =>
                                            handleChange(
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.whatsapp_number}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                    />

                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Confirm Password"
                                    />

                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="col-span-6 flex items-center">
                                    <span className="font-bold pr-6">
                                        Alamat
                                    </span>
                                    <span className="h-px flex-1 bg-gray-300"></span>
                                </div>

                                <RegionSelect setData={setData} />

                                <div className="col-span-6">
                                    <InputLabel
                                        htmlFor="address"
                                        value="Jalan/Komplek/Dusun:"
                                    />

                                    <TextInput
                                        id="address"
                                        name="address"
                                        value={data.address}
                                        className="mt-1 block w-full"
                                        autoComplete="address"
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.address}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="col-span-6 flex items-center">
                                    <span className="font-bold pr-6">
                                        Akun MT4
                                    </span>
                                    <span className="h-px flex-1 bg-gray-300"></span>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <InputLabel
                                        htmlFor="mt4_account_name"
                                        value="Nama Akun MT4"
                                    />

                                    <TextInput
                                        id="mt4_account_name"
                                        name="mt4_account_name"
                                        value={data.mt4_account_name}
                                        className="mt-1 block w-full"
                                        autoComplete="mt4_account_name"
                                        onChange={(e) =>
                                            setData(
                                                "mt4_account_name",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.mt4_account_name}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <InputLabel
                                        htmlFor="mt4_login_number"
                                        value="Nomor Login MT4"
                                    />

                                    <TextInput
                                        id="mt4_login_number"
                                        name="mt4_login_number"
                                        value={data.mt4_login_number}
                                        className="mt-1 block w-full"
                                        autoComplete="mt4_login_number"
                                        onChange={(e) =>
                                            setData(
                                                "mt4_login_number",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.mt4_login_number}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="col-span-6">
                                    <PasswordInput
                                        label="Investor Password"
                                        id="investor_password"
                                        name="investor_password"
                                        value={data.investor_password}
                                        onChange={(e) =>
                                            setData(
                                                "investor_password",
                                                e.target.value
                                            )
                                        }
                                        required
                                        error={errors.investor_password}
                                    />
                                </div>

                                <div className="col-span-6">
                                    <p className="text-sm text-gray-500">
                                        Dengan membuat akun, Anda telah
                                        menyetujui
                                        <Link
                                            href={route("syarat")}
                                            className="text-gray-700 underline"
                                        >
                                            {" "}
                                            aturan kami.
                                        </Link>
                                    </p>
                                </div>

                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                    <PrimaryButton
                                        disabled={processing}
                                        className="inline-block shrink-0 rounded-md border border-green-500 bg-green-500 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500"
                                    >
                                        Daftar Sekarang
                                    </PrimaryButton>

                                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                        Sudah punya akun?
                                        <Link
                                            href={route("login")}
                                            className="text-gray-700 underline"
                                        >
                                            Log in
                                        </Link>
                                        .
                                    </p>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </section>
        </GuestLayout>
    );
}
