"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  // Add this import
import Navbar from '@/components/elements/Navbar';
import Footer from '@/components/elements/Footer';
import { Button } from '@/components/ui/button';  // Make sure Button is imported

export default function ReturnPolicy() {
    const router = useRouter();  // Add this line
    const [gradientPosition, setGradientPosition] = useState(0);

    const returnData = {
        title: "Return Policy",
        lastUpdated: "Last Updated: December 2024",
        sections: [
            {
                title: "Return Eligibility",
                content: "Your purchase is eligible for a return if it meets the following criteria: the product must be returned in its original packaging (used or unused), reach the specified address listed on our website, and arrive within 15 days of the purchase date. Damaged products will not be accepted."
            },
            {
                title: "Refund Process",
                content: "To process a refund, customers must initiate the return process and send the product to the specified address. Once the product is received and inspected, refunds will be credited to the original payment method within 10 business days, excluding shipping costs."
            },
            {
                title: "Shipping Responsibility",
                content: "The return process is customer-initiated, and customers are responsible for ensuring the product is shipped to the specified address. Return shipping costs are not covered unless the return is due to a manufacturing defect or error."
            }
        ],
        footer: {
            contact: "For any return inquiries, please contact us at info@sampoornaarogya.com"
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setGradientPosition((prev) => (prev + 1) % 360);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex relative bg-white min-h-screen">
            {/* Navbar */}
            <div className='fixed left-0 top-0 w-1/5 h-screen bg-transparent z-[999]'>
                <Navbar />
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-[0%] md:ml-[21%]">
                <div className="max-w-4xl mx-auto px-4 py-12">
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
                            <h1 className="text-4xl font-bold text-center mb-2">{returnData.title}</h1>
                            <p className="text-center text-gray-600">{returnData.lastUpdated}</p>
                        </div>
                    </div>

                    {/* Return Policy Sections */}
                    <div className="space-y-12">
                        {returnData.sections.map((section, index) => (
                            <section key={index} className="prose max-w-none">
                                <h2 className="text-2xl font-semibold mb-4 text-[#2A6177]">
                                    {section.title}
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {section.content}
                                </p>
                            </section>
                        ))}
                    </div>

                    {/* Contact Information */}
                    <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                        <p className="text-center text-gray-600">
                            {returnData.footer.contact}
                        </p>
                    </div>

                    {/* Footer */}
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
