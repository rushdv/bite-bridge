import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";
import { ENDPOINTS } from "../../api/endpoints";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import FoodCard from "../../components/UI/FoodCard";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const FeaturedFoods = () => {
    const { data: featuredFoods, isLoading, isError } = useQuery({
        queryKey: ["featuredFoods"],
        queryFn: async () => {
            const res = await axiosInstance.get(ENDPOINTS.FEATURED_FOODS);
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    if (isError) return (
        <div className="text-center py-10">
            <p className="text-red-500 font-bold mb-4">Failed to load featured foods.</p>
        </div>
    );

    return (
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-16">
                <div>
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-3 mb-4 text-orange-600"
                    >
                        <UtensilsCrossed size={24} />
                        <span className="font-black tracking-widest uppercase text-sm">Community Contributions</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 font-outfit">Featured <span className="text-orange-600">Foods</span></h2>
                </div>
                
                <Link 
                    to="/available-foods"
                    className="hidden md:flex items-center text-orange-600 font-bold hover:mr-2 transition-all group"
                >
                    View All Foods
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {featuredFoods?.map((food, idx) => (
                    <FoodCard key={food._id} food={food} />
                ))}
            </div>

            <div className="mt-16 text-center md:hidden">
                <Link
                    to="/available-foods"
                    className="inline-flex items-center bg-gray-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-orange-600 transition-all"
                >
                    View All Foods
                    <ArrowRight className="ml-2" size={20} />
                </Link>
            </div>
            
            <div className="mt-20 flex justify-center">
                 <Link
                    to="/available-foods"
                    className="bg-white border-2 border-orange-600 text-orange-600 px-12 py-5 rounded-3xl font-black text-lg hover:bg-orange-600 hover:text-white transition-all shadow-xl hover:shadow-orange-200 uppercase tracking-widest block md:inline-block"
                >
                    Show All Available Foods
                </Link>
            </div>
        </section>
    );
};

export default FeaturedFoods;
