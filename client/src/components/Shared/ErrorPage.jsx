import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="text-center space-y-6 max-w-lg">
                <div className="relative inline-block">
                    <AlertTriangle className="w-32 h-32 text-orange-500 animate-bounce" />
                    <span className="absolute -bottom-2 -right-2 text-6xl font-black text-gray-200 -z-10">404</span>
                </div>
                
                <h1 className="text-5xl font-black text-gray-900 font-outfit">Oops! Page Not Found</h1>
                <p className="text-gray-600 text-lg">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                
                <div className="pt-6">
                    <Link
                        to="/"
                        className="inline-flex items-center px-8 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-all shadow-lg hover:shadow-orange-200 scale-105"
                    >
                        <Home className="mr-2" size={20} />
                        Back to Home
                    </Link>
                </div>
            </div>
            
            {/* Visual breakdown effect */}
            <div className="mt-12 opacity-20 hidden md:block">
                <img src="/404-illustration.svg" alt="error" className="max-w-md" />
            </div>
        </div>
    );
};

export default ErrorPage;
