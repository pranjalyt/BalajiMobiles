import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCartCount } from '../utils/cartUtils'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        const handleCartUpdate = () => {
            setCartCount(getCartCount())
        }

        // Initial count
        handleCartUpdate()

        // Listen for updates
        window.addEventListener('cartUpdated', handleCartUpdate)
        return () => window.removeEventListener('cartUpdated', handleCartUpdate)
    }, [])

    return (
        <nav className="bg-white dark:bg-black shadow-md sticky top-0 z-50 transition-colors duration-300 border-b border-gray-200 dark:border-gray-800">
            <div className="container-custom">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img 
                            src="/media/blogo.png" 
                            alt="Balaji Enterprises Logo" 
                            className="h-10 w-auto"
                        />
                        <span className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                            Balaji Enterprises
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-300">
                            Home
                        </Link>
                        <Link to="/phones" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-300">
                            Browse Phones
                        </Link>
                        <Link to="/cart" className="relative text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-300">
                            Cart
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-3 bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-fade-in transition-colors duration-300">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-600 focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800 animate-slide-up">
                        <div className="flex flex-col gap-4">
                            <Link
                                to="/"
                                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                to="/phones"
                                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                Browse Phones
                            </Link>
                            <Link
                                to="/cart"
                                className="flex items-center justify-between text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                <span>Cart</span>
                                {cartCount > 0 && (
                                    <span className="bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transition-colors duration-300">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
