import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCart, removeFromCart, updateQuantity, getCartTotal } from '../utils/cartUtils'

export default function Cart() {
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        loadCart()

        const handleCartUpdate = () => {
            loadCart()
        }

        window.addEventListener('cartUpdated', handleCartUpdate)
        return () => window.removeEventListener('cartUpdated', handleCartUpdate)
    }, [])

    const loadCart = () => {
        setCartItems(getCart())
    }

    const handleRemove = (phoneId) => {
        removeFromCart(phoneId)
    }

    const handleQuantityChange = (phoneId, newQuantity) => {
        updateQuantity(phoneId, newQuantity)
    }

    const total = getCartTotal()

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center transition-colors duration-300">
                <div className="text-center">
                    <svg className="w-32 h-32 mx-auto text-gray-300 dark:text-gray-700 mb-6 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Your cart is empty</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 transition-colors duration-300">Add some phones to get started!</p>
                    <Link to="/phones" className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-block">
                        Browse Phones
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
            <div className="container-custom py-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white transition-colors duration-300">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-md p-6 transition-colors duration-300">
                                <div className="flex gap-6">
                                    {/* Image */}
                                    <Link to={`/phones/${item.id}`} className="flex-shrink-0">
                                        <img
                                            src={item.images[0]}
                                            alt={item.name}
                                            className="w-24 h-24 object-cover rounded-lg"
                                        />
                                    </Link>

                                    {/* Details */}
                                    <div className="flex-grow">
                                        <Link to={`/phones/${item.id}`}>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 mb-1 transition-colors duration-300">
                                                {item.name}
                                            </h3>
                                        </Link>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-300">{item.brand}</p>
                                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                                            <span>{item.storage}</span>
                                            {item.battery && <span>• {item.battery}</span>}
                                            <span className={`badge ${item.condition === 'Like New' ? 'badge-success' :
                                                    item.condition === 'Excellent' ? 'badge-info' :
                                                        'badge-warning'
                                                }`}>
                                                {item.condition}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Price & Actions */}
                                    <div className="flex flex-col items-end justify-between">
                                        <p className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                        </p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white flex items-center justify-center font-bold transition-colors duration-300"
                                            >
                                                -
                                            </button>
                                            <span className="font-semibold w-8 text-center text-gray-900 dark:text-white transition-colors duration-300">{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white flex items-center justify-center font-bold transition-colors duration-300"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-semibold transition-colors duration-300"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-md p-6 sticky top-24 transition-colors duration-300">
                            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600 dark:text-gray-400 transition-colors duration-300">
                                    <span>Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                                    <span>₹{total.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 transition-colors duration-300">
                                    <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white transition-colors duration-300">
                                        <span>Total</span>
                                        <span>₹{total.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            </div>

                            <Link to="/checkout" className="block">
                                <button className="w-full bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                    Proceed to Checkout
                                </button>
                            </Link>

                            <Link to="/phones" className="block mt-4">
                                <button className="w-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-gray-800 dark:border-gray-200 text-gray-900 dark:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5">
                                    Continue Shopping
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
