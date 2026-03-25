import { motion } from "framer-motion";
import { Send, Search, CheckCircle } from "lucide-react";

const HowItWorks = () => {
    const steps = [
        {
            icon: <Send className="w-8 h-8" />,
            title: "Post Food",
            desc: "List your surplus food with details and pickup location.",
            color: "bg-blue-100 text-blue-600"
        },
        {
            icon: <Search className="w-8 h-8" />,
            title: "Find Food",
            desc: "Browse through available food items in your community.",
            color: "bg-orange-100 text-orange-600"
        },
        {
            icon: <CheckCircle className="w-8 h-8" />,
            title: "Collect Food",
            desc: "Request and pick up the food to reduce waste.",
            color: "bg-green-100 text-green-600"
        }
    ];

    return (
        <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-black text-gray-900 mb-4 font-outfit"
                    >
                        How It <span className="text-orange-600">Works</span>
                    </motion.h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Simple steps to make a huge impact in your community and reduce food waste.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="relative group p-8 rounded-3xl hover:bg-gray-50 transition-all duration-500"
                        >
                            <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform`}>
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-outfit">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed italic border-l-4 border-orange-500 pl-4">
                                {step.desc}
                            </p>
                            
                            {idx < 2 && (
                                <div className="hidden lg:block absolute top-1/3 -right-6 text-gray-200">
                                    <ArrowRight size={40} />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ArrowRight = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default HowItWorks;
