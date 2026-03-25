import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { MapPin, Clock, User, MessageCircle, Heart, Share2, ClipboardCheck, Phone, CheckCircle2, XCircle } from "lucide-react";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { motion } from "framer-motion";
import { useState } from "react";
import RequestModal from "./RequestModal";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../api/axiosInstance";
import { ENDPOINTS } from "../../api/endpoints";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const FoodDetails = () => {
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { data: food, isLoading } = useQuery({
        queryKey: ["foodDetails", id],
        queryFn: async () => {
            const res = await axiosInstance.get(ENDPOINTS.FOOD_BY_ID(id));
            return res.data;
        }
    });

    const isDonator = user?.email === food?.donatorInfo?.email;

    const { data: requests, isLoading: requestsLoading } = useQuery({
        queryKey: ["foodRequests", id],
        queryFn: async () => {
            const res = await axiosInstance.get(ENDPOINTS.REQUESTS_BY_FOOD(id));
            return res.data;
        },
        enabled: !!isDonator && !!food
    });

    const statusMutation = useMutation({
        mutationFn: async ({ requestId, status }) => {
            return axiosInstance.patch(ENDPOINTS.UPDATE_REQUEST_STATUS(requestId), { status });
        },
        onSuccess: (_, { status }) => {
            queryClient.invalidateQueries(["foodRequests", id]);
            queryClient.invalidateQueries(["foodDetails", id]);
            toast.success(`Request ${status === "Accepted" ? "accepted" : "rejected"} successfully.`);
        },
        onError: () => toast.error("Failed to update request status.")
    });

    const handleAccept = (requestId) => {
        Swal.fire({
            title: "Accept this request?",
            text: "The food status will be marked as donated.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#f97316",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Accept!",
        }).then((result) => {
            if (result.isConfirmed) {
                statusMutation.mutate({ requestId, status: "Accepted" });
            }
        });
    };

    const handleReject = (requestId) => {
        statusMutation.mutate({ requestId, status: "Rejected" });
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <section className="py-12 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                {/* Food Detail Card */}
                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
                    {/* Image Section */}
                    <div className="lg:w-1/2 relative h-[400px] lg:h-auto overflow-hidden group">
                        <img
                            src={food?.foodImage}
                            alt={food?.foodName}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-8 left-8">
                            <span className={`bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-2xl font-black flex items-center shadow-lg uppercase text-sm tracking-tight ${food?.foodStatus === 'donated' ? 'text-gray-500' : 'text-orange-600'}`}>
                                <Heart size={18} className={`mr-2 ${food?.foodStatus === 'donated' ? 'fill-gray-400' : 'fill-orange-500'}`} />
                                {food?.foodStatus === 'donated' ? 'Already Donated' : 'Available'}
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
                                <div className="space-y-2">
                                    <div className="flex items-center text-gray-500 font-bold uppercase tracking-widest text-xs">
                                        <MapPin size={16} className="text-orange-500 mr-2" />
                                        Pickup Location
                                    </div>
                                    <p className="text-gray-900 font-bold text-lg leading-none">{food?.pickupLocation}</p>
                                </div>
                                <div className="space-y-2">
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
                            {food?.foodStatus !== 'donated' ? (
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    disabled={isDonator}
                                    className="w-full sm:flex-1 bg-orange-600 text-white font-black py-5 rounded-2xl flex items-center justify-center transition-all hover:bg-orange-700 hover:shadow-2xl hover:shadow-orange-200 active:scale-95 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ClipboardCheck className="mr-2" size={24} />
                                    {isDonator ? "Your Own Food" : "Request Food"}
                                </button>
                            ) : (
                                <div className="w-full sm:flex-1 bg-gray-100 text-gray-500 font-black py-5 rounded-2xl flex items-center justify-center uppercase tracking-widest">
                                    <CheckCircle2 className="mr-2" size={24} />
                                    Food Donated
                                </div>
                            )}
                            <button className="p-5 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition-all active:scale-95">
                                <Share2 size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Food Requests Table - Only visible to donator */}
                {isDonator && (
                    <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
                        <div className="p-8 border-b border-gray-100">
                            <h2 className="text-2xl font-black text-gray-900 font-outfit uppercase tracking-tighter">
                                Incoming <span className="text-orange-600">Requests</span>
                            </h2>
                            <p className="text-gray-500 font-medium mt-1">
                                {requests?.length || 0} people have requested this food item.
                            </p>
                        </div>

                        {requestsLoading ? (
                            <div className="p-8"><LoadingSpinner /></div>
                        ) : requests?.length === 0 ? (
                            <div className="p-12 text-center text-gray-400 font-bold">No requests yet for this food item.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100">
                                            <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Requester</th>
                                            <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Location</th>
                                            <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Contact</th>
                                            <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Why Needed</th>
                                            <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                                            <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {requests?.map((req) => (
                                            <tr key={req._id} className="hover:bg-orange-50/20 transition-colors">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center space-x-3">
                                                        {req.userPhoto && (
                                                            <img src={req.userPhoto} alt="" className="w-9 h-9 rounded-full object-cover border-2 border-orange-100" />
                                                        )}
                                                        <div>
                                                            <p className="font-bold text-gray-900 text-sm">{req.userName}</p>
                                                            <p className="text-xs text-gray-400 truncate max-w-[140px]">{req.userEmail}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-sm text-gray-600 font-medium max-w-[140px]">
                                                    <div className="flex items-start">
                                                        <MapPin size={14} className="text-orange-500 mr-1.5 mt-0.5 shrink-0" />
                                                        <span className="line-clamp-2">{req.writeLocation || "-"}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-sm text-gray-600 font-medium">
                                                    <div className="flex items-center">
                                                        <Phone size={14} className="text-orange-500 mr-1.5 shrink-0" />
                                                        {req.contactNo || "-"}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-sm text-gray-600 max-w-[180px]">
                                                    <p className="line-clamp-2 italic">{req.whyNeedFood || "-"}</p>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                                                        req.requestStatus === 'Accepted' ? 'bg-green-100 text-green-600' :
                                                        req.requestStatus === 'Rejected' ? 'bg-red-100 text-red-600' :
                                                        'bg-orange-100 text-orange-600'
                                                    }`}>
                                                        {req.requestStatus}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    {req.requestStatus === 'Pending' && (
                                                        <div className="flex items-center justify-end space-x-2">
                                                            <button
                                                                onClick={() => handleAccept(req._id)}
                                                                className="flex items-center px-4 py-2 bg-green-600 text-white text-xs font-black rounded-xl hover:bg-green-700 transition-all"
                                                            >
                                                                <CheckCircle2 size={14} className="mr-1.5" />
                                                                Accept
                                                            </button>
                                                            <button
                                                                onClick={() => handleReject(req._id)}
                                                                className="flex items-center px-4 py-2 bg-red-100 text-red-600 text-xs font-black rounded-xl hover:bg-red-200 transition-all"
                                                            >
                                                                <XCircle size={14} className="mr-1.5" />
                                                                Reject
                                                            </button>
                                                        </div>
                                                    )}
                                                    {req.requestStatus !== 'Pending' && (
                                                        <span className="text-xs text-gray-400 font-bold">No action needed</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {isModalOpen && <RequestModal food={food} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
        </section>
    );
};

export default FoodDetails;
