import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../api/axiosInstance";
import { ENDPOINTS } from "../../api/endpoints";
import { Package, Clock, MapPin, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MyFoodRequests = () => {
    const { user } = useAuth();

    const { data: results, isLoading } = useQuery({
        queryKey: ["myRequests", user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(ENDPOINTS.MY_REQUESTS(user?.email));
            return res.data;
        },
        enabled: !!user?.email
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <section className="py-12 bg-gray-50 min-h-screen font-outfit">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">My Food <span className="text-orange-600">Requests</span></h1>
                    <p className="text-gray-500 font-medium">Tracking {results?.length || 0} items you have asked for.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {results?.map((req) => (
                        <motion.div
                            key={req._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100">
                                    <img src={req.foodImage} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center ${
                                    req.requestStatus === 'Accepted' ? 'bg-green-100 text-green-600' :
                                    req.requestStatus === 'Rejected' ? 'bg-red-100 text-red-600' :
                                    'bg-orange-100 text-orange-600'
                                }`}>
                                    {req.requestStatus === 'Accepted' ? <CheckCircle2 size={12} className="mr-1.5" /> :
                                     req.requestStatus === 'Rejected' ? <XCircle size={12} className="mr-1.5" /> :
                                     <Clock size={12} className="mr-1.5" />}
                                    {req.requestStatus}
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight line-clamp-1">{req.foodName}</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center text-sm text-gray-500 font-medium">
                                    <Package size={16} className="text-orange-500 mr-3 shrink-0" />
                                    <div className="overflow-hidden">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Donator</p>
                                        <p className="text-gray-800 font-bold truncate">{req.donatorName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 font-medium">
                                    <MapPin size={16} className="text-orange-500 mr-3 shrink-0" />
                                    <div className="overflow-hidden">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pickup Location</p>
                                        <p className="text-gray-800 font-bold truncate">{req.pickupLocation}</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 font-medium">
                                    <Clock size={16} className="text-orange-500 mr-3 shrink-0" />
                                    <div className="overflow-hidden">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Request Date</p>
                                        <p className="text-gray-800 font-bold">{new Date(req.requestDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 italic text-xs text-gray-600">
                                <p className="font-bold flex items-center mb-1 not-italic text-gray-900 border-b border-gray-200 pb-1 mr-2">
                                    <AlertCircle size={10} className="mr-1 text-orange-500" />
                                    Your Note:
                                </p>
                                {req.additionalNotes || "No specific notes provided."}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {results?.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
                        <Package size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-400">No active food requests.</h3>
                        <Link to="/available-foods" className="text-orange-600 font-bold hover:underline mt-2 inline-block">Explore community foods</Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MyFoodRequests;
