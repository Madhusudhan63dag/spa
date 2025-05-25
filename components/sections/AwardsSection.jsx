import Image from 'next/image';
import one from '@/assets/t_one.svg'
import two from '@/assets/t_two.svg'
import three from '@/assets/t_three.svg'
import four from '@/assets/t_four.png'
import five from '@/assets/hala.png'
import six from '@/assets/t_six.png'
import seven from '@/assets/t_seven.png'

export default function AwardsSection() {
  // const awards = [
  //   {
  //     title: "GMP Certified",
  //     image: one,
  //     description: "Good Manufacturing Practice Certified"
  //   },
  //   {
  //     title: "ISO 9001:2015",
  //     image: two,
  //     description: "Quality Management System"
  //   },
  //   {
  //     title: "Made in India",
  //     image: three,
  //     description: "100% Natural Ingredients and Made in India"
  //   },
  //   {
  //     title: "FSSAI Certified",
  //     image: four,
  //     description: "Food Safety Certification",
  //     customSize: true // Add this flag for FSSAI certificate
  //   },
  //   {
  //     title: "Halal Certified",
  //     image: five,
  //     description: "Halal Certification"
  //   },
  //   {
  //     title: "Quality Assured",
  //     image: six,
  //     description: "Premium Quality Products"
  //   },
  //   {
  //     title: "Research Backed",
  //     image: seven,
  //     description: "Scientifically Proven Results"
  //   }
  // ];
  const awards = [
    {
      title: "GMP Certified",
      image: six,
      description: "Good Manufacturing Practice Certified"
    },
    {
      title: "ISO 9001:2015",
      image: three,
      description: "Quality Management System"
    },
    {
      title: "Made in India",
      image: one,
      description: "100% Natural Ingredients and Made in India"
    },
    {
      title: "No Side Effects",
      image: two,
      description: "You can trust us",
    },
    {
      title: "Ayush Certified",
      image: four,
      description: "Premium Quality Products",
      // customSize: true // Add this flag for FSSAI certificate
    },
    {
      title: "Cruelty Free",
      image: seven,
      description: "Not tested on animals"
    }
  ];

  // Double the awards array for seamless infinite scroll
  const slideContent = [...awards, ...awards];

  return (
    <div className="py-16 bg-[#8de8f825] overflow-hidden">
      <h2 className="text-3xl md:text-5xl text-center mb-16 font-bold text-[#2A6177]">
        Awards & Certifications
      </h2>

      <div className="relative w-full">
        <div className="flex animate-slide">
          {slideContent.map((award, index) => (
            <div
              key={index}
              className="flex-none w-[300px] mx-4 bg-white rounded-xl p-6 text-center"
              style={{ animation: 'none' }}
            >
              <div className={`mx-auto mb-4 relative ${award.customSize ? 'w-20 h-16 mb-16' : 'w-24 h-24'}`}>
                <Image
                  src={award.image}
                  alt={`${award.title} - ${award.description}`}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-[#2A6177] mb-2">{award.title}</h3>
              <p className="text-gray-600">{award.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
