"use client";
import { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import Image from 'next/image';
import reviewImage from '../../assets/face/two.jpg'; // Add your image to assets folder
// import one from '../../assets/face/one.avif'
// import two from '../../assets/face/two.jpg'
import three from '../../assets/face/three.png'
import four from '../../assets/face/four.png'
import five from '../../assets/face/five.jpg'
import six from '../../assets/face/six.jpg'
import seven from '../../assets/face/seven.png'
import eight from '../../assets/face/eight.png'
import nine from '../../assets/face/nine.avif'
import ten from '../../assets/face/ten.png'
import ten_one from '../../assets/face/ten_one.jpg'
import ten_two from '../../assets/face/ten_two.jpeg'

const reviews = [
    {
        name: "John Doe",
        review: "Amazing product! Really helped with my digestion.",
        rating: 5,
        designation: "Verified Buyer",
        location: "Bangalore",
        date: "1 months ago",
        image: ten_one // Use local image
        // image: "https://ui-avatars.com/api/?name=John+Doe&background=2A6177&color=fff" // Added image URL
    },
    {
        name: "Sophia Davis",
        review: "Been using for 3 months, noticed great improvement.",
        rating: 4.5,
        designation: "Regular Customer",
        location: "Mumbai",
        date: "2 month ago",
        image: ten // Use local image
    },
    {
        name: "Mike Johnson",
        review: "Natural and effective solution.",
        rating: 5,
        designation: "Health Expert",
        location: "Delhi",
        date: "3 months ago",
        image: three // Use local image
    },
    {
        name: "John Doe",
        review: "Amazing product! Really helped with my digestion.",
        rating: 5,
        designation: "Verified Buyer",
        location: "Bangalore",
        date: "2 months ago",
        image: four // Use local image
    },
    {
        name: "Jane Smith",
        review: "Been using for 3 months, noticed great improvement.",
        rating: 4.5,
        designation: "Regular Customer",
        location: "Mumbai",
        date: "4 month ago",
        image: five // Use local image
    },
    {
        name: "Mike Johnson",
        review: "Natural and effective solution.",
        rating: 5,
        designation: "Health Expert",
        location: "Delhi",
        date: "5 months ago",
        image: six // Use local image
    },
    {
        name: "John Doe",
        review: "Amazing product! Really helped with my digestion.",
        rating: 5,
        designation: "Verified Buyer",
        location: "Bangalore",
        date: "8 months ago",
        image: seven // Use local image
    },
    {
        name: "Jane Smith",
        review: "Been using for 3 months, noticed great improvement.",
        rating: 4.5,
        designation: "Regular Customer",
        location: "Mumbai",
        date: "8 month ago",
        image: eight // Use local image
    },
    {
        name: "Mike Johnson",
        review: "Natural and effective solution.",
        rating: 5,
        designation: "Health Expert",
        location: "Delhi",
        date: "10 months ago",
        image: nine // Use local image
    }
];

const StarRating = ({ rating, userImage, userName }) => (
    <div className="flex items-center gap-2 md:gap-4">
        <div className="w-8 h-8 md:w-12 md:h-12 relative rounded-full overflow-hidden flex-shrink-0">
            <Image
                src={userImage}
                alt={`Profile picture of ${userName}`}
                fill
                className="object-cover"
            />
        </div>
        <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
                <svg
                    key={i}
                    className={`w-3 h-3 md:w-4 md:h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    </div>
);

export default function ReviewSection() {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);

    useEffect(() => {
        const Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies;

        engineRef.current = Engine.create({
            gravity: { x: 0, y: 0.5 }  // Reduced gravity for slower movement
        });

        const render = Render.create({
            element: sceneRef.current,
            engine: engineRef.current,
            options: {
                width: sceneRef.current.clientWidth,
                height: 300,
                wireframes: false,
                background: 'transparent'
            }
        });

        // Create bounds with rounded corners
        const ground = Bodies.rectangle(
            render.options.width / 2,
            render.options.height + 30,
            render.options.width,
            60,
            {
                isStatic: true,
                render: { fillStyle: 'transparent' }
            }
        );

        // Create floating bubbles with brand colors
        const bubbles = Array(8).fill().map(() => {
            const size = Math.random() * 20 + 10;
            return Bodies.circle(
                Math.random() * render.options.width,
                Math.random() * render.options.height,
                size,
                {
                    restitution: 0.8,
                    friction: 0.005,
                    render: {
                        fillStyle: Math.random() > 0.5 ? '#2A6177' : '#43c3ff',
                        opacity: 0.6
                    }
                }
            );
        });

        World.add(engineRef.current.world, [ground, ...bubbles]);

        Engine.run(engineRef.current);
        Render.run(render);

        return () => {
            Render.stop(render);
            World.clear(engineRef.current.world);
            Engine.clear(engineRef.current);
            render.canvas.remove();
        };
    }, []);

    return (
        <div className="relative w-full md:rounded-br-[200px] rounded-br-[100px] overflow-hidden bg-black/95 py-8 md:py-16">
            <div className="absolute inset-0 z-0">
                <div ref={sceneRef} className="w-full h-[300px]" />
            </div>

            <div className="relative z-10">
                <h2 className="text-2xl md:text-5xl text-center mb-8 md:mb-16 font-bold text-white px-4">
                    What Our Customers Say
                </h2>

                <div className="flex flex-col md:flex-row gap-4 md:gap-8 px-4">
                    {/* Image Section */}
                    <div className="md:w-2/5 hidden md:block relative min-h-[200px] md:min-h-[400px] rounded-xl md:rounded-2xl overflow-hidden">
                        <Image
                            src={ten_two}
                            alt="Customer Review Showcase"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-4 md:p-8">
                            <h3 className="text-xl md:text-2xl font-bold text-white">Real Stories</h3>
                            <p className="text-sm md:text-base text-white/80">From Our Valued Customers</p>
                        </div>
                    </div>

                    {/* Reviews Grid */}
                    <div className="md:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        {reviews.slice(0, 6).map((review, index) => ( // Reduced to 6 reviews for mobile
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl p-4 md:p-6 border border-white/10
                                         hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="flex flex-col h-full">
                                    <div className="mb-3 md:mb-4">
                                        <StarRating rating={review.rating} userImage={review.image} userName={review.name} />
                                    </div>

                                    <p className="text-white/90 flex-grow mb-3 md:mb-4 text-base md:text-lg font-medium">
                                        "{review.review}"
                                    </p>

                                    <div className="border-t border-white/10 pt-3 md:pt-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-semibold text-sm md:text-base text-white">{review.name}</h4>
                                                <p className="text-xs md:text-sm text-white/60">{review.designation}</p>
                                            </div>
                                            <div className="text-right text-xs md:text-sm text-white/60">
                                                <p>{review.location}</p>
                                                <p>{review.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
