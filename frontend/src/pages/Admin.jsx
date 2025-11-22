import { Link } from 'react-router-dom'

export default function Admin() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
                    <p className="text-gray-600">Manage your phone inventory</p>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
                    <div className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h3 className="font-semibold text-blue-900 mb-2">Data Source: Google Sheets</h3>
                            <p className="text-sm text-blue-800 mb-3">
                                This website now uses Google Sheets as its data source. To add, edit, or remove phones,
                                you need to update the Google Sheet directly.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 mb-6">
                    <h2 className="font-bold text-lg text-gray-900">How to Manage Phones:</h2>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <span className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                            Open Your Google Sheet
                        </h3>
                        <p className="text-sm text-gray-700 ml-8">
                            Navigate to your Google Sheets document that contains the phone inventory.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <span className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                            Edit the "Phones" Sheet
                        </h3>
                        <p className="text-sm text-gray-700 ml-8 mb-2">
                            Make sure your sheet has the following columns:
                        </p>
                        <ul className="text-sm text-gray-600 ml-8 space-y-1">
                            <li>• <strong>id</strong> - Unique identifier</li>
                            <li>• <strong>name</strong> - Phone model name</li>
                            <li>• <strong>brand</strong> - Brand (iPhone, Samsung, etc.)</li>
                            <li>• <strong>price</strong> - Price in rupees (number)</li>
                            <li>• <strong>condition</strong> - Condition (Good, Excellent, Like New)</li>
                            <li>• <strong>storage</strong> - Storage capacity (e.g., 128GB)</li>
                            <li>• <strong>battery</strong> - Battery health (e.g., 89%)</li>
                            <li>• <strong>description</strong> - Product description</li>
                            <li>• <strong>images</strong> - Comma-separated image URLs</li>
                            <li>• <strong>available</strong> - true/false or yes/no</li>
                            <li>• <strong>is_deal</strong> - true/false (for Today's Deals)</li>
                            <li>• <strong>created_at</strong> - Date added (optional)</li>
                        </ul>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <span className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                            Save and Refresh
                        </h3>
                        <p className="text-sm text-gray-700 ml-8">
                            After making changes, save the sheet. The website will fetch the latest data automatically
                            when pages are loaded or refreshed.
                        </p>
                    </div>
                </div>

                <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                            <h4 className="font-semibold text-amber-900 text-sm mb-1">Important Notes</h4>
                            <ul className="text-xs text-amber-800 space-y-1">
                                <li>• Make sure the sheet is named exactly "Phones"</li>
                                <li>• The first row must contain column headers</li>
                                <li>• Image URLs must be publicly accessible</li>
                                <li>• Changes may take a few seconds to appear on the website</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Link to="/" className="flex-1">
                        <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                            Back to Home
                        </button>
                    </Link>
                    <Link to="/phones" className="flex-1">
                        <button className="w-full bg-white hover:bg-gray-50 border-2 border-gray-800 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                            View Phones
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
