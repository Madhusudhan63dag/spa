import { useEffect } from "react";

export default function useLocomotive() {
    useEffect(() => {
        // Check if window is defined (client-side)
        if (typeof window === "undefined") return;

        // Dynamic import of locomotive-scroll
        (async () => {
            const LocomotiveScroll = (await import('locomotive-scroll')).default;
            const scroll = new LocomotiveScroll({
                el: document.querySelector("[data-scroll-container]"),
                smooth: true,
                multiplier: 1,
                class: "is-revealed",
                reloadOnContextChange: true,
                scrollFromAnywhere: true,
                getDirection: true,
                tablet: {
                    smooth: true,
                    breakpoint: 0
                }
            });

            return () => scroll.destroy();
        })();
    }, []);
}
