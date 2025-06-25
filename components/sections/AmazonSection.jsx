"use client";
import React from 'react';
import { FaAmazon, FaShieldAlt, FaShippingFast, FaStar } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { amazonConfig } from '@/lib/amazonConfig';

export default function AmazonSection() {
    const handleBuyOnAmazon = () => {
        window.open(amazonConfig.getBuyUrl(), '_blank');
    };

    const amazonFeatures = [
        {
            icon: <FaShieldAlt className="w-6 h-6" />,
            title: "Secure Shopping",
            description: "Amazon's secure payment gateway"
        },
        {
            icon: <FaShippingFast className="w-6 h-6" />,
            title: "Fast Delivery",
            description: "Prime delivery available"
        },
        {
            icon: <FaStar className="w-6 h-6" />,
            title: "Trusted Reviews",
            description: "Verified customer reviews"
        }
    ];

    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Also Available on Amazon
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Shop with confidence on Amazon with secure payments, fast delivery, and trusted customer reviews.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Amazon Features */}
                    <div className="space-y-8">
                        {amazonFeatures.map((feature, index) => (
                            <div key={index} className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-[#FF9900] text-white rounded-lg flex items-center justify-center">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}

                        <div className="pt-4">
                            <Button
                                onClick={handleBuyOnAmazon}
                                className="bg-gradient-to-r from-[#FF9900] to-[#FF7A00] hover:from-[#FF7A00] hover:to-[#FF5500] text-white px-8 py-3 rounded-lg text-lg font-semibold flex items-center gap-3 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <FaAmazon className="w-6 h-6" />
                                Buy on Amazon
                            </Button>
                        </div>
                    </div>

                    {/* Amazon Logo and Info */}
                    <div className="text-center lg:text-right">
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <div className="flex justify-center lg:justify-end mb-6">
                                <div className="bg-gradient-to-r from-[#FF9900] to-[#FF7A00] rounded-full p-6">
                                    <FaAmazon className="w-16 h-16 text-white" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Trusted by Millions
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Our {amazonConfig.productTitle} is available on Amazon with thousands of satisfied customers and verified reviews.
                            </p>
                            <div className="flex justify-center lg:justify-end items-center gap-2 text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="w-5 h-5 fill-current" />
                                ))}
                                <span className="text-gray-600 ml-2">(500+ Reviews)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}