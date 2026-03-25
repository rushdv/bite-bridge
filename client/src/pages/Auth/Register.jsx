import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, User, Image, Chrome } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Register = () => {
    const { createUser, signInWithGoogle, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const { name, email, photo, password } = data;
        
        try {
            const result = await createUser(email, password);
            await updateUserProfile(name, photo);
            toast.success("Welcome to BiteBridge! Registration Successful.");
            navigate("/");
        } catch (error) {
            toast.error(error.message || "Registration failed. Please try again.");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
            toast.success("Logged in with Google Successfully!");
            navigate("/");
        } catch (error) {
            toast.error(error.message || "Google Login failed.");
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 font-outfit">Create account</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Join the BiteBridge community today
                    </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input
                                {...register("name", { required: "Full Name is required" })}
                                type="text"
                                className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                placeholder="Full Name"
                            />
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input
                                {...register("email", { required: "Email is required" })}
                                type="email"
                                className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                placeholder="Email address"
                            />
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                        </div>

                        <div className="relative">
                            <Image className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input
                                {...register("photo", { required: "Photo URL is required" })}
                                type="url"
                                className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                placeholder="Photo URL"
                            />
                            {errors.photo && <p className="text-xs text-red-500 mt-1">{errors.photo.message}</p>}
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input
                                {...register("password", { 
                                    required: "Password is required",
                                    minLength: { value: 6, message: "At least 6 characters" },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
                                        message: "Must have Uppercase & Lowercase letters"
                                    }
                                })}
                                type="password"
                                className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                placeholder="Password"
                            />
                            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all shadow-lg"
                        >
                            <LogIn className="w-5 h-5 mr-2" />
                            Register Now
                        </button>
                    </div>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500 italic">Or continue with</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center bg-white border border-gray-200 py-3 px-4 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                    >
                        <Chrome className="w-5 h-5 mr-3 text-red-500" />
                        Sign in with Google
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="font-bold text-orange-600 hover:text-orange-500 transition-colors">
                        Sign in here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
