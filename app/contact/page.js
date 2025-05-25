"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import Navbar from '@/components/elements/Navbar';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Footer from '@/components/elements/Footer';

export default function Contact() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const contactInfo = [
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Phone",
            details: ["+91 903-052-8333"],
            action: "tel:+919908526444",
            isPhone: true
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email",
            details: ["israelitesshopping171@gmail.com"],
            action: "mailto:israelitesshopping171@gmail.com",
            isEmail: true
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Location",
            details: [" Begumpet, Hyderabad, Telangana 500016"],
            action: null
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Business Hours",
            details: ["Monday - Saturday", "9:00 AM - 6:00 PM"],
            action: null
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name) errors.name = 'Name is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.phone) errors.phone = 'Phone is required';
        if (!formData.message) errors.message = 'Message is required';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsSubmitting(true);
            try {
                const formattedData = {
                    _subject: "New Contact Form Submission",
                    _template: "table",
                    _captcha: "false",
                    ...formData
                };

                const response = await fetch('https://formsubmit.co/ajax/israelitesshopping171@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formattedData)
                });

                if (!response.ok) throw new Error('Failed to submit form');

                const result = await response.json();
                if (result.success) {
                    setSubmitSuccess(true);
                    setFormData({ name: '', email: '', phone: '', message: '' });
                }
            } catch (error) {
                console.error('Submission error:', error);
                setFormErrors(prev => ({
                    ...prev,
                    submit: 'Failed to send message. Please try again.'
                }));
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="flex relative bg-white min-h-screen">
            <div className='fixed left-0 top-0 w-1/5 h-screen bg-transparent z-[999]'>
                <Navbar />
            </div>

            <div className="flex-1 ml-[0%] md:ml-[21%]">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Have questions about our products or services? We're here to help. Reach out to us through any of the following channels.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                                        <div className="flex items-center space-x-3 text-[#2A6177] mb-4">
                                            {info.icon}
                                            <h3 className="font-semibold">{info.title}</h3>
                                        </div>
                                        {info.details.map((detail, idx) => (
                                            <p key={idx} className={`text-gray-600 ${info.isEmail ? 'break-all' : ''}`}>
                                                {info.action ? (
                                                    <a
                                                        href={info.action}
                                                        className={`hover:text-[#43c3ff] ${info.isPhone ? 'font-mono tracking-wider' : ''} ${info.isEmail ? 'text-sm' : ''}`}
                                                    >
                                                        {detail}
                                                    </a>
                                                ) : (
                                                    detail
                                                )}
                                            </p>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-lg ${formErrors.name ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {formErrors.name && (
                                        <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                                    )}
                                </div>

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

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-lg ${formErrors.message ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {formErrors.message && (
                                        <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-[#43c3ff] hover:bg-[#43c3ff]/90 text-white py-3 rounded-lg"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </Button>

                                {submitSuccess && (
                                    <p className="text-green-600 text-center mt-4">
                                        Message sent successfully! We'll get back to you soon.
                                    </p>
                                )}
                                {formErrors.submit && (
                                    <p className="text-red-500 text-center mt-4">
                                        {formErrors.submit}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>

                {/* Added Footer */}
                <Footer />
            </div>
        </div>
    );
}
