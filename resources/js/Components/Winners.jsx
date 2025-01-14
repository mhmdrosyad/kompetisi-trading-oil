import { TrophyIcon } from "@heroicons/react/24/solid";

export default function Winners() {
    const prizes = [
        {
            title: "JUARA #1",
            description: "Uang Rp. 2.500.000 + merchandise NTC",
            iconColor: "text-yellow-400",
        },
        {
            title: "JUARA #2",
            description: "Uang Rp. 1.500.000 + merchandise NTC",
            iconColor: "text-gray-400",
        },
        {
            title: "JUARA #3",
            description: "Uang Rp. 1.000.000 + merchandise NTC",
            iconColor: "text-yellow-600",
        },
        {
            title: "JUARA 4-10",
            description: "Merchandise NTC",
            iconColor: "text-gray-100",
        },
    ];

    return (
        <div className="mt-1">
            {prizes.map((prize, index) => (
                <div
                    key={index}
                    className="rounded-xl border border-gray-100 mb-3 bg-white"
                >
                    <div className="flex items-start gap-4 p-4 sm:p-6">
                        {/* Ikon Piala */}
                        <div className="block shrink-0">
                            <TrophyIcon
                                className={`h-10 w-10 ${prize.iconColor}`}
                            />
                        </div>

                        {/* Detail Juara */}
                        <div>
                            <h3 className="font-bold sm:text-lg">
                                {prize.title}
                            </h3>
                            <p className="line-clamp-2 text-sm text-gray-700">
                                {prize.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
