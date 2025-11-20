import { useState } from 'react'

const faqs = [
    {
        question: "Are your phones original?",
        answer: "Yes. Every device we sell is 100% original — no clones, replicas, or fake parts. If any part has ever been replaced, we mention it clearly."
    },
    {
        question: "What condition are the phones in?",
        answer: "All phones are certified pre-owned and graded after full inspection. You see the exact real images of the device you're buying."
    },
    {
        question: "Do you check the phones before selling?",
        answer: "Yes. Every device passes our 32-point quality check, including battery health, display & touch, cameras, speaker/mic, sensors, Face ID/Fingerprint, network/WiFi, and full physical inspection."
    },
    {
        question: "What warranty do you provide?",
        answer: "We offer a 1 month functional warranty. If something doesn't work as expected, we fix or replace it."
    },
    {
        question: "Are the images real?",
        answer: "Always. We upload real, in-house photos of each device. No stock images or misleading angles."
    },
    {
        question: "What accessories are included?",
        answer: "Typically you receive: charging cable, adapter (if available), sanitized device, and box (If available)."
    },
    {
        question: "Can I return the phone?",
        answer: "Yes — returns are accepted for functional issues within 1 month. For change-of-mind cases, exchanges may be available."
    },
    {
        question: "Do you offer COD?",
        answer: "Yes, Cash on Delivery is available in selected locations."
    },
    {
        question: "How long does delivery take?",
        answer: "Orders ship within 24 hours, with tracking sent via WhatsApp/SMS."
    },
    {
        question: "Can I collect the phone from your store?",
        answer: "Yes — we offer in-store pickup so you can inspect the device before paying."
    },
    {
        question: "Do you buy used phones?",
        answer: "Yes, we offer instant valuations via WhatsApp."
    },
    {
        question: "Are prices negotiable?",
        answer: "Prices are already competitive; bulk buyers may get additional benefits."
    },
    {
        question: "What payment methods do you accept?",
        answer: "UPI, Cards, Wallets, Net Banking, and COD (specific areas)."
    },
    {
        question: "Any hidden charges?",
        answer: "No hidden fees. The listed price is final."
    },
    {
        question: "Do you sell refurbished phones?",
        answer: "We sell certified pre-owned phones — tested, graded, and verified."
    },
    {
        question: "How do I place an order?",
        answer: "Add a phone to your cart, select Checkout on WhatsApp, and our executive will contact you ASAP to confirm and arrange delivery."
    }
]

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null)

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="py-16 bg-black transition-colors duration-300">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-amber-500 dark:text-amber-400 mb-4 transition-colors duration-300">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-400 transition-colors duration-300">
                        Everything you need to know about buying from us
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none transition-colors duration-300"
                            >
                                <span className="text-lg font-semibold text-white pr-8 transition-colors duration-300">
                                    {faq.question}
                                </span>
                                <svg
                                    className={`w-5 h-5 text-white flex-shrink-0 transition-transform duration-300 ${
                                        openIndex === index ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className="px-6 pb-4">
                                    <p className="text-gray-300 leading-relaxed transition-colors duration-300">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

