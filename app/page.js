"use client";
import { Plus, Minus } from "lucide-react"; // Add this import at the top
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation'; // Add this import
import Navbar from '../components/elements/Navbar'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer'; // Add this import
import LoadingScreen from '../components/elements/LoadingScreen';

import ReviewSection from '../components/elements/ReviewSection';
import BenefitsTimeline from '@/components/sections/BenefitsTimeline';
import AwardsSection from '@/components/sections/AwardsSection';
import ComparisonTable from '@/components/sections/ComparisonTable';
import Footer from '@/components/elements/Footer';

import logo from './just_logo.png'
import harbel from '../assets/harbel.png'
import heart from '../assets/heart.png'
import relief from '../assets/relief.png'
import bloating from '../assets/bloating.png'
import product1 from '../assets/product_des.jpg'
import heroLarge from '../assets/test/1400x400.jpg';
import heroMedium from '../assets/test/480x250.jpg';
import heroSmall from '../assets/test/1920x1281.jpg';
import Slider from '../components/elements/Slider';
import smallbanner from '../assets/test/1400x400.jpg';
import smallbanner1 from '../assets/test/1400x400_1.jpg';
import banner1 from '@/assets/5.jpg';
import banner2 from '@/assets/4.jpg';



// Add this dynamic import
const DigestiveSystem = dynamic(() => import('../components/elements/DigestiveSystem'), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-screen rounded-b-[70px] bg-gradient-to-r from-[#988967] via-[#F7E9CC] to-[#AB9C7A] animate-pulse" />
  )
});

