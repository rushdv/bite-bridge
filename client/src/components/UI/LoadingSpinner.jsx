const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-b-orange-400 rounded-full animate-pulse opacity-50"></div>
            </div>
            <p className="mt-4 text-orange-600 font-bold animate-pulse font-outfit">Loading BiteBridge...</p>
        </div>
    );
};

export default LoadingSpinner;
