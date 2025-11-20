import { Link } from 'react-router-dom'

export default function DealBanner({ title, subtitle, buttonText, buttonLink }) {
    return (
        <div className="glass-effect rounded-2xl p-8 md:p-12 h-full flex flex-col justify-center border border-gray-200/50 dark:border-gray-800 shadow-xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-500 dark:text-amber-400 mb-4 transition-colors duration-300">
                {title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6 transition-colors duration-300">
                {subtitle}
            </p>
            <Link
                to={buttonLink}
                className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-fit"
            >
                {buttonText}
            </Link>
        </div>
    )
}

