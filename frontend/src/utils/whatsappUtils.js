/**
 * Generate WhatsApp checkout link
 * @param {Array} cartItems - Array of cart items
 * @param {string} customerName - Customer name
 * @param {string} customerPhone - Customer phone number
 * @returns {string} WhatsApp URL with pre-filled message
 */
export const generateWhatsAppLink = (cartItems, customerName, customerPhone) => {
    // Use environment variable with safe fallback for local development
    const adminWhatsApp = import.meta.env.VITE_ADMIN_WHATSAPP || (import.meta.env.DEV ? '917906829339' : '')

    // Build message
    let message = `Hi, I'm interested in buying:\n\n`

    // Add each item
    cartItems.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`
        message += `   Price: ₹${item.price.toLocaleString('en-IN')}\n`
        message += `   Quantity: ${item.quantity}\n`
        message += `   Subtotal: ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n\n`
    })

    // Add total
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    message += `*Total: ₹${total.toLocaleString('en-IN')}*\n\n`

    // Add customer details
    message += `Customer Details:\n`
    message += `Name: ${customerName}\n`
    message += `Phone: ${customerPhone}`

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message)

    // Return WhatsApp URL
    return `https://wa.me/${adminWhatsApp}?text=${encodedMessage}`
}

/**
 * Format price in Indian Rupees
 * @param {number} price - Price to format
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`
}

/**
 * Open WhatsApp link
 * @param {string} url - WhatsApp URL
 */
export const openWhatsApp = (url) => {
    window.open(url, '_blank')
}
