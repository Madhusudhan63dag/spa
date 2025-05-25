"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  // Add this import
import Navbar from '@/components/elements/Navbar';
import Footer from '@/components/elements/Footer';
import { Button } from '@/components/ui/button';

export default function TermsConditions() {
    const router = useRouter();  // Add this line
    const [gradientPosition, setGradientPosition] = useState(0);

    const termsData = {
        title: 'Terms & Conditions',
        lastUpdated: 'Last Updated: December 2024',
        sections: [
            {
                heading: "Welcome to Sampoorn Arogya!",
                content: "These terms and conditions outline the rules and regulations for the use of Sampoorn Arogya Website. By accessing this website we assume you accept these terms and conditions. Do not continue to use Sampoorn Arogya if you do not agree to take all of the terms and conditions stated on this page."
            },
            {
                heading: "Terminology",
                content: "The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice, and all Agreements: \"Client\", \"You\" and \"Your\" refers to you, the person who logs on to this website and is compliant with the Company's terms and conditions. \"The Company\", \"Ourselves\", \"We\", \"Our\" and \"Us\", refers to our Company. \"Party\", \"Parties\", or \"Us\", refers to both the Client and ourselves. All terms refer to the offer, acceptance, and consideration of payment necessary to undertake the process of our assistance to the Client most appropriately for the express purpose of meeting the Client's needs in respect of the provision of the Company's stated services, by and subject to, prevailing law of in. Any use of the above terminology or other words in the singular, plural, capitalization, and/or he/she or they, are taken as interchangeable and therefore as referring to the same."
            },
            {
                heading: "Cookies",
                content: "We employ the use of cookies. By accessing Sampoorn Arogya, you agree to use cookies in agreement with Sampoorn Arogya's Privacy Policy. Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies."
            },
            {
                heading: "Intellectual Property Rights",
                content: "Unless otherwise stated, Sampoorn Arogya and/or its licensors own the intellectual property rights for all material on Sampoorn Arogya. All intellectual property rights are reserved. You may access this from Sampoorn Arogya for your personal use subject to restrictions set in these terms and conditions."
            },
            {
                heading: "You Must Not",
                content: [
                    "Republish material from Sampoorn Arogya",
                    "Sell, rent, or sub-license material from Sampoorn Arogya",
                    "Reproduce, duplicate, or copy material from Sampoorn Arogya",
                    "Redistribute content from Sampoorn Arogya"
                ]
            },
            {
                heading: "User Comments",
                content: "Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Sampoorn Arogya does not filter, edit, publish, or review Comments before their presence on the website. Comments do not reflect the views and opinions of Sampoorn Arogya, its agents, and/or affiliates. Comments reflect the views and opinions of the person who posts their views and opinions. To the extent permitted by applicable laws, Sampoorn Arogya shall not be liable for the Comments or any liability, damages, or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website."
            },
            {
                heading: "External Links",
                content: "We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that are arising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third-party rights."
            }
        ],
        footer: {
            message: "We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of any changes.",
            contact: "For any questions regarding our terms, please contact israelitesshopping171@gmail.com"
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
                            <h1 className="text-4xl font-bold text-center mb-2">{termsData.title}</h1>
                            <p className="text-center text-gray-600">{termsData.lastUpdated}</p>
                        </div>
                    </div>

                    {/* Terms Sections */}
                    <div className="space-y-12">
                        {termsData.sections.map((section, index) => (
                            <section key={index} className="prose max-w-none">
                                <h2 className="text-2xl font-semibold mb-4 text-[#2A6177]">
                                    {section.heading}
                                </h2>
                                {Array.isArray(section.content) ? (
                                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                        {section.content.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-600 leading-relaxed">
                                        {section.content}
                                    </p>
                                )}
                            </section>
                        ))}
                    </div>

                    {/* Footer Message */}
                    <div className="mt-12 space-y-4 p-6 bg-gray-50 rounded-lg">
                        <p className="text-center text-gray-600">
                            {termsData.footer.message}
                        </p>
                        <p className="text-center text-gray-600">
                            {termsData.footer.contact}
                        </p>
                    </div>

                    {/* Footer Component */}
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
