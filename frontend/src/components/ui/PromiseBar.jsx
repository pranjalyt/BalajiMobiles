import { useEffect, useRef, useState } from 'react'

export default function PromiseBar() {
    const barRef = useRef(null)
    const [hasPulsed, setHasPulsed] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasPulsed) {
                    setHasPulsed(true)
                }
            },
            { threshold: 0.5 }
        )

        if (barRef.current) {
            observer.observe(barRef.current)
        }

        return () => observer.disconnect()
    }, [hasPulsed])

    return (
        <section className="py-8 bg-white dark:bg-black transition-colors duration-300">
            <div className="container-custom">
                <div
                    ref={barRef}
                    className={`bg-gray-100 dark:bg-gray-900 rounded-2xl px-8 py-6 text-center transition-all duration-500 ${
                        hasPulsed ? 'animate-pulse-once' : ''
                    }`}
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                        Our Promise. Your Peace Of Mind.
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        Each phone is checked, verified, and graded honestly.
                    </p>
                </div>
            </div>
        </section>
    )
}

