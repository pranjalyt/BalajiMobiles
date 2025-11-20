// Cart utilities using localStorage

const CART_KEY = 'balaji_mobiles_cart'

/**
 * Get cart items from localStorage
 * @returns {Array} Array of cart items
 */
export const getCart = () => {
    try {
        const cart = localStorage.getItem(CART_KEY)
        return cart ? JSON.parse(cart) : []
    } catch (error) {
        console.error('Error reading cart:', error)
        return []
    }
}

/**
 * Save cart to localStorage
 * @param {Array} cart - Cart items array
 */
const saveCart = (cart) => {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart))
        // Dispatch custom event for cart updates
        window.dispatchEvent(new Event('cartUpdated'))
    } catch (error) {
        console.error('Error saving cart:', error)
    }
}

/**
 * Add item to cart
 * @param {Object} phone - Phone object to add
 * @returns {Array} Updated cart
 */
export const addToCart = (phone) => {
    const cart = getCart()

    // Check if item already exists
    const existingItemIndex = cart.findIndex(item => item.id === phone.id)

    if (existingItemIndex > -1) {
        // Increment quantity
        cart[existingItemIndex].quantity += 1
    } else {
        // Add new item with quantity 1
        cart.push({
            ...phone,
            quantity: 1,
            addedAt: new Date().toISOString()
        })
    }

    saveCart(cart)
    return cart
}

/**
 * Remove item from cart
 * @param {string} phoneId - ID of phone to remove
 * @returns {Array} Updated cart
 */
export const removeFromCart = (phoneId) => {
    const cart = getCart()
    const updatedCart = cart.filter(item => item.id !== phoneId)
    saveCart(updatedCart)
    return updatedCart
}

/**
 * Update item quantity
 * @param {string} phoneId - ID of phone
 * @param {number} quantity - New quantity
 * @returns {Array} Updated cart
 */
export const updateQuantity = (phoneId, quantity) => {
    const cart = getCart()

    if (quantity <= 0) {
        return removeFromCart(phoneId)
    }

    const itemIndex = cart.findIndex(item => item.id === phoneId)

    if (itemIndex > -1) {
        cart[itemIndex].quantity = quantity
        saveCart(cart)
    }

    return cart
}

/**
 * Clear entire cart
 * @returns {Array} Empty cart
 */
export const clearCart = () => {
    saveCart([])
    return []
}

/**
 * Get cart item count
 * @returns {number} Total number of items in cart
 */
export const getCartCount = () => {
    const cart = getCart()
    return cart.reduce((total, item) => total + item.quantity, 0)
}

/**
 * Get cart total price
 * @returns {number} Total price of all items
 */
export const getCartTotal = () => {
    const cart = getCart()
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
}

/**
 * Check if item is in cart
 * @param {string} phoneId - ID of phone
 * @returns {boolean} True if item is in cart
 */
export const isInCart = (phoneId) => {
    const cart = getCart()
    return cart.some(item => item.id === phoneId)
}
