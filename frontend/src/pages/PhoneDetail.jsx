import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { phoneAPI } from '../services/api'
import { addToCart, isInCart } from '../utils/cartUtils'

export default function PhoneDetail() {
    const { id } = useParams()
    const [phone, setPhone] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState(0)
    const [inCart, setInCart] = useState(false)

    useEffect(() => {
        fetchPhone()
    }, [id])

    useEffect(() => {
        if (phone) {
            setInCart(isInCart(phone.id))

            const handleCartUpdate = () => {
                setInCart(isInCart(phone.id))
            }

            window.addEventListener('cartUpdated', handleCartUpdate)
            return () => window.removeEventListener('cartUpdated', handleCartUpdate)
        }
    }, [phone])

    const fetchPhone = async () => {
        try {
            const data = await phoneAPI.getPhoneById(id)
            setPhone(data)
        } catch (error) {
            console.error('Error fetching phone:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddToCart = () => {
        if (phone) {
            addToCart(phone)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    if (!phone) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Phone not found</h2>
                    <Link to="/phones" className="btn-primary">
                        Back to Phones
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container-custom py-8">
                {/* Breadcrumb */}
                <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
                    <Link to="/" className="hover:text-primary-600">Home</Link>
                    <span>/</span>
                    <Link to="/phones" className="hover:text-primary-600">Phones</Link>
                    <span>/</span>
                    <span className="text-gray-900">{phone.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Gallery */}
                    <div>
                        {/* Main Image */}
                        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-4">
                            <div className="aspect-square">
                                <img
                                    src={phone.images[selectedImage]}
                                    alt={phone.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Thumbnails */}
                        {phone.images.length > 1 && (
                            <div className="grid grid-cols-6 gap-2">
                                {phone.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                                ? 'border-primary-600 ring-2 ring-primary-200'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${phone.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div>
                        {/* Brand */}
                        <p className="text-primary-600 font-semibold mb-2">{phone.brand}</p>

                        {/* Name */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {phone.name}
                        </h1>

                        {/* Condition Badge */}
                        <div className="mb-6">
                            <span className={`badge ${phone.condition === 'Like New' ? 'badge-success' :
                                    phone.condition === 'Excellent' ? 'badge-info' :
                                        'badge-warning'
                                }`}>
                                {phone.condition} Condition
                            </span>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <p className="text-4xl font-bold text-gray-900">
                                ₹{phone.price.toLocaleString('en-IN')}
                            </p>
                        </div>

                        {/* Specs */}
                        <div className="bg-gray-50 rounded-xl p-6 mb-6">
                            <h3 className="font-bold text-lg mb-4">Specifications</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Storage</span>
                                    <span className="font-semibold">{phone.storage}</span>
                                </div>
                                {phone.battery && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Battery Health</span>
                                        <span className="font-semibold">{phone.battery}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Condition</span>
                                    <span className="font-semibold">{phone.condition}</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h3 className="font-bold text-lg mb-3">Description</h3>
                            <p className="text-gray-700 leading-relaxed">{phone.description}</p>
                        </div>

                        {/* Warranty */}
                        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
                            <div className="flex items-start gap-3">
                                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <div>
                                    <h4 className="font-semibold text-green-900 mb-1">Warranty Included</h4>
                                    <p className="text-sm text-green-700">
                                        This phone comes with warranty coverage for your peace of mind.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={inCart}
                            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${inCart
                                    ? 'bg-green-100 text-green-700 cursor-default'
                                    : 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl'
                                }`}
                        >
                            {inCart ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Added to Cart
                                </span>
                            ) : (
                                'Add to Cart'
                            )}
                        </button>

                        {inCart && (
                            <Link to="/cart" className="block mt-4">
                                <button className="w-full btn-secondary">
                                    View Cart
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
