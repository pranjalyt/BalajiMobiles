import { Link } from 'react-router-dom'

export default function CategoryCard({ brand, name, onClick }) {
    // Use 'name' prop if provided, otherwise use 'brand' prop
    const brandName = name || brand
    
    // Map brand names to logo file paths
    const brandLogos = {
        iPhone: '/media/brand-logos/apple.png',
        Apple: '/media/brand-logos/apple.png',
        Samsung: '/media/brand-logos/samsung.png',
        OnePlus: '/media/brand-logos/oneplus.png',
        Vivo: '/media/brand-logos/vivo.png',
        Oppo: '/media/brand-logos/oppo.png',
        Mi: '/media/brand-logos/mi.png',
    }

    const logoPath = brandLogos[brandName] || '/media/brand-logos/default.png'

    // Determine the link URL - if brand name, filter by brand, otherwise just go to phones
    const linkUrl = brandName === 'Others' ? '/phones' : `/phones?brand=${encodeURIComponent(brandName)}`

    // If it's "Others", show plus icon
    if (brandName === 'Others') {
        return (
            <Link
                to={linkUrl}
                className="card-hover p-6 text-center group cursor-pointer bg-white dark:bg-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden block"
            >
                <div className="mb-4 transform group-hover:scale-110 transition-transform flex justify-center">
                    <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-300 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-600 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-900 group-hover:text-gray-700 dark:group-hover:text-gray-800 transition-colors duration-300">
                    {brandName}
                </h3>
            </Link>
        )
    }

    // For all brands, navigate to phones page with brand filter
    return (
        <Link
            to={linkUrl}
            className="card-hover p-6 text-center group cursor-pointer bg-white dark:bg-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden block"
        >
            <div className="mb-4 transform group-hover:scale-110 transition-transform flex justify-center">
                <img 
                    src={logoPath} 
                    alt={`${brandName} logo`}
                    className="h-16 w-16 object-contain"
                    onError={(e) => {
                        // Fallback to a placeholder if image doesn't exist
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'block'
                    }}
                />
                <span className="text-4xl hidden">📱</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-900 group-hover:text-gray-700 dark:group-hover:text-gray-800 transition-colors duration-300">
                {brandName}
            </h3>
        </Link>
    )
}
