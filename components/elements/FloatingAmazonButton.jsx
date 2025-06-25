"use client";
import React, { useState } from 'react';
import { FaAmazon } from 'react-icons/fa';
import { amazonConfig } from '@/lib/amazonConfig';

export default function FloatingAmazonButton() {
    const [isHovered, setIsHovered] = useState(false);

    const handleAmazonClick = () => {
        window.open(amazonConfig.getBuyUrl(), '_blank');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button
                onClick={handleAmazonClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="bg-gradient-to-r from-[#FF9900] to-[#FF7A00] hover:from-[#FF7A00] hover:to-[#FF5500] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
                aria-label="Buy on Amazon"
            >
                <FaAmazon className="w-6 h-6" />
                {isHovered && (
                    <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black text-white text-sm rounded whitespace-nowrap">
                        Buy on Amazon
                        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                    </div>
                )}
            </button>
        </div>
    );
}