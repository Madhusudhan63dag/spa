import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import logo from '@/app/just_logo.png';
import LoadingScreen from './LoadingScreen';

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleNavigation = (path) => {
        setIsTransitioning(true);
        setIsLoading(true);
        setIsMobileMenuOpen(false);

        // Remove trailing slashes from paths
        const currentPath = pathname.replace(/\/$/, '');
        const targetPath = path.replace(/\/$/, '');

        // Determine navigation target
        const navigateTo = currentPath === targetPath ? '/' : targetPath;

        const transitionColor = navigateTo === '/' ? '#ffffff' :
            targetPath === '/about' ? 'rgb(83,247,83)' : '#43c3ff';

        document.documentElement.style.setProperty('--nav-bg-color', transitionColor);

        setTimeout(() => {
            router.push(navigateTo);
            setTimeout(() => {
                setIsTransitioning(false);
                setIsLoading(false);
            }, 500);
        }, 1000);
    };

    const getDisplayText = (section) => {
        // Remove trailing slash for comparison
        const currentPath = pathname.replace(/\/$/, '');

        if (section === 'product') {
            return currentPath === '/product' ? 'Home' : 'Product';
        } else if (section === 'about') {
            return currentPath === '/about' ? 'Home' : 'About';
        } else if (section === 'contact') {
            return currentPath === '/contact' ? 'Home' : 'Contact Us';
        }
        return '';
    };

    return (
        <>
            {isLoading && <LoadingScreen />}
            {/* Mobile Navbar */}
            <div className="md:hidden fixed top-0 left-0 w-full bg-white z-[999]">
                <div className="flex justify-between items-center px-4 py-3">
                    <div className="flex items-center">
                        <a href="/">
                            <Image
                                src={logo}
                                alt="Logo"
                                width={40}
                                height={40}
                                className="h-10 w-auto"
                                priority
                            />
                        </a>
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-gray-600 hover:text-[#2A6177]"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="bg-white border-t">
                        <div className="flex flex-col">
                            <button
                                onClick={() => handleNavigation('/product')}
                                className={`px-4 py-3 text-left hover:bg-gray-50 ${pathname === '/product' ? 'text-[#5fccff] font-semibold' : 'text-gray-600'
                                    }`}
                            >
                                {getDisplayText('product')}
                            </button>
                            <button
                                onClick={() => handleNavigation('/about')}
                                className={`px-4 py-3 text-left hover:bg-gray-50 ${pathname === '/about' ? 'text-[#6cfc6c] font-semibold' : 'text-gray-600'
                                    }`}
                            >
                                {getDisplayText('about')}
                            </button>
                            <button
                                onClick={() => handleNavigation('/contact')}
                                className={`px-4 py-3 text-left hover:bg-gray-50 ${pathname === '/contact' ? 'text-[#FF8C42] font-semibold' : 'text-gray-600'
                                    }`}
                            >
                                {getDisplayText('contact')}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Desktop Navbar */}
            <div className="hidden md:flex h-screen fixed top-0 left-0 w-auto">
                {/* About section */}
                <div
                    className={`w-24 h-screen flex items-end justify-center py-16 cursor-pointer transition-all duration-300
                        ${pathname === '/about' ? 'bg-[#6cfc6c]' : 'bg-[#6cfc6c] backdrop-blur-sm hover:bg-[rgb(83,247,83)]/10'}`}
                    onClick={() => handleNavigation('/about')}
                >
                    <span className={`transform rotate-[270deg] text-[2vw] font-semibold whitespace-nowrap
                        ${pathname === '/about' ? 'text-white' : 'text-[#2A6177]'}`}>
                        {getDisplayText('about')}
                    </span>
                </div>

                {/* Product section */}
                <div
                    className={`w-24 h-screen flex items-end justify-center py-16 cursor-pointer transition-all duration-300
                        ${pathname === '/product' ? 'bg-[#5fccff]' : 'bg-[#5fccff] backdrop-blur-sm hover:bg-[#43c3ff]/10'}`}
                    onClick={() => handleNavigation('/product')}
                >
                    <span className={`transform rotate-[270deg] text-[2vw] font-semibold whitespace-nowrap
                        ${pathname === '/product' ? 'text-white' : 'text-[#2A6177]'}`}>
                        {getDisplayText('product')}
                    </span>
                </div>

                {/* Contact Us section */}
                <div
                    className={`w-24 h-screen flex items-end justify-center py-20 cursor-pointer transition-all duration-300
                        ${pathname === '/contact' ? 'bg-[#FF8C42]' : 'bg-[#7D4FFF] backdrop-blur-sm hover:bg-[#ff6c6c]/10'}`}
                    onClick={() => handleNavigation('/contact')}
                >
                    <span className={`transform rotate-[270deg] text-[2vw] font-semibold whitespace-nowrap
                        ${pathname === '/contact' ? 'text-white' : 'text-white'}`}>
                        {getDisplayText('contact')}
                    </span>
                </div>

                {/* Overlay */}
                {isTransitioning && (
                    <div
                        className="fixed inset-0 nav-overlay z-50"
                        style={{
                            backgroundColor: 'var(--nav-bg-color, transparent)'
                        }}
                    />
                )}
            </div>
        </>
    );
};

export default Navbar;