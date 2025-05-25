"use client";
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import Navbar from '@/components/elements/Navbar';
import { Button } from "@/components/ui/button"
import logo from '../just_logo.png'


// Use a placeholder image for now - to be replaced later
import aboutHero from '../../assets/test/1920x1281_1.jpg';
import aboutBanner1 from '../../assets/test/1400x400.jpg';
import aboutBanner2 from '../../assets/test/1400x400_1.jpg';
import img1 from '../../assets/3.jpg';
import img2 from '../../assets/7.jpg';
import img3 from '../../assets/7.jpg';
import img4 from '../../assets/8.jpg';
import Footer from '@/components/elements/Footer';

export default function About() {
    const router = useRouter();
    const videoRef = useRef(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [gradientPosition, setGradientPosition] = useState(0);

    // Animation hooks
    const [sectionRef, sectionInView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setGradientPosition((prev) => (prev + 1) % 360);
        }, 50);

        return () => clearInterval(interval);
    }, []);

    // Video control functions
    const handleVideoControl = () => {
        const iframe = videoRef.current;
        const player = iframe.contentWindow;

        if (isVideoPlaying) {
            player.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        } else {
            player.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }
    };

    // Fix the path checking in getDisplayText
    const getDisplayText = (section) => {
        if (section === 'product') {
            return pathname === '/product' ? 'Home' : 'Product';
        } else if (section === 'about') {
            return pathname === '/about' ? 'Home' : 'About';
        }
    };

    return (
        <div className="flex relative min-h-screen">
            {/* Navbar */}
            <div className='fixed left-0 top-0 md:w-1/5 w-full h-auto md:h-screen bg-transparent z-[999]'>
                <Navbar />
            </div>

            {/* Main Content */}
            <div className="flex-1 md:ml-[21%] ml-0 mt-[60px] md:mt-0">
                {/* Hero Section */}
                <section className='relative w-full h-[30vh] md:h-[50vh]'>
                    <div className="absolute inset-0">
                        <Image
                            src={aboutBanner1}
                            alt="About Us Hero"
                            fill
                            priority
                            className="object-fit"
                        />
                    </div>

                    {/* Content Container with Header */}
                    <div className='relative z-10 w-full h-full flex flex-col mx-auto px-4 md:px-8'>
                        {/* Header */}
                        <header className='w-full flex justify-between items-center py-4 md:py-8'>
                            <div className='flex items-center'>
                                <Image
                                    src={logo}
                                    alt="Sampoorna Arogya Logo"
                                    className='w-12 md:w-32 hidden md:block h-auto relative z-10'
                                    priority
                                />
                            </div>
                            {/* Navigation - Desktop only */}
                            <nav className='flex items-center'>
                                <Button
                                    onClick={() => router.push('/product')}
                                    className="bg-[#6CFC6C] hover:bg-[#43c3ff] text-black px-4 py-2 md:px-10 md:py-7 rounded-full transition-all duration-300 text-sm md:text-xl whitespace-nowrap"
                                >
                                    Order Now
                                </Button>
                            </nav>
                        </header>

                        {/* Hero Content */}
                        <div className="flex-1 flex flex-col justify-end items-center px-4">
                            <h1 className="text-4xl md:text-3xl font-bold text-black text-center mb-6">
                                Step into a Healthier Life with Sampoorna Arogya
                            </h1>
                            <p className="text-lg md:text-xl text-black text-center max-w-2xl">
                                Redefining digestive health through the power of Ayurveda.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Product Information Section */}
                <div className="py-16 md:py-24 px-4 md:px-8 bg-[#f8f9fa]">
                    {/* Product 1 */}
                    <div className="max-w-7xl mx-auto mb-16 md:mb-24">
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                            <div className="w-full md:w-1/2">
                                <div className="relative h-[600px] md:h-[500px] rounded-2xl overflow-hidden">
                                    <Image
                                        src={img1}
                                        alt="Sampoorn Arogya Syrup - Natural Digestive Health Solution"  // Improved alt text
                                        fill
                                        className="object-fit"  // Add missing object-fit class
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 space-y-4">
                                <h3 className="text-2xl md:text-4xl font-bold text-[#2A6177]">Sampoorn Arogya Syrup</h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Our syrup is meticulously crafted to enhance digestion and promote overall gut health using ancient Ayurvedic formulas.
                                </p>
                                <div className="flex gap-4 pt-4">
                                    <Button className="bg-[rgb(76,238,84)] hover:bg-[#43c3ff]">
                                        <a href="/product" className="w-full h-full inline-block">  Buy Now
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product 2 */}
                    <div className="max-w-7xl mx-auto mb-16 md:mb-24">
                        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
                            <div className="w-full md:w-1/2 space-y-4">
                                <h3 className="text-2xl md:text-4xl font-bold text-[#2A6177]">Sampoorn Arogya Tablets</h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Convenient and powerful, our tablets provide a holistic solution for digestive balance, combining potent herbal ingredients.
                                </p>
                                <div className="flex gap-4 pt-4">
                                    <Button className="bg-[rgb(76,238,84)] hover:bg-[#43c3ff]">
                                        <a href="/product" className="w-full h-full inline-block"> Buy Now
                                        </a>
                                    </Button>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="relative h-[600px] md:h-[500px] rounded-2xl overflow-hidden">
                                    <Image
                                        src={img2}
                                        alt="Sampoorn Arogya Tablets - Herbal Digestive Supplement"  // Improved alt text
                                        fill
                                        className="object-fit"  // Add missing object-fit class
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Banner Section 2 */}
                <div className="relative w-full">
                    <div className="aspect-[16/9] md:aspect-[21/9] relative">
                        <Image
                            src={aboutBanner2}
                            alt="Partner with Us"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 z-10 flex items-center justify-end">
                            <div className="p-4 md:p-10 w-full md:w-1/2 text-white flex flex-col items-end justify-end text-end">
                                <h2 className="text-2xl md:text-4xl font-bold mb-4">Join Us on the Path to Wellness</h2>
                                <p className="text-sm md:text-lg mb-6">
                                    Let us guide you to holistic health through nature's wisdom.
                                </p>
                                <Button
                                    onClick={() => router.push('/contact')}
                                    className="bg-[rgb(76,238,84)] hover:bg-[#43c3ff]"
                                >
                                    Get in Touch
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>

    );
}
