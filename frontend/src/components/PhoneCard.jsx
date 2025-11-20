import { Link } from 'react-router-dom'
import { addToCart, isInCart } from '../utils/cartUtils'
import { useState, useEffect } from 'react'

export default function PhoneCard({ phone }) {
    const [inCart, setInCart] = useState(false)

    useEffect(() => {
        setInCart(isInCart(phone.id))

        const handleCartUpdate = () => {
            setInCart(isInCart(phone.id))
        }

        window.addEventListener('cartUpdated', handleCartUpdate)
        return () => window.removeEventListener('cartUpdated', handleCartUpdate)
    }, [phone.id])

    const handleAddToCart = (e) => {
        e.preventDefault() // Prevent navigation to detail page
        addToCart(phone)
    }

    return (
        <Link to={`/phones/${phone.id}`} className="block group">
            <div className="card h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
                    <img
                        src={phone.images[0]}
                        alt={phone.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Condition Badge */}
                    <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`badge ${phone.condition === 'Like New' ? 'badge-success' :
                                phone.condition === 'Excellent' ? 'badge-info' :
                                    'badge-warning'
                            }`}>
                            {phone.condition}
                        </span>
                        {/* Deal Badge */}
                        {phone.is_deal && (
                            <span className="badge bg-gray-900 dark:bg-white text-white dark:text-black">
                                Deal
                            </span>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-1 transition-colors duration-300">{phone.brand}</p>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                        {phone.name}
                    </h3>

                    {/* Specs */}
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4 transition-colors duration-300">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                            </svg>
                            {phone.storage}
                        </span>
                        {phone.battery && (
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                {phone.battery}
                            </span>
                        )}
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-center justify-between mt-auto">
                        <p className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                            ₹{phone.price.toLocaleString('en-IN')}
                        </p>

                        <button
                            onClick={handleAddToCart}
                            disabled={inCart}
                            className={`p-2 rounded-full transition-colors duration-300 ${inCart
                                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-black'
                                }`}
                            title={inCart ? "In Cart" : "Add to Cart"}
                        >
                            {inCart ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}
