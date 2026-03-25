import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Search, LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import FoodCard from "../../components/UI/FoodCard";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";

const AvailableFoods = () => {
    const [search, setSearch] = useState("");
    const [layout, setLayout] = useState("grid"); // grid or list
    const [sortBy, setSortBy] = useState("expireDate");

    const { data: foods, isLoading } = useQuery({
        queryKey: ["availableFoods", search, sortBy],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/api/foods?search=${search}&sortBy=${sortBy}`);
            return res.data;
        }
    });

    return (
        <section className="py-12 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header & Controls */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-12">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-black text-gray-900 font-outfit uppercase tracking-tighter">Available <span className="text-orange-600">Foods</span></h1>
                            <p className="text-gray-500 mt-2 font-medium">Browse through community shared meals near you.</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            {/* Search Bar */}
                            <div className="relative w-full sm:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search by food name..."
                                    className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all placeholder:text-gray-400 border-none"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            {/* Sort & Layout Toggle */}
                            <div className="flex items-center space-x-2 bg-gray-100 p-1.5 rounded-xl">
                                <button
                                    onClick={() => setLayout("grid")}
                                    className={`p-2 rounded-lg transition-all ${layout === 'grid' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <LayoutGrid size={20} />
                                </button>
                                <button
                                    onClick={() => setLayout("list")}
                                    className={`p-2 rounded-lg transition-all ${layout === 'list' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <List size={20} />
                                </button>
                                <div className="h-6 w-px bg-gray-200 mx-1"></div>
                                <select 
                                    className="bg-transparent text-sm font-bold text-gray-600 outline-none pr-4 cursor-pointer"
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="expireDate">Exp. Date</option>
                                    <option value="foodQuantity">Quantity</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Foods Grid */}
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div className={layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'flex flex-col gap-6'}>
                        <AnimatePresence mode="popLayout">
                            {foods?.map((food) => (
                                <motion.div
                                    key={food._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                >
                                    <FoodCard food={food} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {!isLoading && foods?.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                        <div className="bg-orange-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <SlidersHorizontal size={32} className="text-orange-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 font-outfit uppercase">No food found</h3>
                        <p className="text-gray-500">Try adjusting your search or check back later!</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AvailableFoods;
