import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";

const Banner = () => {
    return (
        <section className="relative min-h-[600px] flex items-center overflow-hidden bg-gray-900">
            {/* Background Image / Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=2071" 
                    alt="Healthy Food" 
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/20 text-orange-400 text-sm font-bold tracking-wider mb-6">
                            COMMUNITY DRIVEN
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 font-outfit">
                            Share Food, <br />
                            <span className="text-orange-500">Spread Happiness.</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                            BiteBridge connects generous donors with those in need. Join our mission to eliminate food waste and build a hunger-free community.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link 
                                to="/available-foods"
                                className="group bg-orange-600 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center hover:bg-orange-700 transition-all shadow-xl shadow-orange-900/20"
                            >
                                <Search className="mr-2" size={20} />
                                Search Food
                                <ArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" size={18} />
                            </Link>
                            <Link 
                                to="/#how-it-works"
                                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all text-center"
                            >
                                Learn More
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Floating Stats or Decor - Optional */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute right-0 bottom-0 hidden lg:block p-12"
            >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center">
                    <span className="text-4xl font-black text-orange-500">1.2K+</span>
                    <span className="text-gray-400 text-sm uppercase tracking-widest">Meals Shared Today</span>
                </div>
            </motion.div>
        </section>
    );
};

export default Banner;
