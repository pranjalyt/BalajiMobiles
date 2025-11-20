import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Listing from './pages/Listing'
import PhoneDetail from './pages/PhoneDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
// import Admin from './pages/Admin' // Disabled for now

function App() {
    return (
        <ThemeProvider>
            <Router>
                <ScrollToTop />
                <div className="flex flex-col min-h-screen bg-white dark:bg-black transition-colors duration-300">
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/phones" element={<Listing />} />
                            <Route path="/phones/:id" element={<PhoneDetail />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            {/* <Route path="/admin" element={<Admin />} /> Disabled for now */}
                        </Routes>
                    </main>
                    <Footer />
                    <FloatingWhatsApp />
                </div>
            </Router>
        </ThemeProvider>
    )
}

export default App
