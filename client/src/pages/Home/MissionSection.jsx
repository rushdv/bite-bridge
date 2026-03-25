import { motion } from "framer-motion";
import { Heart, Users, Globe, Award } from "lucide-react";

const MissionSection = () => {
    const stats = [
        { icon: <Heart className="text-red-500" />, count: "50K+", label: "Meals Saved" },
        { icon: <Users className="text-blue-500" />, count: "12K+", label: "Food Donors" },
        { icon: <Globe className="text-green-500" />, count: "25+", label: "Active Cities" },
        { icon: <Award className="text-yellow-500" />, count: "100%", label: "Impact Factor" },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Mission Text */}
                    <div className="flex-1 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-black text-gray-900 mb-6 font-outfit">
                                Our Mission to <br />
                                <span className="text-orange-600 italic underline decoration-wavy decoration-orange-200">End Community Hunger</span>
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                We believe that no one should ever go to bed hungry when millions of pounds of perfectly good food are wasted every year. BiteBridge is more than just a platform; it's a movement to build a more compassionate and sustainable world.
                            </p>
                            <div className="grid grid-cols-2 gap-8 mt-10">
                                <div className="space-y-2">
                                    <h4 className="font-bold text-gray-900">Zero Waste</h4>
                                    <p className="text-sm text-gray-500">Optimizing food distribution to eliminate environmental impact.</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-bold text-gray-900">Social Impact</h4>
                                    <p className="text-sm text-gray-500">Fostering connections that bring neighbors closer through kindness.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Stats Grid */}
                    <div className="flex-1 w-full lg:w-auto">
                        <div className="grid grid-cols-2 gap-6">
                            {stats.map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center group transition-all hover:shadow-xl hover:shadow-orange-100"
                                >
                                    <div className="mb-4 transform group-hover:scale-125 transition-transform duration-300">
                                        {stat.icon}
                                    </div>
                                    <h3 className="text-3xl font-black text-gray-900 mb-1 font-outfit">{stat.count}</h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold font-outfit">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionSection;
