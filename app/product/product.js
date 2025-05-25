"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import Navbar from '@/components/elements/Navbar';
import product1 from '../../assets/1.jpg';
import product2 from '../../assets/2.jpg'; // Add more product images
import product3 from '../../assets/10.jpg'; // Add more product images
import product4 from '../../assets/8.jpg'; // Add more product images
import { Star, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Product() {
    const [quantity, setQuantity] = useState(1);
    const [gradientPosition, setGradientPosition] = useState(0);
    const [selectedImage, setSelectedImage] = useState(0);
    const router = useRouter();

    // Product details with multiple images
    const product = {
        name: "Sampoorna Digestive Health Supplement",
        price: 3999.00,
        images: [product1, product2, product3, product4],
        description: "A natural supplement that promotes digestive health and overall wellness. Made with premium Ayurvedic ingredients.",
        features: [
            "100% Natural Ingredients",
            "Clinically Tested",
            "No Side Effects",
            "GMP Certified"
        ],
        ingredients: [
            "Amla",
            "Chitrak",
            "Nagarmotha",
            "Harad",
            "Giloy",
            "Nisoth",
            "Adrak"
        ]
    };

    const handleAddToCart = () => {
        const formSection = document.getElementById('submit');
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth' });
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
            {/* Main Content */}
            <div className="flex-1">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Product Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Product Image Gallery */}
                        <div className="space-y-4">
                            <div className="relative h-[500px] rounded-2xl overflow-hidden">
                                <Image
                                    src={product.images[selectedImage]}
                                    alt={`${product.name} - View ${selectedImage + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Thumbnails */}
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden ${selectedImage === index ? 'ring-2 ring-[#43c3ff]' : ''
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.name} thumbnail ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Product Details */}
                        <div className="flex flex-col justify-between">
                            <div>
                                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

                                {/* Rating */}
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                    <span className="ml-2 text-gray-600">(125 reviews)</span>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    <span className="text-3xl font-bold">₹{product.price}</span>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 mb-6">
                                    {product.description}
                                </p>

                                {/* Quantity Selector */}
                                <div className="flex items-center mb-6">
                                    <span className="mr-4">Quantity:</span>
                                    <Button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-2 border rounded-l"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                    <span className="px-4 py-2 border-t border-b">
                                        {quantity}
                                    </span>
                                    <Button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-2 border rounded-r"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>

                                {/* Add to Cart Button */}
                                <Button
                                    onClick={handleAddToCart}
                                    className="w-full bg-[#43c3ff] hover:bg-[#43c3ff]/90 text-white py-3 rounded-lg text-lg mb-6"
                                >
                                    Add to Cart - ₹{(product.price * quantity).toFixed(2)}
                                </Button>
                            </div>

                            {/* Features */}
                            <div className="border-t pt-6">
                                <h3 className="font-semibold mb-3">Key Features:</h3>
                                <ul className="grid grid-cols-2 gap-2">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-center">
                                            <span className="w-2 h-2 bg-[#43c3ff] rounded-full mr-2"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
