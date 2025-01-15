"use client";

import { Carousel } from "flowbite-react";

const themeOptions = {
    root: {
        base: "relative h-full w-full",
        leftControl:
            "absolute left-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
        rightControl:
            "absolute right-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
    },
    indicators: {
        active: {
            off: "bg-green-500/50 hover:bg-green-400 dark:bg-gray-800/50 dark:hover:bg-gray-800",
            on: "bg-green-500 dark:bg-gray-800",
        },
        base: "h-2 w-2 rounded-full",
        wrapper: "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3",
    },
    control: {
        base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-2 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
        icon: "h-5 w-5 text-gray-500 dark:text-gray-800 sm:h-6 sm:w-6",
    },
};

export function DynamicCarousel({ slides }) {
    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel theme={themeOptions}>
                {slides.map((slideContent, index) => (
                    <div
                        key={index}
                        className="flex h-full items-center justify-center dark:bg-gray-700 dark:text-white"
                    >
                        {slideContent}
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
