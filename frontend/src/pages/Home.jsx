import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { phoneAPI } from '../services/api'
import PhoneCard from '../components/PhoneCard'
import CategoryCard from '../components/CategoryCard'
import DealBanner from '../components/DealBanner'
import TestimonialCarousel from '../components/TestimonialCarousel'
import WhyBuySection from '../components/ui/WhyBuySection'
import TestingTimeline from '../components/ui/TestingTimeline'
import PromiseBar from '../components/ui/PromiseBar'
import TrustCarousel from '../components/ui/TrustCarousel'
import FAQSection from '../components/ui/FAQSection'
import AOS from 'aos'

export default function Home() {
    const [featuredPhones, setFeaturedPhones] = useState([])
    const [dealsPhones, setDealsPhones] = useState([])
    const [accessoriesPhones, setAccessoriesPhones] = useState([])
    const [loading, setLoading] = useState(true)
    const [dealsLoading, setDealsLoading] = useState(true)
    const navigate = useNavigate()
    const dealsScrollRef = useRef(null)
    const accessoriesScrollRef = useRef(null)

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
        })
        fetchFeaturedPhones()
    }, [])

    const fetchFeaturedPhones = async () => {
        try {
            const data = await phoneAPI.getAllPhones({ availableOnly: true })
            setFeaturedPhones(data.slice(0, 4)) // Show top 4 phones
        } catch (error) {
            console.error('Error fetching phones:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchDealsPhones = async () => {
        try {
            // Fetch only phones marked as deals
            const data = await phoneAPI.getAllPhones({ 
                availableOnly: true,
                dealsOnly: true
            })
            setDealsPhones(data.slice(0, 8)) // Show up to 8 phones for deals
        } catch (error) {
            console.error('Error fetching deals phones:', error)
        } finally {
            setDealsLoading(false)
        }
    }

    const fetchAccessoriesPhones = async () => {
        try {
            const data = await phoneAPI.getAllPhones({ availableOnly: true })
            // Get latest 5 phones (they're already sorted by newest first from backend)
            setAccessoriesPhones(data.slice(0, 5)) // Show latest 5 phones
        } catch (error) {
            console.error('Error fetching accessories phones:', error)
        }
    }

    useEffect(() => {
        fetchDealsPhones()
        fetchAccessoriesPhones()
    }, [])

    const categories = [
        { name: 'iPhone', icon: '🍎' },
        { name: 'Samsung', icon: '📱' },
        { name: 'OnePlus', icon: '⚡' },
        { name: 'Vivo', icon: '📸' },
        { name: 'Oppo', icon: '🤳' },
        { name: 'Mi', icon: '📱' },
        { name: 'Others', icon: '📱', isLink: true, linkTo: '/phones' },
    ]

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative bg-white dark:bg-black py-20 lg:py-28 overflow-hidden transition-colors duration-300">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556656793-02715d88b638?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] opacity-5 dark:opacity-10 bg-cover bg-center"></div>
                <div className="container-custom relative z-10">
                    <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12" data-aos="fade-up">
                        {/* Left Side - Text Content */}
                        <div className="flex-1 text-center lg:text-left w-full lg:w-auto">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-white transition-colors duration-300">
                                Premium Used Phones at <span className="text-amber-500 dark:text-amber-400">Unbeatable</span> <span className="text-gray-900 dark:text-white">Prices</span>
                            </h1>
                            <div className="mb-8 space-y-3">
                                {[
                                    'Certified quality',
                                    '1-month warranty',
                                    'EMI available in Delhi',
                                    'Exchange offers available',
                                    'Best market rates'
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3 text-lg md:text-xl text-gray-700 dark:text-gray-300 transition-colors duration-300">
                                        <svg className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-amber-500 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link to="/phones" className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                    Browse Phones
                                </Link>
                                <a href="#categories" className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-gray-800 dark:border-gray-200 text-gray-900 dark:text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                    Explore Brands
                                </a>
                            </div>
                        </div>

                        {/* Right Side - Image */}
                        <div className="flex-1 w-full lg:w-auto flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-md lg:max-w-lg">
                                <img
                                    src="/media/iphone15pm.png"
                                    alt="iPhone 15 Pro Max"
                                    className="w-full h-auto rounded-3xl shadow-2xl transition-transform duration-300 hover:scale-105 animate-float"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="py-12 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="0">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-amber-500 dark:text-amber-400 transition-colors duration-300">32-Point Quality Check</h3>
                            <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Every phone undergoes rigorous testing before listing.</p>
                        </div>
                        <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="100">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-amber-500 dark:text-amber-400 transition-colors duration-300">1 Month Warranty</h3>
                            <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Peace of mind with our replacement guarantee.</p>
                        </div>
                        <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="200">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-amber-500 dark:text-amber-400 transition-colors duration-300">Best Price Guarantee</h3>
                            <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">We offer the most competitive rates in the market.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section id="categories" className="py-16 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white transition-colors duration-300" data-aos="fade-up">Shop by Brand</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
                        {categories.map((cat, index) => (
                            <div key={cat.name} data-aos="fade-up" data-aos-delay={index * 50}>
                                <CategoryCard name={cat.name} brand={cat.name} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Today's Deals Section */}
            <section className="py-16 bg-white dark:bg-black transition-colors duration-300">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                        {/* Banner */}
                        <div className="lg:col-span-4" data-aos="fade-right">
                            <DealBanner
                                title="Today's Deals"
                                subtitle="All With Free Shipping"
                                buttonText="Shop now"
                                buttonLink="/phones"
                            />
                        </div>

                        {/* Product Carousel */}
                        <div className="lg:col-span-8" data-aos="fade-left">
                            {dealsLoading ? (
                                <div className="flex gap-4 overflow-x-auto pb-4">
                                    {[1, 2, 3, 4].map((n) => (
                                        <div key={n} className="flex-shrink-0 w-64 animate-pulse">
                                            <div className="bg-gray-200 h-64 rounded-2xl mb-4"></div>
                                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : dealsPhones.length > 0 ? (
                                <div className="relative">
                                    <div
                                        ref={dealsScrollRef}
                                        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
                                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                    >
                                        {dealsPhones.map((phone, index) => (
                                            <div key={phone.id} className="flex-shrink-0 w-64" data-aos="fade-up" data-aos-delay={index * 50}>
                                                <PhoneCard phone={phone} />
                                            </div>
                                        ))}
                                    </div>
                                    {/* Navigation Arrows */}
                                    <button
                                        onClick={() => {
                                            if (dealsScrollRef.current) {
                                                dealsScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
                                            }
                                        }}
                                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-2 shadow-lg z-10 hidden lg:block"
                                    >
                                        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (dealsScrollRef.current) {
                                                dealsScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
                                            }
                                        }}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-2 shadow-lg z-10 hidden lg:block"
                                    >
                                        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-2xl transition-colors duration-300">
                                    <p className="text-gray-500 dark:text-gray-400 text-lg transition-colors duration-300">No deals available at the moment.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* New Drops Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                        {/* Banner */}
                        <div className="lg:col-span-4" data-aos="fade-right">
                            <DealBanner
                                title="New Drops"
                                subtitle="Check out the latest phones we just added."
                                buttonText="Shop now"
                                buttonLink="/phones"
                            />
                        </div>

                        {/* Product Images */}
                        <div className="lg:col-span-8" data-aos="fade-left">
                            {accessoriesPhones.length > 0 ? (
                                <div className="relative">
                                    <div
                                        ref={accessoriesScrollRef}
                                        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
                                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                    >
                                        {accessoriesPhones.map((phone, index) => (
                                            <div key={phone.id} className="flex-shrink-0 w-64" data-aos="fade-up" data-aos-delay={index * 50}>
                                                <PhoneCard phone={phone} />
                                            </div>
                                        ))}
                                    </div>
                                    {/* Navigation Arrows */}
                                    <button
                                        onClick={() => {
                                            if (accessoriesScrollRef.current) {
                                                accessoriesScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
                                            }
                                        }}
                                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-2 shadow-lg z-10 hidden lg:block"
                                    >
                                        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (accessoriesScrollRef.current) {
                                                accessoriesScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
                                            }
                                        }}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-2 shadow-lg z-10 hidden lg:block"
                                    >
                                        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl transition-colors duration-300">
                                    <p className="text-gray-500 dark:text-gray-400 text-lg transition-colors duration-300">No products available at the moment.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Buy From Us Section */}
            <WhyBuySection />

            {/* Our Testing Process Section */}
            <TestingTimeline />

            {/* Our Promise Bar Section */}
            <PromiseBar />

            {/* Trust Badges + Testimonial Carousel Section */}
            <TrustCarousel />

            {/* Featured Phones */}
            <section className="py-16 bg-white dark:bg-black transition-colors duration-300">
                <div className="container-custom">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300" data-aos="fade-right">Featured Phones</h2>
                        <Link to="/phones" className="text-gray-600 dark:text-gray-400 font-semibold hover:text-gray-900 dark:hover:text-white flex items-center gap-1 transition-colors duration-300" data-aos="fade-left">
                            View All
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[1, 2, 3, 4].map((n) => (
                                <div key={n} className="animate-pulse">
                                    <div className="bg-gray-200 h-64 rounded-2xl mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    ) : featuredPhones.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {featuredPhones.map((phone, index) => (
                                <div key={phone.id} data-aos="fade-up" data-aos-delay={index * 100}>
                                    <PhoneCard phone={phone} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-2xl transition-colors duration-300">
                            <p className="text-gray-500 dark:text-gray-400 text-lg transition-colors duration-300">No phones available at the moment.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* FAQ Section */}
            <FAQSection />

            {/* Testimonials */}
            <section className="py-16 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold text-center mb-12 text-amber-500 dark:text-amber-400 transition-colors duration-300" data-aos="fade-up">Happy Customers</h2>
                    <TestimonialCarousel />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-slate-800 text-white transition-colors duration-300">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 transition-colors duration-300" data-aos="fade-up">
                        Have a phone to sell?
                    </h2>
                    <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto transition-colors duration-300" data-aos="fade-up" data-aos-delay="100">
                        We offer the best exchange rates for your old devices. Contact us on WhatsApp to get a quote instantly.
                    </p>
                    <a
                        href={`https://wa.me/${import.meta.env.VITE_ADMIN_WHATSAPP}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-slate-700 hover:bg-gray-100 font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center gap-2"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Chat on WhatsApp
                    </a>
                </div>
            </section>
        </div>
    )
}
