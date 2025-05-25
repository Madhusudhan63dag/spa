"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  // Add this import
import Navbar from '@/components/elements/Navbar';
import logo from '../just_logo.png';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function PrivacyPolicy() {
    const router = useRouter();  // Add this line
    const [gradientPosition, setGradientPosition] = useState(0);

    const privacyData = {
        title: 'Privacy Policy',
        lastUpdated: 'Last Updated: December 2024',
        sections: [
            {
                title: 'Information We Collect',
                content: 'This Privacy Policy describes how Sampoorna Arogya collects, uses, and discloses your information when you use our website.\n\nPersonal Information: This includes information that can be used to identify you, such as your name, billing address, shipping address, email address, and phone number. You only provide this information when you contact us through a form on the Site.\n\nNon-Personal Information: This includes information that cannot be used to identify you, such as your browser type, operating system, IP address, browsing activity on the Site, and demographic information (e.g., age, gender). This information is collected automatically when you visit the Site.',
            },
            {
                title: 'How We Use Your Information',
                content: 'Personal Information: We will only use your personal information to respond to inquiries and requests. We will not share your personal information with any third parties without your consent, except as required by law.\n\nNon-Personal Information: We use non-personal information to improve the Site and understand how users interact. We may also use non-personal information for internal marketing and promotional purposes.'
            },
            {
                title: 'Cookies and Tracking Technologies',
                content: 'We may use cookies and other tracking technologies to collect non-personal information about your use of the Site. Cookies are small data files that are stored on your device when you visit a website. They allow the website to remember your actions and preferences over time.\n\nIf you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.\n\nWhen you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.\n\nIf you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.'
            },
            {
                title: 'Third-Party Service Providers',
                content: 'We may use third-party service providers to help us operate the Site and deliver our services. These service providers may have access to your non-personal information. We will not share your personal information with any third-party service providers for their marketing purposes without your consent.'
            },
            {
                title: 'Security',
                content: 'We take reasonable steps to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no website or internet transmission is completely secure.'
            },
            {
                title: 'Children’s Privacy',
                content: 'The Site is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you believe that your child has provided us with personal information, please contact us. We will take steps to remove the information from our records.'
            },
            {
                title: 'Changes to this Privacy Policy',
                content: 'We may update this Privacy Policy from time to time. We will post any changes on the Site. We encourage you to review this Privacy Policy periodically for the latest information on our privacy practices.'
            }
        ],
        footer: {
            contact: 'If you have any questions about this Privacy Policy, please get in touch with us at info@sampoornaarogya.com.'
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
                            <h1 className="text-4xl font-bold text-center mb-2">{privacyData.title}</h1>
                            <p className="text-center text-gray-600">{privacyData.lastUpdated}</p>
                        </div>
                    </div>

                    {/* Privacy Policy Sections */}
                    <div className="space-y-12">
                        {privacyData.sections.map((section, index) => (
                            <section key={index} className="prose max-w-none">
                                <h2 className="text-2xl font-semibold mb-4 text-[#2A6177]">
                                    {section.title}
                                </h2>
                                {section.content.split('\n\n').map((paragraph, pIndex) => (
                                    <p key={pIndex} className="text-gray-600 mb-4">
                                        {paragraph}
                                    </p>
                                ))}
                            </section>
                        ))}
                    </div>

                    {/* Footer Section */}
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
