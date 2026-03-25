import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Calendar, MapPin, User, Mail, Info, Phone, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../api/axiosInstance";
import { ENDPOINTS } from "../../api/endpoints";
import toast from "react-hot-toast";

const RequestModal = ({ food, isOpen, onClose }) => {
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        const requestData = {
            foodId: food._id,
            foodName: food.foodName,
            foodImage: food.foodImage,
            donatorEmail: food.donatorInfo.email,
            donatorName: food.donatorInfo.name,
            userEmail: user?.email,
            userName: user?.displayName,
            userPhoto: user?.photoURL,
            requestDate: new Date(),
            pickupLocation: food.pickupLocation,
            expireDate: food.expireDate,
            writeLocation: data.writeLocation,
            whyNeedFood: data.whyNeedFood,
            contactNo: data.contactNo,
            requestStatus: "Pending"
        };

        try {
            await axiosInstance.post(ENDPOINTS.REQUESTS, requestData);
            toast.success("Food request sent successfully!");
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send request.");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
                    >
                        {/* Visual Recap */}
                        <div className="hidden md:block w-1/3 bg-gray-900 text-white p-10 relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-3xl font-black mb-6 font-outfit uppercase tracking-tighter">Review <br />Request</h2>
                                <div className="space-y-6">
                                    <div className="aspect-square rounded-2xl overflow-hidden border border-white/10">
                                        <img src={food?.foodImage} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div>
                                        <p className="text-orange-500 font-black uppercase text-xs tracking-widest mb-1">Item Name</p>
                                        <p className="font-bold text-lg">{food?.foodName}</p>
                                    </div>
                                    <div className="flex items-center space-x-3 bg-white/5 p-4 rounded-2xl">
                                        <MapPin className="text-orange-500 shrink-0" size={18} />
                                        <div>
                                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Pickup At</p>
                                            <p className="text-sm font-bold">{food?.pickupLocation}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl"></div>
                        </div>

                        {/* Request Form */}
                        <div className="flex-1 p-8 md:p-12 max-h-[90vh] overflow-y-auto">
                            <button onClick={onClose} className="absolute top-6 right-8 text-gray-400 hover:text-gray-600 p-2">
                                <X size={24} />
                            </button>

                            <h3 className="text-3xl font-black text-gray-900 mb-8 font-outfit uppercase tracking-tighter">Your Information</h3>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                {/* Read-only user info */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Your Email</label>
                                        <div className="flex items-center bg-gray-50 p-4 rounded-2xl border border-gray-100 text-gray-500">
                                            <Mail size={18} className="mr-3 text-orange-400 shrink-0" />
                                            <span className="font-bold text-sm truncate">{user?.email}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Your Name</label>
                                        <div className="flex items-center bg-gray-50 p-4 rounded-2xl border border-gray-100 text-gray-500">
                                            <User size={18} className="mr-3 text-orange-400 shrink-0" />
                                            <span className="font-bold text-sm truncate">{user?.displayName}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Donator</label>
                                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                            <p className="text-xs font-bold text-gray-800">{food?.donatorInfo.name}</p>
                                            <p className="text-[10px] text-gray-400 truncate">{food?.donatorInfo.email}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Request Date</label>
                                        <div className="flex items-center bg-gray-50 p-4 rounded-2xl border border-gray-100 text-gray-500">
                                            <Calendar size={18} className="mr-3 text-orange-400 shrink-0" />
                                            <span className="font-bold text-sm">{new Date().toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Write Location */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Your Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            {...register("writeLocation", { required: "Location is required" })}
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                            placeholder="Your current address"
                                        />
                                    </div>
                                    {errors.writeLocation && <p className="text-xs text-red-500">{errors.writeLocation.message}</p>}
                                </div>

                                {/* Contact No */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Contact Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            {...register("contactNo", { required: "Contact number is required" })}
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                            placeholder="+880 1XXX-XXXXXX"
                                        />
                                    </div>
                                    {errors.contactNo && <p className="text-xs text-red-500">{errors.contactNo.message}</p>}
                                </div>

                                {/* Why Need Food */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Why Do You Need This Food?</label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-4 top-4 text-gray-400" size={18} />
                                        <textarea
                                            {...register("whyNeedFood", { required: "Please explain why you need this food" })}
                                            rows="3"
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                            placeholder="Briefly explain your situation..."
                                        />
                                    </div>
                                    {errors.whyNeedFood && <p className="text-xs text-red-500">{errors.whyNeedFood.message}</p>}
                                </div>

                                <div className="bg-orange-50 p-4 rounded-2xl flex items-start space-x-3 border border-orange-100">
                                    <Info className="text-orange-600 shrink-0 mt-0.5" size={18} />
                                    <p className="text-xs text-orange-800 font-medium leading-relaxed">
                                        By submitting, you agree to coordinate with the donator for collection before the expiry date.
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-lg uppercase tracking-widest flex items-center justify-center transition-all hover:bg-orange-700 active:scale-95 shadow-xl shadow-orange-100 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <Send size={20} className="mr-2" />
                                    {isSubmitting ? "Submitting..." : "Confirm Request"}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default RequestModal;
