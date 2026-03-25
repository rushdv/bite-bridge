import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PlusCircle, MapPin, Calendar, FileText, Package, Image as ImageIcon, Loader2, Users, Link as LinkIcon } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../api/axiosInstance";
import { ENDPOINTS } from "../../api/endpoints";
import { motion } from "framer-motion";

const AddFood = () => {
    const { user } = useAuth();
    const [startDate, setStartDate] = useState(new Date());
    const [imagePreview, setImagePreview] = useState("");
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm();

    const watchedImageUrl = watch("foodImage");

    const onSubmit = async (data) => {
        try {
            const foodData = {
                foodName: data.foodName,
                foodImage: data.foodImage,
                foodQuantity: parseInt(data.foodQuantity),
                pickupLocation: data.pickupLocation,
                expireDate: startDate,
                additionalNotes: data.additionalNotes,
                donatorInfo: {
                    name: user?.displayName,
                    email: user?.email,
                    image: user?.photoURL
                },
                foodStatus: "Available"
            };

            await axiosInstance.post(ENDPOINTS.FOODS, foodData);
            toast.success("Food item added successfully!");
            reset();
            setStartDate(new Date());
            setImagePreview("");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add food. Please try again.");
        }
    };

    return (
        <section className="py-20 min-h-screen bg-gray-50 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100"
            >
                {/* Visual Side */}
                <div className="hidden md:flex md:w-1/3 bg-orange-600 p-12 text-white flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <PlusCircle size={48} className="mb-6" />
                        <h2 className="text-3xl font-black mb-4 font-outfit uppercase tracking-tighter">Share the LOVE.</h2>
                        <p className="text-orange-100 text-sm leading-relaxed italic border-l-2 border-orange-400 pl-4">
                            "One person's surplus is another's sustenance. Thank you for making a difference."
                        </p>
                    </div>

                    {/* Image Preview */}
                    {watchedImageUrl && (
                        <div className="relative z-10 mt-6 rounded-2xl overflow-hidden border-2 border-white/20 aspect-video">
                            <img
                                src={watchedImageUrl}
                                alt="preview"
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        </div>
                    )}

                    <div className="relative z-10 mt-6 bg-white/10 p-6 rounded-2xl backdrop-blur-md">
                        <div className="flex items-center space-x-3">
                            <img src={user?.photoURL} className="w-10 h-10 rounded-full border-2 border-white/20" alt="" onError={(e) => e.target.style.display='none'} />
                            <div className="overflow-hidden">
                                <p className="text-xs font-bold uppercase tracking-widest text-orange-200">Acting as</p>
                                <p className="font-bold truncate">{user?.displayName}</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 transform rotate-45"></div>
                </div>

                {/* Form Side */}
                <div className="flex-1 p-10 md:p-14">
                    <h3 className="text-3xl font-black text-gray-900 mb-8 font-outfit uppercase tracking-tighter">Enter Food Details</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Food Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Food Name</label>
                                <div className="relative">
                                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        {...register("foodName", { required: "Name is required" })}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                        placeholder="E.g. Fresh Garden Salad"
                                    />
                                    {errors.foodName && <p className="text-xs text-red-500 mt-1">{errors.foodName.message}</p>}
                                </div>
                            </div>

                            {/* Food Quantity */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Servings (Quantity)</label>
                                <div className="relative">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        {...register("foodQuantity", { required: "Quantity is required", min: { value: 1, message: "Must be at least 1" } })}
                                        type="number"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Number of people"
                                    />
                                    {errors.foodQuantity && <p className="text-xs text-red-500 mt-1">{errors.foodQuantity.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Food Image URL */}
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Food Image URL</label>
                            <div className="relative">
                                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    {...register("foodImage", {
                                        required: "Image URL is required",
                                        pattern: {
                                            value: /^https?:\/\/.+/,
                                            message: "Must be a valid URL starting with http/https"
                                        }
                                    })}
                                    type="url"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                    placeholder="https://example.com/food-image.jpg"
                                />
                            </div>
                            {errors.foodImage && <p className="text-xs text-red-500 mt-1">{errors.foodImage.message}</p>}
                            <p className="text-xs text-gray-400 ml-1">Paste a direct image link. You can use Google Images, Unsplash, etc.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Pickup Location */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Pickup Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        {...register("pickupLocation", { required: "Location is required" })}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Full address for collection"
                                    />
                                    {errors.pickupLocation && <p className="text-xs text-red-500 mt-1">{errors.pickupLocation.message}</p>}
                                </div>
                            </div>

                            {/* Expire Date */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Expire Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        minDate={new Date()}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Additional Notes */}
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Additional Notes</label>
                            <div className="relative">
                                <FileText className="absolute left-4 top-6 text-gray-400" size={18} />
                                <textarea
                                    {...register("additionalNotes")}
                                    rows="3"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Any storage instructions or food details..."
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-5 rounded-2xl font-black text-lg uppercase tracking-widest flex items-center justify-center transition-all shadow-xl shadow-orange-100 active:scale-95 ${
                                isSubmitting ? 'bg-orange-400 cursor-not-allowed text-white' : 'bg-orange-600 hover:bg-orange-700 text-white'
                            }`}
                        >
                            {isSubmitting ? (
                                <><Loader2 className="animate-spin mr-3" />PUBLISHING...</>
                            ) : (
                                <><PlusCircle size={20} className="mr-2" />Add Food Item</>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </section>
    );
};

export default AddFood;
