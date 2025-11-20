import axios from 'axios'

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

/**
 * Upload image to Cloudinary
 * @param {File} file - Image file to upload
 * @returns {Promise<string>} Secure URL of uploaded image
 */
export const uploadImage = async (file) => {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
        throw new Error('Cloudinary configuration missing. Please set up environment variables.')
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
        )

        return response.data.secure_url
    } catch (error) {
        console.error('Error uploading image:', error)
        throw new Error('Failed to upload image. Please try again.')
    }
}

/**
 * Upload multiple images to Cloudinary
 * @param {FileList|Array} files - Array of image files
 * @returns {Promise<Array<string>>} Array of secure URLs
 */
export const uploadMultipleImages = async (files) => {
    const uploadPromises = Array.from(files).map(file => uploadImage(file))
    return Promise.all(uploadPromises)
}

/**
 * Validate image file
 * @param {File} file - File to validate
 * @returns {boolean} True if valid
 */
export const validateImageFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!validTypes.includes(file.type)) {
        throw new Error('Invalid file type. Please upload JPEG, PNG, or WebP images.')
    }

    if (file.size > maxSize) {
        throw new Error('File too large. Maximum size is 5MB.')
    }

    return true
}
