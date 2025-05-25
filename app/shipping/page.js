"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import Navbar from '@/components/elements/Navbar';

export default function ShippingPolicy() {
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
            title: "1. Shipping Coverage",
            sections: [
                {
                    subtitle: "Domestic Shipping",
                    content: "We deliver to all major cities and towns across India. Pin code verification is available at checkout. Remote locations may require additional delivery time. Certain restricted areas may not be serviceable."
                },
                {
                    subtitle: "International Shipping",
                    content: "We are happy to offer international shipping to customers worldwide. Our goal is to deliver your order as quickly and efficiently as possible, no matter where you are."
                }
            ]
        },
        {
            title: "2. Shipping Methods",
            sections: [
                {
                    subtitle: "Standard Delivery",
                    content: "Delivery within 5–7 business days. Available across all serviceable locations."
                }
            ]
        },
        {
            title: "3. Shipping Partners",
            content: "We work with reputed courier partners, including:",
            list: ["Aramex", "DHL", "Blue Dart", "DTDC"]
        },
        {
            title: "4. Order Processing",
            sections: [
                {
                    subtitle: "Processing Time",
                    content: "Orders are processed within 24 hours of placement. Order confirmation is sent via email. Bulk orders may require additional processing time."
                },
                {
                    subtitle: "Order Tracking",
                    content: "A tracking number is provided via email. Customer service assistance is available for tracking queries."
                }
            ]
        },
        {
            title: "5. Delivery Guidelines",
            sections: [
                {
                    subtitle: "Delivery Attempts",
                    content: "A maximum of 3 delivery attempts will be made. Delivery reattempts are scheduled within 24 hours. Customers will be notified before each delivery attempt. Orders returned to the seller after 3 failed attempts may incur reshipping fees. Refunds will be processed for the product price, excluding initial shipping charges."
                },
                {
                    subtitle: "Delivery Verification",
                    content: "Valid ID proof may be required for specific items. Digital signature capture is required at delivery. Unattended delivery is not permitted."
                }
            ]
        },
        {
            title: "6. Special Cases",
            sections: [
                {
                    subtitle: "Bulk Orders",
                    content: "Special shipping arrangements are available for bulk orders. Custom delivery timelines can be discussed with our team. Additional handling charges may apply."
                }
            ]
        },
        {
            title: "7. Shipping Restrictions",
            sections: [
                {
                    subtitle: "Weather Conditions",
                    content: "Delivery times may be affected during severe weather conditions, natural disasters, or local disturbances. In such cases, orders will be rescheduled, and customers will be notified with updated timelines."
                }
            ]
        },
        {
            title: "8. Lost or Damaged Shipments",
            sections: [
                {
                    subtitle: "Lost Packages",
                    content: "Investigations are initiated within 24 hours of receiving a complaint. Regular updates will be provided to the customer. Refunds or resolutions are provided within 15 business days for eligible cases, including the full product and shipping cost."
                },
                {
                    subtitle: "Damaged Packages",
                    content: "Refuse delivery if external damage is visible. Report damage within 24 hours of delivery with photo documentation. Replacement or refunds are processed after an investigation."
                }
            ]
        },
        {
            title: "9. Holiday Shipping",
            sections: [
                {
                    subtitle: "Peak Seasons",
                    content: "Processing times may be extended during festivals and peak seasons. We recommend additional delivery buffer time during these periods. Customers will be notified of any delays."
                },
                {
                    subtitle: "Business Hours",
                    content: "Order processing: Monday to Sunday, 9 AM to 6 PM IST. Customer service is available: Monday to Saturday, 9 AM to 8 PM IST."
                }
            ]
        },
        {
            title: "10. Environmental Commitment",
            sections: [
                {
                    subtitle: "Packaging",
                    content: "We use eco-friendly packaging materials with minimal plastic usage. Packaging materials are made from recycled sources where possible. We ensure right-sized packaging to reduce waste."
                }
            ]
        },
        {
            title: "11. Communication",
            content: "Shipping Updates: Customers receive:",
            list: [
                "Order confirmation emails",
                "Shipping confirmations with tracking details",
                "Delivery attempt notifications",
                "Delivery completion confirmations"
            ]
        },
        {
            title: "12. Customer Support",
            sections: [
                {
                    subtitle: "Email",
                    content: "israelitesshopping171@gmail.com"
                },
                {
                    subtitle: "Phone",
                    content: <span className="phone-number">+91 903-052-8333</span>
                },
                {
                    subtitle: "Response time",
                    content: "Within 4 business hours during operational hours."
                }
            ]
        },
        {
            title: "13. Policy Updates",
            content: "This policy is subject to change. Updates will be posted on our website. Customers will be notified via email for significant changes at least 7 days in advance. Continued use of our services implies acceptance of the updated policy."
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
                            <h1 className="text-4xl font-bold text-center mb-2">Shipping Policy</h1>
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
                                {point.sections ? (
                                    <div className="space-y-4">
                                        {point.sections.map((section, sIndex) => (
                                            <div key={sIndex}>
                                                <h3 className="font-medium text-gray-800 mb-2">
                                                    {section.subtitle}
                                                </h3>
                                                <p className="text-gray-600 leading-relaxed">
                                                    {section.content}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : point.list ? (
                                    <>
                                        <p className="text-gray-600 mb-2">{point.content}</p>
                                        <ul className="pl-5 space-y-1">
                                            {point.list.map((item, lIndex) => (
                                                <li key={lIndex} className="text-gray-600">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <p className="text-gray-600 leading-relaxed">
                                        {point.content}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Contact Information */}
                    <div className="mt-12 bg-[#8de8f825] p-6 rounded-lg border border-[#43c3ff]/20">
                        <p className="text-gray-700 text-center">
                            For more information, contact us at{' '}
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
