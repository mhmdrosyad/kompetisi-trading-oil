import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";

export default function Faqs() {
    const [selectedTab, setSelectedTab] = useState("Overview");
    const tabItems = [
        "Cara daftar",
        "Integration",
        "Billing",
        "Transactions",
        "Plans",
    ];

    // Konten untuk masing-masing tab
    const tabContents = {
        "Cara daftar": (
            <div>
                <h2 className="text-xl font-semibold">Overview</h2>
                <p className="mt-2 leading-relaxed">
                    Welcome to the <b>Overview</b> tab! Here you can see the
                    general details about our system and services.
                </p>
            </div>
        ),
        Integration: (
            <div>
                <h2 className="text-xl font-semibold">Integration</h2>
                <ul className="list-disc ml-5 mt-2">
                    <li>Step 1: Configure your API key.</li>
                    <li>Step 2: Set up webhooks.</li>
                    <li>Step 3: Test the integration.</li>
                </ul>
            </div>
        ),
        Billing: (
            <div>
                <h2 className="text-xl font-semibold">Billing</h2>
                <p className="mt-2">
                    Manage your billing information, view invoices, and update
                    your payment methods here.
                </p>
            </div>
        ),
        Transactions: (
            <div>
                <h2 className="text-xl font-semibold">Transactions</h2>
                <table className="w-full mt-4 border-collapse border border-gray-300 text-sm">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Date</th>
                            <th className="border border-gray-300 p-2">
                                Amount
                            </th>
                            <th className="border border-gray-300 p-2">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 p-2">
                                2025-01-10
                            </td>
                            <td className="border border-gray-300 p-2">$100</td>
                            <td className="border border-gray-300 p-2">
                                Completed
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-2">
                                2025-01-11
                            </td>
                            <td className="border border-gray-300 p-2">$50</td>
                            <td className="border border-gray-300 p-2">
                                Pending
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        ),
        Plans: (
            <div>
                <h2 className="text-xl font-semibold">Plans</h2>
                <p className="mt-2">
                    Explore our plans and choose the one that fits your needs:
                </p>
                <ul className="list-disc ml-5 mt-2">
                    <li>Basic Plan - $10/month</li>
                    <li>Pro Plan - $30/month</li>
                    <li>Enterprise Plan - $100/month</li>
                </ul>
            </div>
        ),
    };

    return (
        <Tabs.Root
            className="max-w-screen-xl flex flex-col sm:flex-row mx-auto mt-4 px-4 md:px-8"
            value={selectedTab}
            onValueChange={(val) => setSelectedTab(val)}
            orientation="vertical"
        >
            {/* Sidebar Tabs */}
            <Tabs.List
                className="w-72 hidden border-l flex-col justify-start items-start gap-y-3 text-sm sm:flex"
                aria-label="Manage your account"
            >
                {tabItems.map((item, idx) => (
                    <Tabs.Trigger
                        key={idx}
                        className="group outline-none px-1.5 border-l-2 border-white text-gray-500 data-[state=active]:border-green-500 data-[state=active]:text-green-500"
                        value={item}
                    >
                        <div className="py-1.5 px-3 rounded-lg duration-150 group-hover:text-green-500 group-hover:bg-gray-100 font-medium">
                            {item}
                        </div>
                    </Tabs.Trigger>
                ))}
            </Tabs.List>

            {/* Dropdown Tabs for Mobile */}
            <div className="relative text-gray-500 sm:hidden">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="pointer-events-none w-5 h-5 absolute right-2 inset-y-0 my-auto"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
                <select
                    value={selectedTab}
                    className="py-2 px-3 w-full bg-transparent appearance-none outline-none border rounded-lg shadow-sm focus:border-green-500 text-sm"
                    onChange={(e) => setSelectedTab(e.target.value)}
                >
                    {tabItems.map((item, idx) => (
                        <option key={idx} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            {/* Tab Contents */}
            <div className="w-full p-3">
                {tabItems.map((item, idx) => (
                    <Tabs.Content key={idx} value={item}>
                        {tabContents[item]}
                    </Tabs.Content>
                ))}
            </div>
        </Tabs.Root>
    );
}
