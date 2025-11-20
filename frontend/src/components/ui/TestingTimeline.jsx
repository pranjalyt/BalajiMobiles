import { useEffect, useRef, useState } from 'react'

export default function TestingTimeline() {
    const sectionRef = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                }
            },
            { threshold: 0.1 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const steps = [
        { title: 'Physical Body Check', number: 1 },
        { title: 'Display & Touch Test', number: 2 },
        { title: 'Battery & Performance Scan', number: 3 },
        { title: 'Camera & Mic Check', number: 4 },
        { title: 'Network & SIM Test', number: 5 },
        { title: 'Final Clean & Pack', number: 6 }
    ]

    return (
        <section ref={sectionRef} className="py-16 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                        Our Testing Process
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        Built for peace of mind.
                    </p>
                </div>

                {/* Desktop: Two Rows Layout */}
                <div className="hidden lg:block">
                    <div className="space-y-8">
                        {/* First Row - Steps 1-3 */}
                        <div className="grid grid-cols-3 gap-6">
                            {steps.slice(0, 3).map((step, index) => (
                                <div
                                    key={step.number}
                                    className={`transition-all duration-500 ${
                                        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                    }`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <div className="bg-white dark:bg-black border-2 border-gray-300 dark:border-gray-700 rounded-2xl p-6 w-full h-40 text-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center">
                                        <div className="w-12 h-12 rounded-full bg-white dark:bg-white text-gray-900 dark:text-gray-900 flex items-center justify-center font-bold text-lg mb-3 transition-colors duration-300">
                                            {step.number}
                                        </div>
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white transition-colors duration-300 line-clamp-2">
                                            {step.title}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Second Row - Steps 4-6 */}
                        <div className="grid grid-cols-3 gap-6">
                            {steps.slice(3, 6).map((step, index) => (
                                <div
                                    key={step.number}
                                    className={`transition-all duration-500 ${
                                        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                    }`}
                                    style={{ transitionDelay: `${(index + 3) * 100}ms` }}
                                >
                                    <div className="bg-white dark:bg-black border-2 border-gray-300 dark:border-gray-700 rounded-2xl p-6 w-full h-40 text-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center">
                                        <div className="w-12 h-12 rounded-full bg-white dark:bg-white text-gray-900 dark:text-gray-900 flex items-center justify-center font-bold text-lg mb-3 transition-colors duration-300">
                                            {step.number}
                                        </div>
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white transition-colors duration-300 line-clamp-2">
                                            {step.title}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile: Vertical Stack */}
                <div className="lg:hidden space-y-4">
                    {steps.map((step, index) => (
                        <div
                            key={step.number}
                            className={`bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl p-6 h-20 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 flex items-center ${
                                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-center gap-4 w-full">
                                <div className="w-12 h-12 rounded-full bg-white dark:bg-white text-gray-900 dark:text-gray-900 flex items-center justify-center font-bold text-lg flex-shrink-0 transition-colors duration-300">
                                    {step.number}
                                </div>
                                <h3 className="text-base font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                                    {step.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

