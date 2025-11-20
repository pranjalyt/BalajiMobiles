import { Link } from 'react-router-dom'

export default function Footer() {
    const adminWhatsApp = import.meta.env.VITE_ADMIN_WHATSAPP || '917906829339'

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container-custom section-padding">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <img 
                                src="/media/blogo.png" 
                                alt="Balaji Enterprises Logo" 
                                className="h-10 w-auto"
                            />
                            <span className="text-xl font-bold text-white">Balaji Enterprises</span>
                        </div>
                        <p className="text-sm">
                            Your trusted destination for certified used mobile phones with warranty and quality assurance.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="hover:text-primary-400 transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link to="/phones" className="hover:text-primary-400 transition-colors">All Phones</Link>
                            </li>
                            <li>
                                <Link to="/cart" className="hover:text-primary-400 transition-colors">Cart</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start space-x-2">
                                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Balaji Enterprises Dharamveer Market, Badarpur Extension, Tajpur, Badarpur, New Delhi, Delhi</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href={`https://wa.me/${adminWhatsApp}`} className="hover:text-primary-400 transition-colors">
                                    +91 79068 29339
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Trust Badges */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Why Choose Us</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Warranty Included</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Original Parts</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>32-Point Check</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Balaji Enterprises. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
