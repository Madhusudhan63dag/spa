"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/app/just_logo.png';
import productMain from '@/assets/product_des.jpg';
import heartImg from '@/assets/1.png';
import reliefImg from '@/assets/2.png';
import bloatingImg from '@/assets/3.png';
import facialImg from '@/assets/face/4.png';
import fiveImg from '@/assets/face/5.jpg';
import sixImg from '@/assets/face/6.jpg';
import coupleImg from '@/assets/test/1920x1281.jpg';
import ReviewSection from '@/components/elements/ReviewSection';
import { useRouter } from 'next/navigation';

export default function SpaPage() {
  const router = useRouter();
  
  // State for auto image slider
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const productImages = [productMain, heartImg, reliefImg, bloatingImg];
  
  // Audio player reference and state
  const audioRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Function to start or stop the sound
  const toggleSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.log("Play was prevented:", error);
          });
      }
    }
  };
  
  // Auto slide effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % productImages.length);
    }, 3000); // Change image every 3 seconds
    
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);
  
  // Auto-play sound and handle audio setup
  useEffect(() => {
    // Setup the audio when the component mounts
    if (audioRef.current) {
      // Configure audio
      audioRef.current.volume = 0.2;
      audioRef.current.loop = true;
      
      // Try to play the audio (may be blocked by browser policies)
      const playPromise = audioRef.current.play();
      
      // Handle potential play() rejection
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            console.log("Autoplay successful");
          })
          .catch(error => {
            console.log("Autoplay was prevented. User interaction is required to play audio.");
            // We'll enable manual sound toggle through user interaction
          });
      }
    }
    
    // Cleanup when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);
  return (
    <main className="min-h-screen bg-white">      {/* Hidden audio element for phone ring sound */}
      <audio ref={audioRef} src="/sounds/phone-ring.mp3" preload="auto"></audio>
      
      {/* Sound control button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          onClick={toggleSound}
          className={`p-3 rounded-full shadow-lg ${isPlaying ? 'bg-red-500' : 'bg-green-500'} text-white transition-colors`}
          aria-label={isPlaying ? "Mute sound" : "Play sound"}
          title={isPlaying ? "Mute sound" : "Play sound"}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Navbar with Logo and Title */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            {/* Just Logo and Big Title */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center">
                <div className="relative h-16 w-16">
                  <Image
                    src={logo}
                    alt="Sampurna Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <h1 className="ml-4 text-4xl font-bold text-gray-800">Sampurna Spa</h1>
              </Link>
            </div>
          </div>
        </div>      </nav>
        {/* Mobile Call Button - Always visible and fixed at the top */}
      {/* <div className="block md:hidden fixed top-20 right-4 z-40">        <a 
          href="tel:+918888888888" 
          className="flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-full shadow-lg"
          style={{
            animation: "pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite"
          }}
          onClick={() => {
            // Try to play the sound when the call button is clicked
            if (audioRef.current && !isPlaying) {
              audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(err => console.log("Sound play error:", err));
            }
          }}
        >
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-green-400 opacity-75 animate-ping"></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-wiggle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
              />
            </svg>
          </div>
          <span className="font-medium whitespace-nowrap">Call Now</span>
        </a>
      </div> */}
        {/* Product Showcase Header */}
      <section className="py-10 px-4 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="container mx-auto">
          {/* Mobile-only Call Button above product showcase */}
          <div className="block md:hidden mb-6">            <a 
              href="tel:+918888888888" 
              className="flex items-center justify-center w-full gap-3 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg shadow-md transition-colors"
              onClick={() => {
                // Try to play the sound when the call button is clicked
                if (audioRef.current && !isPlaying) {
                  audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(err => console.log("Sound play error:", err));
                }
              }}
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-white opacity-50 animate-ping"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-wiggle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                  />
                </svg>
              </div>
              <span className="font-bold text-lg">Call Now: +91 8888888888</span>
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Left Side - Product Images */}
            <div className="w-full md:w-1/2">                <div className="relative">
                <div className="bg-white p-5 rounded-xl shadow-lg">
                  <div className="absolute -top-4 -right-4 bg-rose-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-md transform rotate-12 z-10">
                    BEST SELLER
                  </div>
                  <div className="relative h-80 w-full overflow-hidden rounded-lg">
                    {/* Auto sliding image carousel */}
                    {productImages.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`Luxury Spa Treatment ${index + 1}`}
                        fill
                        className={`object-cover transition-opacity duration-1000 rounded-lg ${
                          index === activeImageIndex ? 'opacity-100' : 'opacity-0 absolute'
                        }`}
                        priority={index === 0}
                      />
                    ))}
                    
                    {/* Image pagination indicator */}
                    <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-md z-10">
                      <p className="text-white text-sm font-medium">Gallery: {activeImageIndex + 1}/{productImages.length}</p>
                    </div>
                    
                    {/* Left/Right navigation arrows */}
                    <button 
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 backdrop-blur-sm p-1.5 rounded-full z-10 transition-all"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveImageIndex((prevIndex) => 
                          prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
                        );
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 backdrop-blur-sm p-1.5 rounded-full z-10 transition-all"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveImageIndex((prevIndex) => 
                          (prevIndex + 1) % productImages.length
                        );
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Thumbnail navigation */}
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {productImages.map((image, index) => (
                      <div 
                        key={index} 
                        className={`relative h-20 cursor-pointer rounded-md overflow-hidden transition-all ${
                          index === activeImageIndex
                            ? 'border-2 border-teal-500 ring-2 ring-offset-1 ring-teal-300'
                            : 'border border-gray-200 hover:border-teal-300'
                        }`}
                        onClick={() => setActiveImageIndex(index)}
                      >
                        <Image
                          src={image}
                          alt={`Spa Treatment Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Product Content */}
            <div className="w-full md:w-1/2">
              <div className="bg-white p-7 rounded-xl shadow-md">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-3xl font-bold text-gray-800">Signature Rejuvenation Experience</h2>
                  <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-1 rounded-full">New Collection</span>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="flex text-amber-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm font-medium mr-4">(86 verified reviews)</span>
                  <span className="text-green-600 text-sm font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    In stock
                  </span>
                </div>
{/*                 
                <div className="mb-4">
                  <span className="text-3xl font-bold text-indigo-600">₹7,999</span>
                  <span className="text-gray-500 text-lg line-through ml-2">₹10,500</span>
                  <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-2.5 py-0.5 rounded-md ml-2">25% OFF</span>
                </div> */}
                
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-gray-700">
                    Our award-winning signature treatment combines ancient healing techniques with modern luxury. 
                    This holistic experience is designed to restore balance, reduce stress, and rejuvenate your mind and body.
                  </p>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Premium Package Includes:
                  </h3>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <li className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      90-min aromatherapy massage
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Hydrating facial treatment
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Detox body wrap
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Hand & foot reflexology
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Scalp massage with oils
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Luxury spa amenity kit
                    </li>
                  </ul>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-gray-700 mr-2">Available Slots:</span>
                    <div className="flex space-x-1">
                      <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2 py-1 rounded">Morning</span>
                      <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2 py-1 rounded">Afternoon</span>
                      <span className="bg-gray-100 text-gray-400 text-xs font-medium px-2 py-1 rounded line-through">Evening</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">                <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg flex-grow transition duration-300 font-medium flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Now: +91 8888888888
                  </button>
                  <button className="border border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 p-3 rounded-lg transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Spa Services Highlights */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64">                <Image
                  src={fiveImg}
                  alt="Aromatherapy Massage"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4">
                    <span className="bg-blue-600 text-white px-3 py-1 text-sm rounded-full">Most Popular</span>
                    <h3 className="text-white text-xl font-semibold mt-2">Aromatherapy Massage</h3>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 mb-4">Experience deep relaxation with our signature aromatherapy massage using premium essential oils.</p>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64">                <Image
                  src={sixImg}
                  alt="Deep Tissue Massage"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4">
                    <h3 className="text-white text-xl font-semibold mt-2">Deep Tissue Massage</h3>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 mb-4">Relieve tension and chronic muscle pain with our therapeutic deep tissue massage technique.</p>
              
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64">                <Image
                  src={facialImg}
                  alt="Facial Treatment"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4">
                    <span className="bg-green-600 text-white px-3 py-1 text-sm rounded-full">New</span>
                    <h3 className="text-white text-xl font-semibold mt-2">Revitalizing Facial</h3>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 mb-4">Restore your skin's natural glow with our premium facial treatment using organic products.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section with Icons */}
      <section className="py-12 px-4 bg-blue-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Sampurna Spa</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Certified Therapists</h3>
              <p className="text-gray-600">All our therapists are certified professionals with years of experience.</p>
            </div>
            
            {/* Benefit 2 */}
            <div className="bg-white p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Natural Products</h3>
              <p className="text-gray-600">We use only organic, natural products that are gentle on your skin.</p>
            </div>
            
            {/* Benefit 3 */}
            <div className="bg-white p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">Book appointments that fit your schedule, including evenings and weekends.</p>
            </div>
            
            {/* Benefit 4 */}
            <div className="bg-white p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Comfortable Ambience</h3>
              <p className="text-gray-600">Relax in our peaceful environment designed for maximum comfort.</p>
            </div>
          </div>
        </div>
      </section>      {/* Special Offer Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-indigo-700 to-purple-800 rounded-xl overflow-hidden shadow-xl">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-3/5 p-8 md:p-12">
                <div className="bg-white/10 inline-block px-3 py-1 rounded-full text-white text-sm font-medium mb-4">Exclusive Summer Special</div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">30% OFF on Premium Wellness Packages</h2>
                <p className="text-white/90 mb-6">Indulge in our luxury wellness journey this summer with our most comprehensive spa experience. Package includes full-body massage, hot stone therapy, premium facial, and complimentary herbal tea ceremony.</p>
                <div className="mb-6">
                  <ul className="space-y-2">
                    <li className="flex items-center text-white/90">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      120-minute signature treatment
                    </li>
                    <li className="flex items-center text-white/90">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Organic aromatherapy products
                    </li>
                    <li className="flex items-center text-white/90">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Complimentary wellness gift box
                    </li>
                  </ul>
                </div>                <div className="flex gap-4">
                  <a 
                    href="tel:+918888888888"
                    className="bg-white text-purple-700 hover:bg-purple-50 py-3 px-8 rounded-md font-medium transition duration-300 flex items-center"
                  >
                    <div className="relative mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-wiggle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                        />
                      </svg>
                    </div>
                    Call Now
                  </a>
                  <button className="border border-white text-white hover:bg-white/10 py-3 px-6 rounded-md font-medium transition duration-300">
                    View Details
                  </button>
                </div>
              </div>
              <div className="w-full md:w-2/5 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-purple-900/40 backdrop-blur-sm w-36 h-36 rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-white text-4xl font-bold block">30%</span>
                      <span className="text-white text-sm uppercase tracking-wider font-medium">LIMITED OFFER</span>
                    </div>
                  </div>
                </div>
                <div className="h-full min-h-[350px] relative">
                  <Image
                    src={coupleImg}
                    alt="Premium Spa Treatment"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about their experiences at Sampurna Spa.
            </p>
          </div>
          
          <div className="relative h-[600px] mb-12">
            <ReviewSection />
          </div>
          
          <div className="text-center">
            <Link href="/contact" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Want to share your experience? Write a review
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Book Appointment CTA */}
      <section className="py-16 px-4 bg-blue-600 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience the Ultimate Relaxation?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Book your appointment today and let our experts take care of your well-being. Your journey to relaxation starts here.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">            <button className="bg-white text-blue-600 hover:bg-blue-50 py-3 px-8 rounded-md text-lg font-medium transition duration-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now: +91 8888888888
            </button>
            <Link href="/contact" className="border border-white text-white hover:bg-white/10 py-3 px-8 rounded-md text-lg font-medium transition duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}