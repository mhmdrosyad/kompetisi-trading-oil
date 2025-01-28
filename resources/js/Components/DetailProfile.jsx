export default function DetailProfile({ user }) {
    const profileData = [
        { label: "Nama", value: user.name || "-" },
        { label: "Nama Lengkap", value: user.profile?.full_name || "-" },
        { label: "Email", value: user.email || "-" },
        { label: "No. WA", value: user.profile?.whatsapp_number || "-" },
        { label: "Alamat", value: user.profile?.address || "-" },
        {
            label: "Nama Akun MT4",
            value: user.profile?.mt4_account_name || "-",
        },
        {
            label: "Nomor Login MT4",
            value: user.profile?.mt4_login_number || "-",
        },
    ];
    return (
        <div className="mt-3 flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
                {profileData.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4"
                    >
                        <dt className="font-medium text-gray-900">
                            {item.label}
                        </dt>

                        <dd
                            className={`text-gray-700 sm:col-span-2 ${
                                item.label === "Alamat" ? "uppercase" : ""
                            }`}
                        >
                            {item.value}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}
