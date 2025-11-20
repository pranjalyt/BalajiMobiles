import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCart, getCartTotal, clearCart } from '../utils/cartUtils'
import { generateWhatsAppLink, openWhatsApp } from '../utils/whatsappUtils'

export default function Checkout() {
    const [cartItems, setCartItems] = useState([])
    const [customerName, setCustomerName] = useState('')
    const [customerPhone, setCustomerPhone] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const items = getCart()
        if (items.length === 0) {
            navigate('/cart')
        }
        setCartItems(items)
    }, [navigate])

    const validateForm = () => {
        const newErrors = {}

        if (!customerName.trim()) {
            newErrors.name = 'Name is required'
        } else if (customerName.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters'
        }

        if (!customerPhone.trim()) {
            newErrors.phone = 'Phone number is required'
        } else if (!/^[6-9]\d{9}$/.test(customerPhone.trim())) {
            newErrors.phone = 'Please enter a valid 10-digit Indian mobile number'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleCheckout = (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        // Generate WhatsApp link
        const whatsappUrl = generateWhatsAppLink(
            cartItems,
            customerName.trim(),
            customerPhone.trim()
        )

        // Clear cart
        clearCart()

        // Open WhatsApp
        openWhatsApp(whatsappUrl)

        // Redirect to success page or home
        setTimeout(() => {
            navigate('/')
        }, 1000)
    }

    const total = getCartTotal()

    return (
        <div className="min-h-screen bg-black transition-colors duration-300">
            <div className="container-custom py-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white transition-colors duration-300">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-900 rounded-2xl shadow-md p-6 md:p-8 transition-colors duration-300">
                            <h2 className="text-2xl font-bold mb-6 text-white transition-colors duration-300">Customer Details</h2>

                            <form onSubmit={handleCheckout} className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block font-semibold mb-2 text-white transition-colors duration-300">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        className={`input-field ${errors.name ? 'border-red-500 dark:border-red-500' : ''}`}
                                        placeholder="Enter your full name"
                                    />
                                    {errors.name && (
                                        <p className="text-red-400 text-sm mt-1 transition-colors duration-300">{errors.name}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block font-semibold mb-2 text-white transition-colors duration-300">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={customerPhone}
                                        onChange={(e) => setCustomerPhone(e.target.value)}
                                        className={`input-field ${errors.phone ? 'border-red-500 dark:border-red-500' : ''}`}
                                        placeholder="10-digit mobile number"
                                        maxLength={10}
                                    />
                                    {errors.phone && (
                                        <p className="text-red-400 text-sm mt-1 transition-colors duration-300">{errors.phone}</p>
                                    )}
                                </div>

                                {/* Info Box */}
                                <div className="bg-slate-800 border-2 border-slate-700 rounded-xl p-4 transition-colors duration-300">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-6 h-6 text-gray-300 flex-shrink-0 mt-0.5 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <h4 className="font-semibold text-white mb-1 transition-colors duration-300">WhatsApp Checkout</h4>
                                            <p className="text-sm text-gray-300 transition-colors duration-300">
                                                When you click "Checkout on WhatsApp", we'll open WhatsApp with your order details pre-filled.
                                                You can then send it directly to our team to complete your purchase.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-white text-black hover:bg-gray-100 font-semibold flex items-center justify-center gap-2 text-lg py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Checkout on WhatsApp
                                </button>

                            </form>

                            {/* Contact Button */}
                            <button
                                type="button"
                                onClick={() => window.open('https://wa.me/917906829339', '_blank', 'noopener,noreferrer')}
                                className="w-full bg-gray-900 border-2 border-white text-white hover:bg-gray-800 font-semibold flex items-center justify-center gap-2 text-lg py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-4"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Contact: +91 79068 29339
                            </button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-900 rounded-2xl shadow-md p-6 sticky top-24 transition-colors duration-300">
                            <h2 className="text-xl font-bold mb-6 text-white transition-colors duration-300">Order Summary</h2>

                            {/* Items */}
                            <div className="space-y-4 mb-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        <img
                                            src={item.images[0]}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div className="flex-grow">
                                            <h4 className="font-semibold text-sm line-clamp-1 text-white transition-colors duration-300">{item.name}</h4>
                                            <p className="text-xs text-gray-400 transition-colors duration-300">Qty: {item.quantity}</p>
                                            <p className="text-sm font-bold text-white transition-colors duration-300">
                                                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Total */}
                            <div className="border-t border-gray-700 pt-4 transition-colors duration-300">
                                <div className="flex justify-between text-lg font-bold mb-2 text-white transition-colors duration-300">
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString('en-IN')}</span>
                                </div>
                                <p className="text-xs text-gray-400 transition-colors duration-300">
                                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)} item(s)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
