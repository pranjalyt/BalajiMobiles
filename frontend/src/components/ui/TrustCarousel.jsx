export default function TrustCarousel() {

    const trustBadges = [
        {
            title: 'Warranty',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            title: 'Certified Graded',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            )
        },
        {
            title: 'Secure Checkout',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            )
        }
    ]

    return (
        <section className="py-16 bg-white dark:bg-black transition-colors duration-300">
            <div className="container-custom">
                {/* Trust Badges */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {trustBadges.map((badge, index) => (
                        <div
                            key={badge.title}
                            className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="text-gray-900 dark:text-white mb-3 flex justify-center transition-colors duration-300">
                                {badge.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                                {badge.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

