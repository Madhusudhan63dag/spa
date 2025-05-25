"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import Navbar from '@/components/elements/Navbar';

export default function CancellationPolicy() {
    const router = useRouter();
    const [gradientPosition, setGradientPosition] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setGradientPosition((prev) => (prev + 1) % 360);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const policyPoints = [
        {
            title: "1. Cancellation Period",
            content: [
                "Orders can be canceled within 24 hours of placing the order.",
                "After 24 hours, we begin processing and shipping your order, and cancellations will not be possible."
            ]
        },
        {
            title: "2. How to Cancel Your Order",
            content: [
                "To cancel your order, please follow these steps:",
                "Contact Us Immediately: Reach out to our customer support team at ",
                <span key="phone" className="phone-number">+91 903-052-8333</span>,
                " within 24 hours of your order.",
                "Provide Order Details: Include your order number and reason for cancellation in your message to help us process your request faster."
            ]
        },
        {
            title: "3. Cancellations Post-Shipping",
            content: [
                "If your order has already been shipped, we will not be able to cancel it. In this case, you may return the product after receiving it.",
                "To initiate a return, please refer to our Return Policy for further instructions."
            ]
        },
        {
            title: "4. Refund Process",
            content: [
                "Full Refunds: If your cancellation request is processed before the product is shipped, you will receive a full refund.",
                "Partial Refunds: If you cancel the order after the product has been shipped, the cost of the product will be refunded with less shipping charges, once we receive the returned item in its original condition."
            ]
        },
        {
            title: "5. Non-Cancellable Conditions",
            content: [
                "Opened/Used Products: Once the product has been opened or used, cancellations will not be accepted. Please check the product carefully upon delivery.",
                "Special Promotions or Offers: Orders placed under special promotions or discounts may be subject to different cancellation terms, which will be specified during the purchase process."
            ]
        }
    ];

    return (
        <div className="flex relative bg-white min-h-screen">
            {/* Navbar */}
            <div className='fixed left-0 top-0 w-1/5 h-screen bg-transparent z-[999]'>
                <Navbar />
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-[0%] md:ml-[21%]">
                <div className="max-w-4xl mx-auto px-4 py-16">
                    {/* Header with gradient */}
                    <div className="relative mb-12 p-8 rounded-lg overflow-hidden">
                        <div
                            className="absolute inset-0 z-0 transition-all duration-1000 ease-in-out opacity-20"
                            style={{
                                background: `linear-gradient(${gradientPosition}deg, 
                                    #2A6177, 
                                    #43c3ff, 
                                    #8de8f8
                                )`,
                            }}
                        />
                        <div className="relative z-10">
                            <h1 className="text-4xl font-bold text-center mb-2">Cancellation Policy</h1>
                            <p className="text-center text-gray-600">Last Updated: December 2024</p>
                        </div>
                    </div>

                    {/* Policy Content */}
                    <div className="space-y-8">
                        {policyPoints.map((point, index) => (
                            <div key={index} className="bg-gray-50 p-6 rounded-lg">
                                <h2 className="text-xl font-semibold text-[#2A6177] mb-4">
                                    {point.title}
                                </h2>
                                <div className="space-y-3">
                                    {point.content.map((text, idx) => (
                                        <p key={idx} className="text-gray-600 leading-relaxed">
                                            {text}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Information */}
                    <div className="mt-12 bg-[#8de8f825] p-6 rounded-lg border border-[#43c3ff]/20">
                        <p className="text-gray-700 text-center">
                            For cancellation requests, contact us at{' '}
                            <a
                                href="mailto:israelitesshopping171@gmail.com"
                                className="text-[#2A6177] hover:underline"
                            >
                                israelitesshopping171@gmail.com
                            </a>
                        </p>
                    </div>

                    {/* Back Button */}
                    <div className="mt-8 text-center">
                        <Button
                            onClick={() => router.back()}
                            className="bg-[#43c3ff] hover:bg-[#43c3ff]/90 text-white"
                        >
                            Back to Previous Page
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}