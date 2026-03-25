import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Edit2, Trash2, Eye, Package, MapPin, Calendar, ExternalLink } from "lucide-react";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ManageMyFoods = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { data: myFoods, isLoading } = useQuery({
        queryKey: ["myFoods", user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/api/foods/my-foods/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            return axios.delete(`http://localhost:5000/api/foods/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["myFoods"]);
            toast.success("Food item removed successfully.");
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f97316",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
            customClass: {
                popup: 'rounded-[2rem]'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <section className="py-12 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 font-outfit uppercase tracking-tighter">Manage <span className="text-orange-600">My Foods</span></h1>
                        <p className="text-gray-500 font-medium">Tracking {myFoods?.length || 0} items you've contributed.</p>
                    </div>
                    <Link 
                        to="/add-food" 
                        className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold flex items-center shadow-lg shadow-orange-100 hover:bg-orange-700 transition-all"
                    >
                        <Package size={18} className="mr-2" />
                        Add New Item
                    </Link>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Food Item</th>
                                    <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Location</th>
                                    <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Qty / Servings</th>
                                    <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Expires In</th>
                                    <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {myFoods?.map((food) => (
                                    <motion.tr 
                                        key={food._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="hover:bg-orange-50/30 transition-colors group"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100">
                                                    <img src={food.foodImage} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 uppercase tracking-tight">{food.foodName}</p>
                                                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                                                        food.foodStatus === 'Available' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                                                    }`}>
                                                        {food.foodStatus}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center text-sm text-gray-500 font-medium">
                                                <MapPin size={14} className="mr-2 text-orange-500" />
                                                {food.pickupLocation}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-bold text-gray-900">
                                            {food.foodQuantity} Persons
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center text-sm text-gray-500 font-medium">
                                                <Calendar size={14} className="mr-2 text-orange-500" />
                                                {new Date(food.expireDate).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link
                                                    to={`/food/${food._id}`}
                                                    className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye size={18} />
                                                </Link>
                                                <Link
                                                    to={`/update-food/${food._id}`}
                                                    className="p-2.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                                    title="Update Item"
                                                >
                                                    <Edit2 size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(food._id)}
                                                    className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete Item"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {myFoods?.length === 0 && (
                     <div className="mt-12 text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
                        <Package size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-400">You haven't shared any food yet!</h3>
                        <Link to="/add-food" className="text-orange-600 font-bold hover:underline mt-2 inline-block">Start donating today</Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ManageMyFoods;
