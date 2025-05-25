import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function BenefitsTimeline() {
  // const timelineData = [
  //   {
  //     day: "Day 1-7",
  //     benefit: "Initial digestive comfort improvement",
  //     description: "Experience reduced bloating and better digestion",
  //     additionalContent: {
  //       details: [
  //         "Reduced stomach discomfort",
  //         "Better nutrient absorption",
  //         "Improved gut flora balance"
  //       ],
  //       tips: "Take with warm water before meals for best results"
  //     }
  //   },
  //   {
  //     day: "Week 2-3",
  //     benefit: "Enhanced Gut Health",
  //     description: "Notice improved nutrient absorption and regular bowel movements",
  //     additionalContent: {
  //       details: [
  //         "Regular bowel movements",
  //         "Reduced acid reflux",
  //         "Better appetite control"
  //       ],
  //       tips: "Maintain consistent timing for supplement intake"
  //     }
  //   },
  //   {
  //     day: "Month 1",
  //     benefit: "Overall Wellness",
  //     description: "Feel more energetic and experience better immunity",
  //     additionalContent: {
  //       details: [
  //         "Increased energy levels",
  //         "Stronger immune system",
  //         "Better mental clarity"
  //       ],
  //       tips: "Combine with healthy diet for optimal results"
  //     }
  //   }
  // ];
  const timelineData = [
    {
      day: "Day 1-7",
      benefit: "Initial Digestive Relief",
      description: "Feel relief from bloating and improved digestion",
      additionalContent: {
        details: [
          "Reduced stomach discomfort",
          "Improved nutrient absorption",
          "Better balance of gut flora"
        ],
        tips: "Take with lukewarm water before meals for best results."
      }
    },
    {
      day: "Week 2-3",
      benefit: "Strengthened Gut Health",
      description: "Experience regular bowel movements and enhanced digestion",
      additionalContent: {
        details: [
          "Reduced acid reflux",
          "Improved appetite regulation",
          "Consistent bowel movements"
        ],
        tips: "Maintain consistent timings for taking the supplements."
      }
    },
    {
      day: "Month 1",
      benefit: "Enhanced Overall Wellness",
      description: "Feel revitalized with better energy levels and immunity",
      additionalContent: {
        details: [
          "Boosted energy levels",
          "Stronger immune response",
          "Improved mental clarity"
        ],
        tips: "Pair with a balanced diet and regular exercise for optimal results."
      }
    }
  ];

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1 // Reduced threshold for better mobile triggering
  });

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2 // Reduced stagger time for mobile
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="py-12 md:py-20 bg-white overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-5xl text-center mb-8 md:mb-16 font-bold text-[#2A6177] px-4"
      >
        Your Journey to Better Health
      </motion.h2>

      <div className="max-w-6xl mx-auto px-4" ref={ref}>
        <div className="relative">
          {/* Timeline line - Hidden on mobile */}
          <motion.div
            variants={{
              hidden: { scaleY: 0 },
              visible: {
                scaleY: 1,
                transition: { duration: 1, ease: "easeInOut" }
              }
            }}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#7D4FFF] to-[#7D4FFF] hidden md:block"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative z-10"
          >
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  } mb-8 md:mb-16`}
              >
                {/* Mobile timeline dot */}
                <div className="flex items-center mb-4 md:hidden">
                  <div className="w-4 h-4 bg-[#7D4FFF] rounded-full mr-4" />
                  <h3 className="text-xl font-bold text-[#2A6177]">{item.day}</h3>
                </div>

                <div className="w-full md:w-1/2 px-0 md:px-8">
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 1 }
                    }}
                    className="bg-white p-4 md:p-6 rounded-xl shadow-lg group hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                    style={{
                      background: "linear-gradient(145deg, #ffffff, #f3f3f3)",
                      boxShadow: "3px 3px 10px #d1d1d1, -3px -3px 10px #ffffff"
                    }}
                  >
                    {/* Main Content */}
                    <div className="relative z-10 transition-all duration-300 group-hover:translate-y-[-4px]">
                      <h3 className="hidden md:block text-lg md:text-xl font-bold text-[#2A6177] mb-2">{item.day}</h3>
                      <h4 className="text-base md:text-lg font-semibold mb-2 text-gray-800">{item.benefit}</h4>
                      <p className="text-sm md:text-base text-gray-600">{item.description}</p>
                    </div>

                    {/* Additional Content */}
                    <motion.div
                      className="mt-4 overflow-hidden transition-all duration-1000 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-6"
                      initial={false}
                    >
                      <div className="border-t pt-4">
                        <h5 className="font-semibold text-sm md:text-base text-[#2A6177] mb-2">Key Benefits:</h5>
                        <ul className="space-y-2">
                          {item.additionalContent.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center text-sm md:text-base text-gray-600">
                              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#7D4FFF] rounded-full mr-2"></span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 bg-[#f8f8f8] p-3 rounded-lg">
                          <p className="text-xs md:text-sm text-gray-600 italic">
                            💡 Tip: {item.additionalContent.tips}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Desktop timeline dot */}
                <div className="hidden md:flex w-1/2 justify-center items-center">
                  <motion.div
                    variants={{
                      hidden: { scale: 0 },
                      visible: {
                        scale: 1,
                        transition: { type: "spring", stiffness: 200, damping: 10 }
                      }
                    }}
                    className="w-6 h-6 bg-[#7D4FFF] rounded-full relative z-10 shadow-lg"
                    whileHover={{ scale: 1.2 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-[#7D4FFF] rounded-full opacity-50"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