export default function Home() {
  const router = useRouter(); // Add this line
  const videoRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const scrollRef = useRef(null);
  const lastScrollY = useRef(0);
  const initialScrollPosition = useRef(null);
  const videoSectionReached = useRef(false);

  // Add gradient animation state
  const [gradientPosition, setGradientPosition] = useState(0);

  // Add this new state for FAQ
  const [openFaq, setOpenFaq] = useState(null);
  const faqData = [
    {
      question: "What are the main benefits of Sampoorna Arogya?",
      answer: "Sampoorn Arogya provides comprehensive digestive health support through a blend of Ayurvedic herbs. It helps alleviate bloating, indigestion, and supports a healthy gut microbiome."
    },
    {
      question: "How should I take Sampoorna Arogya products?",
      answer: "Our syrup and tablets are best consumed before meals with lukewarm water. Detailed instructions are provided with each product, or you can consult your healthcare provider."
    },
    {
      question: "Are there any side effects?",
      answer: "Sampoorn Arogya is made from 100% natural ingredients and is generally safe for consumption."
    },
    {
      question: "How long does it take to see results?",
      answer: "Most users notice initial improvements within the first week. Consistent use over 2-3 weeks enhances results, with significant benefits evident after one month."
    },
    {
      question: "Can Sampoorn Arogya be used for chronic digestive issues?",
      answer: "While our products support overall gut health, individuals with chronic conditions should consult a healthcare provider before use. Our supplements work best as part of a holistic health regimen."
    },
    {
      question: "What makes Sampoorn Arogya different from other digestive supplements?",
      answer: "Our products are rooted in Ayurvedic traditions, using time-tested herbs and natural ingredients. Unlike synthetic supplements, Sampoorn Arogya offers a gentle yet effective approach to digestive wellness."
    }
  ];


  // Add scroll instance ref
  const locomotiveScrollRef = useRef(null);

  // Add these refs for animations
  const [featureRef, featureInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const [benefitsRef, benefitsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const [productRef, productInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  // Add CSS classes for animations
  const fadeInUp = "transition-all duration-700 ease-out";
  const fadeInUpVisible = "translate-y-0 opacity-100";
  const fadeInUpHidden = "translate-y-10 opacity-0";

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPosition((prev) => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Cleanup function to destroy previous scroll instance
    if (locomotiveScrollRef.current) {
      locomotiveScrollRef.current.destroy();
    }

    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      locomotiveScrollRef.current = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
        multiplier: 0.7,
        lerp: 0.07,
        resetNativeScroll: true, // Add this
        reloadOnContextChange: true // Add this
      });

      // Reset scroll position
      window.scrollTo(0, 0);

      locomotiveScrollRef.current.on("scroll", ({ scroll }) => {
        if (!videoRef.current) return;

        const rect = videoRef.current.getBoundingClientRect();
        const offsetTop = rect.top;
        const triggerPoint = window.innerHeight * 0.3;

        if (offsetTop <= triggerPoint) {
          const progress = Math.min(1, (triggerPoint - offsetTop) / triggerPoint);
          const scale = Math.max(0.4, 1 - (progress * 0.6));

          videoRef.current.style.transform = `scale(${scale})`;
          videoRef.current.style.opacity = '1';

          if (leftTextRef.current && rightTextRef.current) {
            const textOpacity = Math.min(1, progress * 1.5);
            leftTextRef.current.style.opacity = textOpacity;
            rightTextRef.current.style.opacity = textOpacity;
          }
        } else {
          videoRef.current.style.transform = 'scale(1)';
          videoRef.current.style.opacity = '1';
          if (leftTextRef.current && rightTextRef.current) {
            leftTextRef.current.style.opacity = '0';
            rightTextRef.current.style.opacity = '0';
          }
        }
      });
    })();

    return () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
        locomotiveScrollRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    let player;

    window.onYouTubeIframeAPIReady = () => {
      player = new window.YT.Player(videoRef.current, {
        events: {
          onStateChange: (event) => {
            setIsVideoPlaying(event.data === window.YT.PlayerState.PLAYING);
          }
        }
      });
    };

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, []);

  // Add this new useEffect after your existing useEffects
  useEffect(() => {
    if (!videoRef.current) return;

    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    let player;

    window.onYouTubeIframeAPIReady = () => {
      player = new window.YT.Player(videoRef.current, {
        events: {
          onReady: (event) => {
            // Start playing when ready
            event.target.playVideo();
            setIsVideoPlaying(true);
          },
          onStateChange: (event) => {
            setIsVideoPlaying(event.data === window.YT.PlayerState.PLAYING);
          }
        }
      });
    };

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, []);

  useEffect(() => {
    // Function to check if all images are loaded
    const checkImagesLoaded = () => {
      const images = document.querySelectorAll('img');
      const totalImages = images.length;
      let loadedImages = 0;

      function imageLoaded() {
        loadedImages++;
        if (loadedImages === totalImages) {
          setTimeout(() => setIsLoading(false), 1000); // Add a small delay for smoother transition
        }
      }

      images.forEach(img => {
        if (img.complete) {
          imageLoaded();
        } else {
          img.addEventListener('load', imageLoaded);
          img.addEventListener('error', imageLoaded); // Handle error cases
        }
      });
    };

    // Check images after the component mounts
    checkImagesLoaded();

    // Additional check after a timeout in case some resources are slow
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 seconds maximum loading time

    return () => clearTimeout(timeoutId);
  }, []);

  const handleVideoControl = () => {
    const iframe = videoRef.current;
    const player = iframe.contentWindow;

    if (isVideoPlaying) {
      player.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    } else {
      player.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
  };

  return (
    <>
      <LoadingScreen isVisible={isLoading} />
      <div className="flex relative overflow-x-hidden min-h-screen">
        {/* Navbar container */}
        <div className='fixed left-0 top-0 md:w-1/5 w-full h-auto md:h-screen bg-transparent z-[999]'>
          <Navbar />
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-[21%] ml-0 mt-[60px] md:mt-0 relative" data-scroll-container>
          <main className="w-full flex flex-col">
            {/* Hero Section */}
            <section className='relative w-full h-[30vh] md:h-screen'>
              {/* Background Image Container */}
              <div className="absolute inset-0 w-full h-full">
                <picture className="w-full h-full block">
                  {/* Desktop image */}
                  <source
                    media="(min-width: 768px)"
                    srcSet={heroSmall.src}
                  />
                  {/* Mobile image */}
                  <source
                    media="(max-width: 767px)"
                    srcSet={heroSmall.src}
                  />
                  <Image
                    src={heroSmall}
                    alt="Sampoorna Arogya Hero Background"
                    fill
                    priority
                    sizes="(max-width: 767px) 480px, 1920px"
                    quality={85}
                  />
                </picture>
              </div>

              {/* Content Container */}
              <div className='relative z-10 w-full h-full flex flex-col max-w-[1440px] mx-auto px-4 md:px-8'>
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
              </div>
            </section>

            {/* Awards Section - Make it responsive */}
            <div className="px-4 md:px-0">
              <AwardsSection />
            </div>

            {/* Video Section */}
            <div className='w-full min-h-[50vh] md:min-h-screen flex-none relative'>
              {/* Mobile Layout */}
              <div className="md:hidden w-full space-y-6 px-4 py-8 bg-white">
                <div className="grid grid-cols-2 gap-4 justify-items-center">
                  <Image
                    src={harbel}
                    alt="Natural Herbal Ingredients Icon"
                    className='w-16 h-16 object-contain'
                  />
                  <Image
                    src={heart}
                    alt="Heart Health Icon"
                    className='w-16 h-16 object-contain'
                  />
                </div>

                {/* Mobile Video Container */}
                <div className="w-full aspect-video relative rounded-lg overflow-hidden">
                  <iframe
                    ref={videoRef}
                    src="https://www.youtube.com/embed/xSMxe1Igfv4?enablejsapi=1&autoplay=1&mute=0&controls=0&rel=0&loop=1&playlist=xSMxe1Igfv4&playsinline=1&vq=hd1080"
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className='absolute inset-0 w-full h-full'
                  ></iframe>
                </div>

                <div className="grid grid-cols-2 gap-4 justify-items-center">
                  <Image
                    src={relief}
                    alt="Quick Relief Icon"
                    className='w-16 h-16 object-contain'
                  />
                  <Image
                    src={bloating}
                    alt="Anti-Bloating Icon"
                    className='w-20 h-20 object-contain'
                  />
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:block w-full h-full">
                {/* Left text */}
                <div
                  ref={leftTextRef}
                  className='absolute left-10 top-1/2 -translate-y-1/2 max-w-[300px]  text-black space-y-4 opacity-0 transition-opacity duration-300 z-[60] pointer-events-none'
                >
                  {/* <p className='text-lg'>
                    Experience the power of natural healing with our holistic approach to digestive wellness.
                  </p> */}
                  <div className='flex items-center gap-2'>
                    <Image
                      src={relief}
                      alt="Quick Relief Icon"
                      className='w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-300'
                    />
                    <h3 className='text-2xl font-semibold'>Secure Payment</h3>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Image
                      src={bloating}
                      alt="Anti-Bloating Icon"
                      className='w-28 h-28 object-contain group-hover:scale-110 transition-transform duration-300'
                    />
                    <h3 className='text-2xl font-semibold'>100% Guarentee</h3>
                  </div>
                </div>

                {/* YouTube video container with custom controls */}
                <div className="absolute inset-0" style={{ pointerEvents: 'auto' }}>
                  <div className="relative w-full h-full group">
                    <iframe
                      ref={videoRef}
                      src="https://www.youtube.com/embed/xSMxe1Igfv4?enablejsapi=1&autoplay=1&mute=0&controls=0&rel=0&loop=1&playlist=xSMxe1Igfv4&playsinline=1&vq=hd1080"
                      title="YouTube video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className='w-full h-full transition-transform duration-150 ease-linear cursor-default'
                      style={{ pointerEvents: 'none' }}
                    ></iframe>

                    {/* Custom play/pause button */}
                    <button
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-16 h-16 rounded-full 
                                 flex items-center justify-center
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                 pointer-events-auto cursor-pointer"
                      onClick={handleVideoControl}
                    >
                      <div className="w-6 h-6">
                        {isVideoPlaying ? (
                          <div></div>
                          // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          //   <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                          // </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Right text */}
                <div
                  ref={rightTextRef}
                  className='absolute right-10 top-1/2 -translate-y-1/2 max-w-[300px] text-[#2E6572] space-y-4 text-right opacity-0 transition-opacity duration-300 z-[60] pointer-events-none'
                >
                  {/* <h3 className='text-2xl font-semibold'>Natural Solutions</h3>
                  <p className='text-lg'>
                    Discover traditional remedies combined with modern wellness practices for optimal digestive health.
                  </p> */}
                  <div className="flex items-center gap-2 justify-end">

                    <Image
                      src={harbel}
                      alt="Natural Herbal Ingredients Icon"
                      className='w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300'
                    />
                    <h3 className='text-2xl w-1/2 font-semibold'>Trusted by Professionals</h3>

                  </div>
                  <div className="flex items-center gap-2 justify-end">
                    <Image
                      src={heart}
                      alt="Heart Health Icon"
                      className='w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300'
                    />
                    <h3 className='text-2xl w-1/2 font-semibold'>Fast Delivery</h3>
                  </div>

                </div>

                {/* Scrollability overlay */}
                <div
                  className="absolute inset-0 z-[55]"
                  style={{
                    pointerEvents: 'none',
                    background: 'transparent'
                  }}
                ></div>
              </div>
            </div>


            <DigestiveSystem />


            {/* Swiper Section - Updated to fix overlapping */}
            <Slider />




            {/* Product Sections - Updated for mobile */}
            {/* <div ref={productRef} className='w-full p-4 md:p-6' >
              <div
                className={`flex flex-col md:flex-row justify-center gap-6 md:gap-10 items-center ${fadeInUp}`}
                style={{
                  transform: productInView ? 'translateY(0)' : 'translateY(50px)',
                  opacity: productInView ? 1 : 0,
                  transitionDelay: '200ms'
                }}
              >
                <div className='w-full md:w-1/2'>
                  <Image src={banner1} alt="Sampoorna Arogya Product" className='w-full rounded-lg' />
                </div>
                <div className='w-full md:w-1/2 space-y-4'>
                  <h1 className='text-2xl md:text-3xl font-bold'>Tailwind CSS Component</h1>
                  <p className='text-sm md:text-base'>Yes, there are several alternative tools related to Google that can help with PPC campaign management, keyword research, and competitor analysis.</p>
                  <Button className="bg-[#cf1cff] px-6 py-3 md:px-9 md:py-5 text-base md:text-xl w-full md:w-auto">Buy Now</Button>
                </div>
              </div>
              <div
                className={`flex flex-col md:flex-row justify-center gap-6 md:gap-10 items-center mt-10 ${fadeInUp}`}
                style={{
                  transform: productInView ? 'translateY(0)' : 'translateY(50px)',
                  opacity: productInView ? 1 : 0,
                  transitionDelay: '400ms'
                }}
              >
                <div className='w-full md:w-1/2'>
                  <h1 className='text-3xl'>Tailwind CSS Component</h1>
                  <p>Yes, there are several alternative tools related to Google that can help with PPC campaign management, keyword research, and competitor analysis. These tools leverage Google’s data and insights to help businesses optimize their digital advertising strategies. Here’s a list of alternatives:</p>
                  <Button className="bg-[#cf1cff] px-9 py-5 text-xl">Buy Now</Button>
                </div>
                <div className='w-full md:w-1/2'>
                  <Image src={banner2} alt="Sampoorna Arogya Product" className='w-full' />
                </div>
              </div>
            </div> */}
            <div ref={productRef} className='w-full p-4 md:p-6'>
              <div
                className={`flex flex-col md:flex-row justify-center gap-6 md:gap-10 items-center ${fadeInUp}`}
                style={{
                  transform: productInView ? 'translateY(0)' : 'translateY(50px)',
                  opacity: productInView ? 1 : 0,
                  transitionDelay: '200ms'
                }}
              >
                <div className='w-full md:w-1/2'>
                  <Image src={banner1} alt="Sampoorn Arogya Syrup" className='w-full rounded-lg' />
                </div>
                <div className='w-full md:w-1/2 space-y-4'>
                  <h1 className='text-2xl md:text-5xl font-bold'>Boost Your Digestion Naturally</h1>
                  <p className='text-sm md:text-lg'>Sampoorn Arogya provides holistic Ayurvedic remedies to support optimal digestion and enhance your overall well-being. Embrace the natural path to health with our specially crafted syrups and tablets.</p>
                  <Button className="bg-[#cf1cff] px-6 py-3 md:px-9 md:py-5 text-base md:text-xl w-full md:w-auto"><a href="/product"> Buy Now</a></Button>
                </div>
              </div>
              <div
                className={`flex flex-col md:flex-row justify-center gap-6 md:gap-10 items-center mt-10 ${fadeInUp}`}
                style={{
                  transform: productInView ? 'translateY(0)' : 'translateY(50px)',
                  opacity: productInView ? 1 : 0,
                  transitionDelay: '400ms'
                }}
              >
                <div className='w-full md:w-1/2'>
                  <h1 className='text-3xl md:text-5xl font-bold'>Ayurvedic Wellness for All</h1>
                  <p className="text-sm md:text-lg">
                    Sampoorn Arogya delivers a comprehensive Ayurvedic approach to promote healthy digestion and support gut wellness. Our carefully crafted syrups and tablets, featuring potent ingredients like Triphala, Jeera, and Ajwain, offer natural relief from digestive discomforts such as bloating, indigestion, and constipation. These formulations not only aid in detoxifying the body and improving metabolism but also boost your immunity, ensuring overall health and vitality. Trust Sampoorn Arogya for a gentle, effective, and holistic solution to your digestive needs.
                  </p>
                  <Button className="bg-[#cf1cff] px-9 py-5 text-xl"><a href="/product"> Buy Now</a></Button>
                </div>
                <div className='w-full md:w-1/2'>
                  <Image src={banner2} alt="Sampoorn Arogya Tablets" className='w-full' />
                </div>
              </div>
            </div>








            {/* Add this before the FAQ section */}
            <div className="w-full">
              <ReviewSection />
            </div>

            {/* Add these sections before the FAQ section */}
            <div
              ref={benefitsRef}
              className={`${fadeInUp} bg-white`}
              style={{
                transform: benefitsInView ? 'translateY(0)' : 'translateY(50px)',
                opacity: benefitsInView ? 1 : 0,
              }}>
              <BenefitsTimeline />
            </div>



            <ComparisonTable />

            {/* FAQ Section - Updated for mobile */}
            <div className="w-full bg-[#8de8f825] px-4 md:px-20 py-8 md:py-16 flex-none">
              <h1 className="text-3xl md:text-5xl text-center mb-8 md:mb-12">Frequently Asked Questions</h1>
              <div className="max-w-3xl mx-auto space-y-4">
                {faqData.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                    style={{
                      transform: `translateY(${openFaq === index ? '0' : '20px'})`,
                      opacity: openFaq === index ? 1 : 0.7,
                      transition: 'all 0.5s ease',
                      transitionDelay: `${index * 100}ms`
                    }}
                  >
                    <button
                      className="w-full px-6 py-4 text-left flex items-center justify-between"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      <span className="text-lg font-medium text-[#2A6177]">{faq.question}</span>
                      {openFaq === index ? (
                        <Minus className="h-5 w-5 text-[#2A6177]" />
                      ) : (
                        <Plus className="h-5 w-5 text-[#2A6177]" />
                      )}
                    </button>
                    <div
                      className={`px-6 transition-all duration-300 ease-in-out ${openFaq === index ? "max-h-40 py-4" : "max-h-0"
                        } overflow-hidden`}
                    >
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Section */}
            <Footer />
          </main>
        </div>
      </div>
    </>
  )
}