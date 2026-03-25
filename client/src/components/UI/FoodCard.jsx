import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, MapPin, Users, Info } from "lucide-react";

const FoodCard = ({ food }) => {
    const { _id, foodName, foodImage, foodQuantity, pickupLocation, expireDate, donatorInfo } = food;

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-100 transition-all border border-gray-100 group"
        >
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={foodImage}
                    alt={foodName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center shadow-lg border border-white/50">
                    <Users size={14} className="text-orange-600 mr-2" />
                    <span className="text-xs font-black text-gray-800 uppercase tracking-tighter">Serves {foodQuantity}</span>
                </div>
            </div>

            {/* Content Container */}
            <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                    <img
                        src={donatorInfo.image}
                        alt={donatorInfo.name}
                        className="h-10 w-10 rounded-full border-2 border-orange-100"
                    />
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">Donator</p>
                        <p className="text-sm font-black text-gray-800 truncate">{donatorInfo.name}</p>
                    </div>
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-4 line-clamp-1 font-outfit uppercase">{foodName}</h3>

                <div className="space-y-3 mb-8">
                    <div className="flex items-center text-sm text-gray-500 bg-gray-50 p-2 rounded-lg group-hover:bg-orange-50 transition-colors">
                        <MapPin size={16} className="text-orange-500 mr-3" />
                        <span className="font-medium">{pickupLocation}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 p-2 rounded-lg">
                        <Clock size={16} className="text-orange-500 mr-3" />
                        <span className="font-medium italic">Expires: {new Date(expireDate).toLocaleDateString()}</span>
                    </div>
                </div>

                <Link
                    to={`/food/${_id}`}
                    className="w-full bg-orange-600 text-white font-black py-4 rounded-2xl flex items-center justify-center transition-all hover:bg-orange-700 active:scale-95 shadow-lg shadow-orange-100 group-hover:shadow-orange-200"
                >
                    <Info size={20} className="mr-2" />
                    VIEW DETAILS
                </Link>
            </div>
        </motion.div>
    );
};

export default FoodCard;
