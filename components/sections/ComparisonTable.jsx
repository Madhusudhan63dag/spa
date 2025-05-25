import arrow from '@/assets/female_arrow.png'
import Image from 'next/image';

export default function ComparisonTable() {
  const features = [
    "Natural Ingredients",
    "No Side Effects",
    "Clinically Tested",
    "Ayurvedic Formula",
    "Quick Results",
    "Money Back Guarantee"
  ];

  return (
    <div className="py-16 bg-[#111111]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl text-center mb-16 font-bold text-white">
          Why Choose Sampoorna Arogya?
        </h2>
        <div className="overflow-x-auto flex items-center justify-center">
          <Image src={arrow} className='w-2/6' />
          <table className="w-4/6">
            <thead>
              <tr className="bg-[#2A6177]">
                <th className="px-6 py-4 text-left rounded-tl-lg text-white">Features</th>
                <th className="px-6 py-4 text-center text-white">Sampoorna Arogya</th>
                <th className="px-6 py-4 text-center text-white">Other Brands</th>
                <th className="px-6 py-4 text-center rounded-tr-lg text-white">Generic Products</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className={`
                  ${index % 2 === 0 ? 'bg-[#1a1a1a]' : 'bg-[#222222]'}
                  transition-colors duration-200
                `}>
                  <td className="px-6 py-4 text-gray-300">{feature}</td>
                  <td className="px-6 py-4 text-center text-green-400">✓</td>
                  <td className="px-6 py-4 text-center text-red-400">✗</td>
                  <td className="px-6 py-4 text-center text-red-400">✗</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
