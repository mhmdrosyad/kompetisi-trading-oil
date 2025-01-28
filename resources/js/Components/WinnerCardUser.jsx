import PrimaryButton from "./PrimaryButton";

export default function WinnerCardUser({ user, index, userId }) {
    function profitLost(totalProfitLoss) {
        const totalProfitLossPercentage =
            totalProfitLoss !== 0
                ? Math.round((totalProfitLoss / 5000) * 100)
                : 0;
        return `$${totalProfitLoss} (${totalProfitLossPercentage}%)`;
    }
    return (
        <div
            key={index}
            className={`mb-3 relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 ${
                user.id === userId
                    ? "border-2 bg-yellow-50 border-yellow-400"
                    : "bg-white"
            }`}
        >
            <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-300 via-yellow-300 to-yellow-400"></span>

            <div className="flex gap-3 justify-between sm:gap-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        {user.name} {user.id === userId ? "(Anda)" : null}
                    </h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="font-bold bg-yellow-300 rounded-full h-6 w-6 flex items-center justify-center p-5">
                    {user.custom_rank}
                </div>
            </div>

            <dl className="mt-3 flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                    <dt className="size-5 text-green-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                            fill="currentColor"
                        >
                            <path d="M120-120v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-327v-113l280-280 160 160 280-280v113L560-447 400-607 120-327Z" />
                        </svg>
                    </dt>
                    <dd className="text-sm font-bold text-green-500">
                        {profitLost(user.total_profit_loss)}
                    </dd>
                </div>
            </dl>
        </div>
    );
}
