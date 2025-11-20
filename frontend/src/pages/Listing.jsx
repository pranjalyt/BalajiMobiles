import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { phoneAPI } from '../services/api'
import PhoneCard from '../components/PhoneCard'

export default function Listing() {
    const [phones, setPhones] = useState([])
    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()

    // Filters
    const [brand, setBrand] = useState(searchParams.get('brand') || '')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [sortBy, setSortBy] = useState('newest')

    useEffect(() => {
        fetchBrands()
        fetchPhones()
    }, [brand, minPrice, maxPrice, sortBy])

    const fetchBrands = async () => {
        try {
            const data = await phoneAPI.getAllBrands(true)
            setBrands(data)
        } catch (error) {
            console.error('Error fetching brands:', error)
            // Fallback to static brands if API fails
            setBrands(['iPhone', 'Samsung', 'OnePlus', 'Vivo', 'Oppo'])
        }
    }

    // Update URL when brand changes
    useEffect(() => {
        if (brand) {
            setSearchParams({ brand })
        } else {
            setSearchParams({})
        }
    }, [brand, setSearchParams])

    const fetchPhones = async () => {
        setLoading(true)
        try {
            const filters = {
                availableOnly: true,
                brand: brand || undefined,
                minPrice: minPrice ? parseInt(minPrice) : undefined,
                maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
            }

            let data = await phoneAPI.getAllPhones(filters)

            // Client-side sorting
            if (sortBy === 'price_asc') {
                data.sort((a, b) => a.price - b.price)
            } else if (sortBy === 'price_desc') {
                data.sort((a, b) => b.price - a.price)
            }
            // Default is newest (backend handles this usually, but we can ensure it)

            setPhones(data)
        } catch (error) {
            console.error('Error fetching phones:', error)
        } finally {
            setLoading(false)
        }
    }

    const clearFilters = () => {
        setBrand('')
        setMinPrice('')
        setMaxPrice('')
        setSortBy('newest')
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black py-8 transition-colors duration-300">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-sm p-6 sticky top-24 transition-colors duration-300">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="font-bold text-lg text-gray-900 dark:text-white transition-colors duration-300">Filters</h2>
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 hover:underline"
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Brand Filter */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3 text-gray-900 dark:text-white transition-colors duration-300">Brand</h3>
                                <div className="space-y-2">
                                    {brands.length > 0 ? (
                                        brands.map((b) => (
                                            <label key={b} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="brand"
                                                    checked={brand === b}
                                                    onChange={() => setBrand(b)}
                                                    className="text-gray-900 dark:text-white focus:ring-gray-500"
                                                />
                                                <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">{b}</span>
                                            </label>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Loading brands...</p>
                                    )}
                                </div>
                            </div>

                            {/* Price Filter */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3 text-gray-900 dark:text-white transition-colors duration-300">Price Range</h3>
                                <div className="space-y-3">
                                    <input
                                        type="number"
                                        placeholder="Min Price"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        className="input-field text-sm"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max Price"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        className="input-field text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-grow">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                                {brand ? `${brand} Phones` : 'All Phones'}
                                <span className="text-gray-500 dark:text-gray-400 text-lg font-normal ml-2 transition-colors duration-300">
                                    ({phones.length})
                                </span>
                            </h1>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="input-field w-full sm:w-auto"
                            >
                                <option value="newest">Newest Arrivals</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                            </select>
                        </div>

                        {/* Grid */}
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((n) => (
                                    <div key={n} className="animate-pulse">
                                        <div className="bg-gray-200 dark:bg-gray-800 h-64 rounded-2xl mb-4 transition-colors duration-300"></div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2 transition-colors duration-300"></div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 transition-colors duration-300"></div>
                                    </div>
                                ))}
                            </div>
                        ) : phones.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {phones.map((phone) => (
                                    <PhoneCard key={phone.id} phone={phone} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-sm transition-colors duration-300">
                                <div className="text-6xl mb-4">📱</div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white transition-colors duration-300">No phones found</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-6 transition-colors duration-300">Try adjusting your filters to see more results.</p>
                                <button onClick={clearFilters} className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}
