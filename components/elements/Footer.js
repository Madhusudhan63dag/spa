"use client"
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@/app/just_logo.png';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'; // Add this import

export default function Footer() {
    const router = useRouter();

    return (
        <footer className="w-full bg-white px-4 md:px-8 lg:px-20 py-8 ">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap- lg:gap-8">
                    {/* Logo, Description and Social Icons */}
                    <div className="col-span-1 max-w-xs">
                        <div className="flex items-center gap-2 mb-4">
                            <Image
                                src={logo}
                                alt="Logo"
                                className='w-12 md:w-16'
                                width={64}
                                height={64}
                                priority
                            />
                            <h3 className='text-xs md:text-sm font-semibold'>Sampoorn <br /> Arogya</h3>
                        </div>
                        <p className="text-gray-600 text-xs md:text-sm break-words mb-4">
                            Your trusted partner in natural digestive health solutions.
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-4 items-center">
                            <a
                                href="https://www.facebook.com/profile.php?id=61571764651288"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-[#43c3ff] transition-colors duration-200"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.instagram.com/sampoornarogya/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-[#43c3ff] transition-colors duration-200"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-[#43c3ff] transition-colors duration-200"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="w-full">
                        <h4 className="text-base md:text-lg font-semibold mb-3">Quick Links</h4>
                        <ul className="space-y-1.5">
                            {["Home", "About", "Product", "Contact"].map((item) => (
                                <li key={item}>
                                    <button
                                        onClick={() => router.push(item === "Home" ? "/" : `/${item.toLowerCase().replace(' ', '')}`)}
                                        className="text-sm text-gray-600 hover:text-[#43c3ff] transition-colors duration-200"
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="w-full ">
                        <h4 className="text-base md:text-md font-semibold mb-3">Contact</h4>
                        <ul className="space-y-1">
                            <li className="text-xs md:text-xs text-gray-600 break-words">
                                Email: israelitesshopping171@gmail.com
                            </li>
                            <li className="text-xs md:text-sm font-mono text-gray-600">
                                Phone: +91 903-052-8333
                            </li>
                            <li className="text-xs md:text-sm text-gray-600">
                                Location: Begumpet, Hyderabad, Telangana 500016
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="w-full">
                        <h4 className="text-base md:text-lg font-semibold mb-3">Legal</h4>
                        <ul className="space-y-1.5">
                            {[
                                ["Privacy Policy", "private"],
                                ["Terms of Service", "term"],
                                ["Shipping Policy", "shipping"],
                                ["Cancellation Policy", "cancel"],
                                ["Return Policy", "return"]
                            ].map(([label, path]) => (
                                <li key={path}>
                                    <button
                                        onClick={() => router.push(`/${path}`)}
                                        className="text-sm text-gray-600 hover:text-[#43c3ff] transition-colors duration-200"
                                    >
                                        {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t mt-6 md:mt-8 pt-4 md:pt-6">
                    <p className="text-center text-xs md:text-sm text-gray-600">
                        © {new Date().getFullYear()} Sampoorna Arogya. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}