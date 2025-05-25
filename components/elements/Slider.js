import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, EffectFade, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import img1 from '../../assets/ing/download.jpeg';
import img2 from '../../assets/ing/download1.jpeg';
import img3 from '../../assets/ing/download2.jpeg';
import img5 from '../../assets/ing/download4.jpeg';
import img6 from '../../assets/ing/download5.jpeg';
import img7 from '../../assets/ing/download6.jpeg';
import img8 from '../../assets/ing/download7.jpeg';
import img9 from '../../assets/ing/download8.jpeg';

const MobileSlider = ({ ingredients }) => {
    return (
        <div className="block md:hidden w-full h-[300px]">
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                speed={300}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                className="w-full h-full"
            >
                {ingredients.map((ingredient, index) => (
                    <SwiperSlide
                        key={index}
                        className="w-full h-[300px] relative rounded-xl overflow-hidden"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${ingredient.image.src})`
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-4">
                            <h3 className="text-white text-lg font-bold mb-2">
                                {ingredient.title}
                            </h3>
                            <p className="text-white/90 text-sm leading-relaxed">
                                {ingredient.description}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

const Slider = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 500, height: 500 }); // Add default dimensions

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth < 768);
            // Pre-load images to get dimensions
            const img = new Image();
            img.src = img1.src;
            img.onload = () => {
                setDimensions({
                    width: img.width,
                    height: img.height
                });
            };
        }
    }, []);

    const ingredients = [
        {
            image: { src: img1.src, width: dimensions.width, height: dimensions.height },
            title: "Amla",
            description: "A rich source of Vitamin C, known for boosting immunity, improving skin health, and reducing stress.",
            alt: "Amla fruit illustration"
        },
        {
            image: { src: img2.src, width: dimensions.width, height: dimensions.height },
            title: "Chitrak",
            description: "An Ayurvedic herb that supports digestive health, aids detoxification, and boosts metabolism.",
            alt: "Chitrak root illustration"
        },
        {
            image: { src: img3.src, width: dimensions.width, height: dimensions.height },
            title: "Nagarmotha",
            description: "An aromatic herb that enhances digestion, balances metabolism, and supports overall well-being.",
            alt: "Nagarmotha plant illustration"
        },
        {
            image: { src: img5.src, width: dimensions.width, height: dimensions.height },
            title: "Harad",
            description: "A traditional digestive aid that cleanses the body, rejuvenates cells, and promotes longevity.",
            alt: "Harad fruit illustration"
        },
        {
            image: { src: img6.src, width: dimensions.width, height: dimensions.height },
            title: "Giloy",
            description: "A versatile herb known for its anti-inflammatory, immunity-boosting, and detoxifying properties.",
            alt: "Giloy stem illustration"
        },
        {
            image: { src: img7.src, width: dimensions.width, height: dimensions.height },
            title: "Nisoth",
            description: "A potent herb that supports digestive cleansing, reduces bloating, and promotes healthy metabolism.",
            alt: "Nisoth root illustration"
        },
        {
            image: { src: img8.src, width: dimensions.width, height: dimensions.height },
            title: "Adrak",
            description: "A powerful spice with anti-inflammatory properties, known for aiding digestion and relieving nausea.",
            alt: "Ginger root illustration"
        },
        {
            image: { src: img9.src, width: dimensions.width, height: dimensions.height },
            title: "Jeera",
            description: "A fragrant spice that aids in digestion, reduces acidity, and promotes overall gut health.",
            alt: "Cumin seed illustration"
        },
    ];

    console.log(ingredients[0].image);

    return (
        <div className='w-full relative -top-16 pt-20 flex justify-center items-center flex-col px-2 md:px-20 py-16 md:py-28 bg-black/95'>
            <style jsx global>{`
                .swiper-slide {
                    opacity: 1 !important;
                    filter: none !important;
                    transition: transform 0.3s !important;
                }
                @media (min-width: 768px) {
                    .swiper-slide {
                        max-width: 500px !important;
                        max-height: 500px !important;
                    }
                }
            `}</style>
            <h1 className='text-2xl md:text-6xl text-center mb-8 md:mb-16 text-white'>KEY INGREDIENTS</h1>

            {/* Mobile Slider */}
            <MobileSlider ingredients={ingredients} />

            {/* Desktop Slider */}
            <div className='hidden md:block w-full h-[500px]'>
                <Swiper
                    effect="coverflow"  // Remove conditional fade effect
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView="auto"  // Change to auto for better mobile handling
                    spaceBetween={20}
                    initialSlide={2}
                    speed={800}
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                    }}
                    coverflowEffect={{
                        rotate: 15,
                        stretch: 0,
                        depth: isMobile ? 50 : 100,
                        modifier: isMobile ? 1 : 2,
                        slideShadows: false,
                    }}
                    breakpoints={{
                        320: {  // Add mobile breakpoint
                            slidesPerView: 1.2,
                            effect: "coverflow",
                        },
                        768: {
                            effect: "coverflow",
                            slidesPerView: 1.8,
                            spaceBetween: 40,
                            coverflowEffect: {
                                rotate: 15,
                                stretch: 0,
                                depth: 50,  // Reduced from 100
                                modifier: 1,  // Reduced from 2
                                slideShadows: false,
                            }
                        },
                        1024: {
                            effect: "coverflow",
                            slidesPerView: 2.2,
                            spaceBetween: 50,
                            coverflowEffect: {
                                rotate: 15,
                                stretch: 0,
                                depth: 50,  // Reduced from 100
                                modifier: 1,  // Reduced from 2
                                slideShadows: false,
                            }
                        }
                    }}
                    modules={[EffectCoverflow, EffectFade, Pagination, Autoplay]}
                    className="swiper-container !overflow-visible rtl"
                >
                    {ingredients.map((ingredient, index) => (
                        <SwiperSlide
                            key={index}
                            className={`swiper-slide ${isMobile ? 'w-[280px] h-[250px]' : '!w-[500px] !h-[500px]'
                                } relative rounded-xl overflow-hidden`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-no-repeat bg-center"
                                style={{
                                    backgroundImage: `url(${ingredient.image.src})`,
                                    maxWidth: '500px',
                                    maxHeight: '500px',
                                    width: '100%',
                                    height: '100%'
                                }}
                                role="img"
                                aria-label={ingredient.alt}
                            />
                            <div className={`absolute inset-0 ${isMobile
                                ? 'bg-gradient-to-t from-black/70 via-black/40 to-transparent'
                                : 'bg-gradient-to-t from-black/60 via-black/30 to-transparent'
                                } flex flex-col justify-end p-4 md:p-8`}>
                                <h3 className="text-white text-lg md:text-2xl font-bold mb-2">
                                    {ingredient.title}
                                </h3>
                                <p className="text-white/90 text-sm md:text-base leading-relaxed">
                                    {ingredient.description}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Slider;
