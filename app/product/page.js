"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';  // Changed from 'next/router'
import { Button } from "@/components/ui/button"
import Navbar from '@/components/elements/Navbar';
import product1 from '../../assets/1.jpg';
import { Minus, Plus } from 'lucide-react';
import visa from '../../assets/visa.svg';  // You'll need to add these images
import mastercard from '../../assets/mastercard.svg';
import rupay from '../../assets/upi-id.png';
import razorpay from '../../assets/paypal.svg';
import logo from '../just_logo.png'
import Product from './product';
import AwardsSection from '@/components/sections/AwardsSection';


const PAYMENT_IMAGES = {
    visa: "../assets/visa.svg",
    mastercard: "../assets/mastercard.svg",
    rupay: "../assets/amex.svg",
    razorpay: "https://razorpay.com/assets/razorpay-glyph.svg",
    secure: "https://cdn-icons-png.flaticon.com/512/6195/6195702.png",
    pci: "https://cdn-icons-png.flaticon.com/512/6107/6107137.png",
    ssl: "https://cdn-icons-png.flaticon.com/512/7947/7947657.png"
};

const COUNTRY_CURRENCY_MAP = {
    'India': { currency: 'INR', symbol: '₹', rate: 1 },
    'United States': { currency: 'USD', symbol: '$', rate: 0.012 },
    'United Kingdom': { currency: 'GBP', symbol: '£', rate: 0.0097 },
    // ...add more countries as needed
};

const RAZORPAY_KEY = 'rzp_live_tGJjXr7rvi6keg'; // Replace with your actual key  rzp_live_tGJjXr7rvi6keg

