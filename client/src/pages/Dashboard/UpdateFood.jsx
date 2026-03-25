import { useForm } from "react-hook-form";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Edit3, MapPin, Calendar, FileText, Package, Loader2, Users } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../api/axiosInstance";
import { ENDPOINTS } from "../../api/endpoints";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { motion } from "framer-motion";

const UpdateFood = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [expireDate, setExpireDate] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const { isLoading } = useQuery({
        queryKey: ["updateFood", id],
        queryFn: async () => {
            const res = await axiosInstance.get(ENDPOINTS.FOOD_BY_ID(id));
            const food = res.data;
            setExpireDate(new Date(food.expireDate));
            reset({
                foodName: food.foodName,
                foodQuantity: food.foodQuantity,
                pickupLocation: food.pickupLocation,
                additionalNotes: food.additionalNotes,
            });
            return food;
        }
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const updatedData = {
                foodName: data.foodName,
                foodQuantity: parseInt(data.foodQuantity),
                pickupLocation: data.pickupLocation,
                expireDate: expireDate,
                additionalNotes: data.additionalNotes,
            };

            await axiosInstance.put(ENDPOINTS.FOOD_BY_ID(id), updatedData);
            toast.success("Food item updated successfully!");
            navigate("/manage-my-foods");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update food.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <section className="py-20 min-h-screen bg-gray-50 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100"
            >
                {/* Visual Side */}
                <div className="hidden md:flex md:w-1/3 bg-gray-900 p-12 text-white flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <Edit3 size={48} className="mb-6 text-orange-500" />
                        <h2 className="text-3xl font-black mb-4 font-outfit uppercase tracking-tighter">Update Food Item</h2>
                        <p className="text-gray-400 text-sm leading-relaxed italic border-l-2 border-orange-500 pl-4">
                            "Keep your listing accurate so the right person can find it."
                        </p>
                    </div>
                    <div className="relative z-10 mt-12 bg-white/5 p-6 rounded-2xl">
                        <div className="flex items-center space-x-3">
                            <img src={user?.photoURL} className="w-10 h-10 rounded-full border-2 border-white/20" alt="" />
                            <div className="overflow-hidden">
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Editing as</p>
                                <p className="font-bold truncate">{user?.displayName}</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full -mr-32 -mt-32"></div>
                </div>

                {/* Form Side */}
                <div className="flex-1 p-10 md:p-14">
                    <h3 className="text-3xl font-black text-gray-900 mb-8 font-outfit uppercase tracking-tighter">Edit Food Details</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Food Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Food Name</label>
                                <div className="relative">
                                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        {...register("foodName", { required: "Name is required" })}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
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
                                        {...register("foodQuantity", { required: "Quantity is required", min: 1 })}
                                        type="number"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                        placeholder="Number of people"
                                    />
                                    {errors.foodQuantity && <p className="text-xs text-red-500 mt-1">{errors.foodQuantity.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Expire Date */}
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Expire Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
                                <DatePicker
                                    selected={expireDate}
                                    onChange={(date) => setExpireDate(date)}
                                    minDate={new Date()}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Pickup Location */}
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Pickup Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    {...register("pickupLocation", { required: "Location is required" })}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                    placeholder="Full address for collection"
                                />
                                {errors.pickupLocation && <p className="text-xs text-red-500 mt-1">{errors.pickupLocation.message}</p>}
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
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                    placeholder="Any storage instructions or food details..."
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-5 rounded-2xl font-black text-lg uppercase tracking-widest flex items-center justify-center transition-all shadow-xl active:scale-95 ${
                                isSubmitting ? 'bg-orange-400 cursor-not-allowed text-white' : 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-100'
                            }`}
                        >
                            {isSubmitting ? (
                                <><Loader2 className="animate-spin mr-3" />Updating...</>
                            ) : (
                                <><Edit3 size={20} className="mr-2" />Update Food Item</>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </section>
    );
};

export default UpdateFood;
