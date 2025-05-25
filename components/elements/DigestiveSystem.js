"use client"; // Add this line at the top
import React, { useState, useEffect } from 'react'; // Add useEffect
import { motion } from 'framer-motion';
import Image from 'next/image';
// import dia from './digestive_system.png'; // Replace with the actual image path
import dia from './diagustive.png';

const DigestiveSystem = () => {
  const [activeOrgan, setActiveOrgan] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Add this useEffect to handle window check
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const organs = [
    {
      id: 'mouth',
      name: 'Mouth & Esophagus',
      description: 'Burning sensation and sour taste in throat.',
      position: {
        desktop: { top: '20%', left: '50%' },
        mobile: { top: '15%', left: '50%' },
      },
      color: '#FF6B6B',
      side: 'left',
    },
    {
      id: 'stomach',
      name: 'Stomach',
      description: 'Main source of acidity, causing heartburn and indigestion.',
      position: {
        desktop: { top: '42%', left: '52%' },
        mobile: { top: '35%', left: '52%' },
      },
      color: '#2A6177',
      side: 'right',
    },
    {
      id: 'smallIntestine',
      name: 'Small Intestine',
      description: 'Affects nutrient absorption and digestion speed.',
      position: {
        desktop: { top: '58%', left: '48%' },
        mobile: { top: '55%', left: '48%' },
      },
      color: '#4ECDC4',
      side: 'left',
    },
    {
      id: 'largeIntestine',
      name: 'Large Intestine',
      description: 'Can cause bloating and discomfort.',
      position: {
        desktop: { top: '72%', left: '50%' },
        mobile: { top: '70%', left: '50%' },
      },
      color: '#FF7F50',
      side: 'right',
    },
  ];

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div className="relative w-full rounded-b-[70px] z-10 pt-10 md:pt-20 bg-gradient-to-r from-[#988967] via-[#F7E9CC] to-[#AB9C7A]">
      <div className="w-full max-w-[1920px] mx-auto px-2 md:pl-8">
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-16"> {/* Reduced gap */}
          {/* Left side - Interactive Diagram */}
          <div className="w-full md:w-[40%] relative"> {/* Reduced width */}
            <div className="relative w-full h-[60vh] md:h-[90vh] p-2">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[90%] md:w-[90%] h-[95%]"> {/* Adjusted width */}
                  <Image
                    src={dia}
                    alt="Digestive System Diagram"
                    className="object-contain"
                    fill
                    priority
                  />
                </div>
              </div>

              {organs.map((organ) => (
                <div
                  key={organ.id}
                  className="absolute z-20"
                  style={{
                    top: isMobile
                      ? organ.position.mobile.top
                      : organ.position.desktop.top,
                    left: isMobile
                      ? organ.position.mobile.left
                      : organ.position.desktop.left,
                  }}
                >
                  <motion.div
                    className="relative"
                    initial="initial"
                    animate="animate"
                    onClick={() => setActiveOrgan(activeOrgan === organ.id ? null : organ.id)}
                  >
                    <motion.div
                      className="absolute -inset-4 md:-inset-6 rounded-full"
                      style={{ backgroundColor: organ.color }}
                      animate={{
                        opacity: [0.2, 0.1, 0.2],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />

                    <div
                      className="w-8 h-8 md:w-12 md:h-12 rounded-full relative z-30"
                      style={{
                        backgroundColor: organ.color,
                        boxShadow: `0 0 30px ${organ.color}40`,
                      }}
                    >
                      <motion.div
                        className="absolute inset-2 rounded-full bg-white/50"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    </div>
                  </motion.div>

                  {((isMobile && activeOrgan === organ.id) || !isMobile) && (
                    <div
                      className={`absolute p-2 md:p-4 bg-white rounded-lg shadow-xl border-l-4
                        ${isMobile
                          ? 'w-[200px] -translate-x-1/2 left-1/2 top-[120%]'
                          : `${organ.side === 'left' ? '-left-[220px]' : '-right-[220px]'} 
                            top-1/2 -translate-y-1/2 w-[200px]`
                        } z-[60]`} /* Adjusted tooltip width and z-index */
                      style={{
                        borderLeftColor: organ.color,
                        boxShadow: `0 4px 30px ${organ.color}30`,
                      }}
                    >
                      <h3 className="text-base md:text-lg font-bold mb-1" style={{ color: organ.color }}>
                        {organ.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600">
                        {organ.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Right side - Content and Buy Now Button */}
          <div className="w-full md:w-[60%] px-4 md:pl-12 relative z-50 md:pt-8"> {/* Increased padding, added top padding */}
            <h2 className="text-[22px] sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A6177] 
              mb-3 sm:mb-4 md:mb-6 leading-tight">
              Understanding Acidity in Your Digestive System
            </h2>

            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 
                leading-relaxed">
                  Gaining insight into acidity and its impact on your digestive system is key to maintaining balance and comfort.
                  Learn how to manage and prevent acidity for better digestive health.
                </p>

              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#2A6177]">
                  Key Benefits:
                </h3>
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 
                  text-sm sm:text-base md:text-lg text-gray-700">
                  <li>Reduces stomach acid naturally</li>
                  <li>Provides quick relief from heartburn</li>
                  <li>Supports overall digestive health</li>
                  <li>Long-lasting protection against acidity</li>
                </ul>
              </div>

              <button
                onClick={() => router.push('/product/')}
                className="mt-4 sm:mt-6 md:mt-8 bg-[#2A6177] text-white 
                px-5 sm:px-6 md:px-8 
                py-2 sm:py-3 md:py-4 
                text-sm sm:text-base md:text-lg
                rounded-full font-semibold 
                hover:bg-[#1e4757] transition-colors duration-300 
                shadow-lg hover:shadow-xl">
                <a href="/product/">
                  Buy Now
                </a>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DigestiveSystem;