export default function Checkout() {
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: 'India',
        streetAddress: '',
        apartment: '',
        townCity: '',
        paymentMode: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentCurrency, setCurrentCurrency] = useState(COUNTRY_CURRENCY_MAP['India']);
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [orderNumber, setOrderNumber] = useState(1);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);

    const product = {
        name: "Sampoorna Digestive Health Supplement",
        price: 3999.00,
        description: "A natural supplement for digestive health"
    };

    useEffect(() => {
        // Calculate initial converted amount
        const baseAmount = product.price * quantity;
        const converted = (baseAmount * currentCurrency.rate).toFixed(2);
        setConvertedAmount(converted);
    }, [quantity, currentCurrency, product.price]);

    useEffect(() => {
        const loadRazorpay = async () => {
            try {
                if (window.Razorpay) {
                    setRazorpayLoaded(true);
                    return;
                }

                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.async = true;

                script.onload = () => {
                    setRazorpayLoaded(true);
                };

                script.onerror = () => {
                    console.error('Failed to load Razorpay');
                    setFormErrors(prev => ({
                        ...prev,
                        payment: 'Failed to load payment system. Please try again.'
                    }));
                };

                document.body.appendChild(script);
            } catch (error) {
                console.error('Razorpay loading error:', error);
                setFormErrors(prev => ({
                    ...prev,
                    payment: 'Payment system initialization failed.'
                }));
            }
        };

        loadRazorpay();
    }, []);

    const handleQuantityChange = (action) => {
        if (action === 'increase') {
            setQuantity(prev => prev + 1);
        } else if (action === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'country') {
            setCurrentCurrency(COUNTRY_CURRENCY_MAP[value]);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.firstName) errors.firstName = 'First name is required';
        if (!formData.lastName) errors.lastName = 'Last name is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.phone) errors.phone = 'Phone is required';
        if (!formData.streetAddress) errors.streetAddress = 'Address is required';
        if (!formData.townCity) errors.townCity = 'City is required';
        if (!formData.paymentMode) errors.paymentMode = 'Please select a payment method';
        return errors;
    };

    const handleRazorpayPayment = async () => {
        if (!razorpayLoaded) {
            setFormErrors(prev => ({
                ...prev,
                payment: 'Payment system is still loading. Please try again.'
            }));
            return;
        }

        try {
            const options = {
                key: RAZORPAY_KEY,
                amount: Math.round(convertedAmount * 100),
                currency: currentCurrency.currency,
                name: 'Sampoorna Arogya',
                description: `Order for ${product.name}`,
                prefill: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    contact: formData.phone
                },
                handler: async function (response) {
                    try {
                        const formattedData = {
                            _subject: `New Order #${orderNumber} - Online Payment`,
                            _template: "table",
                            _captcha: "false",
                            orderNumber: orderNumber,
                            orderDate: new Date().toISOString(),
                            customerName: `${formData.firstName} ${formData.lastName}`,
                            email: formData.email,
                            phone: formData.phone,
                            shippingAddress: `${formData.streetAddress}, ${formData.apartment || ''}, ${formData.townCity}, ${formData.country}`,
                            productName: product.name,
                            quantity: quantity,
                            amount: `${currentCurrency.symbol} ${convertedAmount}`,
                            paymentMethod: "Online Payment (Razorpay)",
                            paymentId: response.razorpay_payment_id,
                            orderStatus: "Paid"
                        };

                        // Send order details to your endpoint
                        const formResponse = await fetch('https://formsubmit.co/ajax/israelitesshopping171@gmail.com', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify(formattedData)
                        });

                        if (!formResponse.ok) {
                            throw new Error(`HTTP error! status: ${formResponse.status}`);
                        }

                        const result = await formResponse.json();
                        if (result.success) {
                            setPaymentSuccess(true);
                        } else {
                            throw new Error("Failed to submit order details");
                        }
                    } catch (error) {
                        console.error("Order submission error:", error);
                        setFormErrors(prev => ({
                            ...prev,
                            submit: "Payment successful but failed to send order details. Please contact support."
                        }));
                    } finally {
                        setIsSubmitting(false);
                    }
                },
                modal: {
                    ondismiss: function () {
                        setIsSubmitting(false);
                    }
                }
            };

            const razorpayInstance = new window.Razorpay(options);
            razorpayInstance.open();
        } catch (error) {
            console.error('Razorpay initialization error:', error);
            setFormErrors(prev => ({
                ...prev,
                payment: 'Failed to initialize payment. Please try again.'
            }));
            setIsSubmitting(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsSubmitting(true);
            try {
                if (formData.paymentMode === 'online') {
                    await handleRazorpayPayment();
                } else if (formData.paymentMode === 'cod') {
                    const formattedData = {
                        _subject: `New Order #${orderNumber} - Cash on Delivery`,
                        _template: "table",
                        _captcha: "false",
                        orderNumber: orderNumber,
                        orderDate: new Date().toISOString(),
                        customerName: `${formData.firstName} ${formData.lastName}`,
                        email: formData.email,
                        phone: formData.phone,
                        shippingAddress: `${formData.streetAddress}, ${formData.apartment || ''}, ${formData.townCity}, ${formData.country}`,
                        productName: product.name,
                        quantity: quantity,
                        amount: `${currentCurrency.symbol} ${convertedAmount}`,
                        paymentMethod: "Cash on Delivery",
                        orderStatus: "Pending"
                    };

                    const response = await fetch('https://formsubmit.co/ajax/israelitesshopping171@gmail.com', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(formattedData)
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const result = await response.json();
                    if (result.success) {
                        setPaymentSuccess(true);
                    } else {
                        throw new Error("Failed to submit order details");
                    }
                }
            } catch (error) {
                console.error('Submission error:', error);
                setFormErrors(prev => ({
                    ...prev,
                    submit: error.message || 'Failed to process order. Please try again.'
                }));
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    if (paymentSuccess) {
        return (
            <div className="flex relative bg-white min-h-screen">
                <div className='fixed left-0 top-0 w-1/5 h-screen bg-transparent z-[999]'>
                    <Navbar />
                </div>
                <div className="flex-1 ml-[0%] md:ml-[20%] flex items-center justify-center">
                    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
                        <div className="bg-green-50 rounded-lg p-8 border border-green-200">
                            <h2 className="text-3xl font-bold text-green-600 mb-4">
                                Order Successful!
                            </h2>
                            <p className="text-gray-600 mb-2">
                                Order Number: {orderNumber}
                            </p>
                            <p className="text-gray-600 mb-6">
                                Thank you for your purchase!
                            </p>
                            <Button
                                onClick={() => router.push('/')}
                                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Continue Shopping
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex relative bg-white min-h-screen overflow-hidden">
            <div className='fixed left-0 top-0 w-1/5 h-screen bg-transparent z-[999]'>
                <Navbar />
            </div>
            <div className="flex-1 ml-[0%] md:ml-[20%] overflow-auto">

                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className=" w-full">
                        {/* Product Summary */}
                        <Product />
                        <AwardsSection />
                        {/* Checkout Form */}
                        <form id="submit" onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-lg ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {formErrors.firstName && (
                                        <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-lg ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {formErrors.lastName && (
                                        <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>
                                    )}
                                </div>
                            </div>

                            {/* Contact Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-lg ${formErrors.email ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {formErrors.email && (
                                        <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-lg ${formErrors.phone ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {formErrors.phone && (
                                        <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                                    )}
                                </div>
                            </div>

                            {/* Address Fields */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Country *
                                </label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                >
                                    {Object.keys(COUNTRY_CURRENCY_MAP).map(country => (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Street Address *
                                </label>
                                <input
                                    type="text"
                                    name="streetAddress"
                                    value={formData.streetAddress}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg ${formErrors.streetAddress ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {formErrors.streetAddress && (
                                    <p className="text-red-500 text-xs mt-1">{formErrors.streetAddress}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Apartment, suite, etc. (optional)
                                </label>
                                <input
                                    type="text"
                                    name="apartment"
                                    value={formData.apartment}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Town/City *
                                </label>
                                <input
                                    type="text"
                                    name="townCity"
                                    value={formData.townCity}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg ${formErrors.townCity ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {formErrors.townCity && (
                                    <p className="text-red-500 text-xs mt-1">{formErrors.townCity}</p>
                                )}
                            </div>

                            {/* Payment Method */}
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Payment Method *
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div
                                        className={`relative flex items-center p-4 rounded-lg border-2 cursor-pointer
                                            ${formData.paymentMode === 'cod'
                                                ? 'border-green-500 bg-green-50'
                                                : 'border-gray-200 hover:border-green-200'}`}
                                        onClick={() => handleInputChange({ target: { name: 'paymentMode', value: 'cod' } })}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMode"
                                            value="cod"
                                            checked={formData.paymentMode === 'cod'}
                                            onChange={handleInputChange}
                                            className="h-4 w-4 text-green-500 border-gray-300 focus:ring-green-500"
                                        />
                                        <label className="ml-3 flex flex-col cursor-pointer">
                                            <span className="text-sm font-medium text-gray-900">Cash on Delivery</span>
                                            <span className="text-xs text-gray-500">Pay when you receive</span>
                                        </label>
                                    </div>

                                    <div
                                        className={`relative flex items-center p-4 rounded-lg border-2 cursor-pointer
                                            ${formData.paymentMode === 'online'
                                                ? 'border-green-500 bg-green-50'
                                                : 'border-gray-200 hover:border-green-200'}`}
                                        onClick={() => handleInputChange({ target: { name: 'paymentMode', value: 'online' } })}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMode"
                                            value="online"
                                            checked={formData.paymentMode === 'online'}
                                            onChange={handleInputChange}
                                            className="h-4 w-4 text-green-500 border-gray-300 focus:ring-green-500"
                                        />
                                        <label className="ml-3 flex flex-col cursor-pointer">
                                            <span className="text-sm font-medium text-gray-900">Online Payment</span>
                                            <span className="text-xs text-gray-500">Credit/Debit Card, UPI, etc.</span>
                                        </label>
                                    </div>
                                </div>
                                {formErrors.paymentMode && (
                                    <p className="text-red-500 text-xs mt-1">{formErrors.paymentMode}</p>
                                )}
                            </div>

                            <div className="mt-6 space-y-4">
                                <div className="border-t pt-4">
                                    <p className="text-sm font-medium text-gray-700 mb-3">Secure Payment Partners</p>
                                    <div className="flex items-center justify-between mb-4">
                                        <Image
                                            src={visa}
                                            alt="Visa"
                                            className="h-8 object-contain"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = { visa };
                                            }}
                                        />
                                        <Image
                                            src={mastercard}
                                            alt="Mastercard"
                                            className="h-8 object-contain"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://via.placeholder.com/80x32?text=Mastercard";
                                            }}
                                        />
                                        <Image
                                            src={rupay}
                                            alt="RuPay"
                                            className="h-8 object-contain"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://via.placeholder.com/80x32?text=RuPay";
                                            }}
                                        />
                                        <Image
                                            src={razorpay}
                                            alt="Razorpay"
                                            className="h-8 object-contain"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://via.placeholder.com/80x32?text=Razorpay";
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center justify-center space-x-2 bg-gray-50 p-3 rounded-lg">
                                            <img src={PAYMENT_IMAGES.secure} alt="Secure" className="h-5 w-5" />
                                            <span className="text-sm text-gray-600">100% Secure Payments</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                                                <img src={PAYMENT_IMAGES.ssl} alt="SSL" className="h-4 w-4" />
                                                <span className="text-xs text-gray-500">SSL Encrypted</span>
                                            </div>
                                            <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                                                <img src={PAYMENT_IMAGES.pci} alt="PCI" className="h-4 w-4" />
                                                <span className="text-xs text-gray-500">PCI DSS Compliant</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Total and Submit Button */}
                            <div className="pt-4 border-t border-gray-200">
                                <div className="flex justify-between mb-4">
                                    <span className="font-semibold">Total:</span>
                                    <span className="font-semibold">
                                        {currentCurrency.symbol}{(product.price * quantity * currentCurrency.rate).toFixed(2)}
                                    </span>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-[#43c3ff] hover:bg-[#43c3ff]/90 text-white py-3 rounded-lg"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Processing...' : 'Place Order'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

