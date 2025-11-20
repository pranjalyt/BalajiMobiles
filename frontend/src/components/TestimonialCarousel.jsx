import { useState, useEffect } from 'react'

const testimonials = [
    {
        id: 1,
        name: 'Rahul Sharma',
        rating: 5,
        text: 'Excellent service! Got my iPhone 12 in perfect condition. Battery health was exactly as mentioned. Highly recommended!',
        avatar: '👨‍💼',
    },
    {
        id: 2,
        name: 'Priya Patel',
        rating: 5,
        text: 'Very happy with my purchase. The phone looks brand new and the warranty gives me peace of mind. Great prices too!',
        avatar: '👩‍💼',
    },
    {
        id: 3,
        name: 'Amit Kumar',
        rating: 5,
        text: 'Best place to buy used phones! The 32-point check really shows. My OnePlus works flawlessly. Will buy again!',
        avatar: '👨',
    },
    {
        id: 4,
        name: 'Sneha Reddy',
        rating: 5,
        text: 'Trustworthy seller! Got my Samsung Galaxy in excellent condition. The WhatsApp checkout was super convenient.',
        avatar: '👩',
    },
]

export default function TestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        }, 5000) // Change every 5 seconds

        return () => clearInterval(interval)
    }, [])

    const goToSlide = (index) => {
        setCurrentIndex(index)
    }

    return (
        <div className="relative">
            {/* Testimonial Container - Bigger */}
            <div className="bg-slate-800 rounded-2xl shadow-lg p-6 md:p-10 lg:p-12 max-w-6xl mx-auto transition-colors duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Side - YouTube Video */}
                    <div className="w-full">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-900">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src=""
                                title="Customer Testimonial Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    {/* Right Side - Testimonial Text and Name */}
                    <div className="flex flex-col justify-center">
                        {/* Stars */}
                        <div className="flex gap-1 mb-4">
                            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                <svg
                                    key={i}
                                    className="w-6 h-6 text-yellow-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>

                        {/* Text */}
                        <p className="text-white text-lg md:text-xl mb-6 italic transition-colors duration-300">
                            "{testimonials[currentIndex].text}"
                        </p>

                        {/* Name */}
                        <p className="font-bold text-white text-lg md:text-xl transition-colors duration-300">
                            {testimonials[currentIndex].name}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                                ? 'bg-white w-8'
                                : 'bg-gray-500 hover:bg-gray-400'
                            }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
