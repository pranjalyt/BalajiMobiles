import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authHelpers } from '../services/supabase'
import { phoneAPI } from '../services/api'
import { uploadMultipleImages, validateImageFile } from '../utils/cloudinaryUtils'

export default function Admin() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [phones, setPhones] = useState([])
    const [showAddForm, setShowAddForm] = useState(false)
    const [editingPhone, setEditingPhone] = useState(null)
    const navigate = useNavigate()

    // Login form
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')

    // Phone form
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        price: '',
        condition: 'Good',
        description: '',
        storage: '',
        battery: '',
        images: [],
    })
    const [imageFiles, setImageFiles] = useState([])
    const [uploading, setUploading] = useState(false)
    const [formError, setFormError] = useState('')

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            const currentUser = await authHelpers.getCurrentUser()
            if (currentUser) {
                setUser(currentUser)
                fetchPhones()
            }
        } catch (error) {
            console.error('Not authenticated:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchPhones = async () => {
        try {
            const data = await phoneAPI.getAllPhones({ availableOnly: false })
            setPhones(data)
        } catch (error) {
            console.error('Error fetching phones:', error)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoginError('')

        try {
            await authHelpers.signIn(email, password)
            const currentUser = await authHelpers.getCurrentUser()
            setUser(currentUser)
            fetchPhones()
        } catch (error) {
            setLoginError(error.message || 'Login failed')
        }
    }

    const handleLogout = async () => {
        try {
            await authHelpers.signOut()
            setUser(null)
            navigate('/')
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files)

        try {
            files.forEach(file => validateImageFile(file))
            setImageFiles(files)
            setFormError('')
        } catch (error) {
            setFormError(error.message)
            e.target.value = ''
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError('')
        setUploading(true)

        try {
            // Upload images
            let imageUrls = formData.images
            if (imageFiles.length > 0) {
                imageUrls = await uploadMultipleImages(imageFiles)
            }

            const phoneData = {
                ...formData,
                price: parseInt(formData.price),
                images: imageUrls,
            }

            if (editingPhone) {
                await phoneAPI.updatePhone(editingPhone.id, phoneData)
            } else {
                await phoneAPI.createPhone(phoneData)
            }

            // Reset form
            setFormData({
                name: '',
                brand: '',
                price: '',
                condition: 'Good',
                description: '',
                storage: '',
                battery: '',
                images: [],
            })
            setImageFiles([])
            setShowAddForm(false)
            setEditingPhone(null)
            fetchPhones()
        } catch (error) {
            setFormError(error.message || 'Failed to save phone')
        } finally {
            setUploading(false)
        }
    }

    const handleEdit = (phone) => {
        setEditingPhone(phone)
        setFormData({
            name: phone.name,
            brand: phone.brand,
            price: phone.price.toString(),
            condition: phone.condition,
            description: phone.description,
            storage: phone.storage,
            battery: phone.battery || '',
            images: phone.images,
        })
        setShowAddForm(true)
    }

    const handleMarkAsSold = async (id) => {
        if (window.confirm('Mark this phone as sold?')) {
            try {
                await phoneAPI.markAsSold(id)
                fetchPhones()
            } catch (error) {
                alert('Failed to mark as sold')
            }
        }
    }

    // Login Screen
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

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                    <h1 className="text-3xl font-bold text-center mb-8">Admin Login</h1>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>

                        {loginError && (
                            <p className="text-red-600 text-sm">{loginError}</p>
                        )}

                        <button type="submit" className="w-full btn-primary">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    // Admin Dashboard
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container-custom py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <p className="text-gray-600">Welcome, {user.email}</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => {
                                setShowAddForm(!showAddForm)
                                setEditingPhone(null)
                                setFormData({
                                    name: '',
                                    brand: '',
                                    price: '',
                                    condition: 'Good',
                                    description: '',
                                    storage: '',
                                    battery: '',
                                    images: [],
                                })
                            }}
                            className="btn-primary"
                        >
                            {showAddForm ? 'Cancel' : 'Add New Phone'}
                        </button>
                        <button onClick={handleLogout} className="btn-secondary">
                            Logout
                        </button>
                    </div>
                </div>

                {/* Add/Edit Form */}
                {showAddForm && (
                    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-6">
                            {editingPhone ? 'Edit Phone' : 'Add New Phone'}
                        </h2>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-semibold mb-2">Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="input-field"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-2">Brand *</label>
                                <select
                                    value={formData.brand}
                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                    className="input-field"
                                    required
                                >
                                    <option value="">Select Brand</option>
                                    <option value="iPhone">iPhone</option>
                                    <option value="Samsung">Samsung</option>
                                    <option value="OnePlus">OnePlus</option>
                                    <option value="Vivo">Vivo</option>
                                    <option value="Oppo">Oppo</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-semibold mb-2">Price (₹) *</label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="input-field"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-2">Condition *</label>
                                <select
                                    value={formData.condition}
                                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                                    className="input-field"
                                    required
                                >
                                    <option value="Good">Good</option>
                                    <option value="Like New">Like New</option>
                                    <option value="Excellent">Excellent</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-semibold mb-2">Storage *</label>
                                <input
                                    type="text"
                                    value={formData.storage}
                                    onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                                    className="input-field"
                                    placeholder="e.g., 128GB"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-2">Battery Health</label>
                                <input
                                    type="text"
                                    value={formData.battery}
                                    onChange={(e) => setFormData({ ...formData, battery: e.target.value })}
                                    className="input-field"
                                    placeholder="e.g., 89%"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block font-semibold mb-2">Description *</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="input-field"
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block font-semibold mb-2">Images (1-6) *</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageSelect}
                                    className="input-field"
                                />
                                <p className="text-sm text-gray-600 mt-1">
                                    {editingPhone ? 'Leave empty to keep existing images' : 'Select 1-6 images'}
                                </p>
                            </div>

                            {formError && (
                                <div className="md:col-span-2">
                                    <p className="text-red-600">{formError}</p>
                                </div>
                            )}

                            <div className="md:col-span-2">
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="btn-primary w-full"
                                >
                                    {uploading ? 'Uploading...' : editingPhone ? 'Update Phone' : 'Add Phone'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Phones Table */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Image</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Brand</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {phones.map((phone) => (
                                    <tr key={phone.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <img
                                                src={phone.images[0]}
                                                alt={phone.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                        </td>
                                        <td className="px-6 py-4 font-semibold">{phone.name}</td>
                                        <td className="px-6 py-4">{phone.brand}</td>
                                        <td className="px-6 py-4">₹{phone.price.toLocaleString('en-IN')}</td>
                                        <td className="px-6 py-4">
                                            <span className={`badge ${phone.available ? 'badge-success' : 'bg-gray-200 text-gray-700'}`}>
                                                {phone.available ? 'Available' : 'Sold'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(phone)}
                                                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                                                >
                                                    Edit
                                                </button>
                                                {phone.available && (
                                                    <button
                                                        onClick={() => handleMarkAsSold(phone.id)}
                                                        className="text-red-600 hover:text-red-700 font-semibold text-sm"
                                                    >
                                                        Mark Sold
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
