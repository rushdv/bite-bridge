import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapPin, Calendar, Clock, User, MessageCircle, Heart, Share2, ClipboardCheck } from "lucide-react";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { motion } from "framer-motion";
import { useState } from "react";
import RequestModal from "./RequestModal";

const FoodDetails = () => {
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: food, isLoading } = useQuery({
        queryKey: ["foodDetails", id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/api/foods/${id}`);
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <section className="py-12 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
                    {/* Image Section */}
                    <div className="lg:w-1/2 relative h-[400px] lg:h-auto overflow-hidden group">
                        <img
                            src={food?.foodImage}
                            alt={food?.foodName}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-8 left-8">
                           <span className="bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-2xl text-orange-600 font-black flex items-center shadow-lg uppercase text-sm tracking-tight">
                               <Heart size={18} className="mr-2 fill-orange-500" />
                               Special Contribution
                           </span>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center space-x-4 mb-8">
                                <img
                                    src={food?.donatorInfo.image}
                                    alt={food?.donatorInfo.name}
                                    className="h-16 w-16 rounded-full border-4 border-orange-50"
                                />
                                <div>
                                    <h4 className="font-black text-gray-900 text-xl font-outfit uppercase">{food?.donatorInfo.name}</h4>
                                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs flex items-center">
                                        <User size={12} className="mr-1 text-orange-500" />
                                        Verified Donator
                                    </p>
                                </div>
                            </div>

                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl font-black text-gray-900 mb-6 font-outfit leading-tight uppercase tracking-tighter"
                            >
                                {food?.foodName}
                            </motion.h1>

                            <div className="grid grid-cols-2 gap-6 mb-10">
                                <div className="space-y-4">
                                    <div className="flex items-center text-gray-500 font-bold uppercase tracking-widest text-xs">
                                        <MapPin size={16} className="text-orange-500 mr-2" />
                                        Pickup Location
                                    </div>
                                    <p className="text-gray-900 font-bold text-lg leading-none">{food?.pickupLocation}</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center text-gray-500 font-bold uppercase tracking-widest text-xs">
                                        <Clock size={16} className="text-orange-500 mr-2" />
                                        Quantity
                                    </div>
                                    <p className="text-gray-900 font-bold text-lg leading-none">Serves {food?.foodQuantity} people</p>
                                </div>
                            </div>

                            <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100/50 mb-10">
                                <div className="flex items-center text-orange-600 font-black uppercase text-xs tracking-widest mb-3">
                                    <MessageCircle size={14} className="mr-2" />
                                    Donator's Note
                                </div>
                                <p className="text-gray-700 italic font-medium leading-relaxed">
                                    "{food?.additionalNotes || "No specific instructions provided. Enjoy your meal!"}"
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full sm:flex-1 bg-orange-600 text-white font-black py-5 rounded-2xl flex items-center justify-center transition-all hover:bg-orange-700 hover:shadow-2xl hover:shadow-orange-200 active:scale-95 uppercase tracking-widest"
                            >
                                <ClipboardCheck className="mr-2" size={24} />
                                Request Food
                            </button>
                            <button className="p-5 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition-all active:scale-95">
                                <Share2 size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Request Modal */}
            {isModalOpen && <RequestModal food={food} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
        </section>
    );
};

export default FoodDetails;
