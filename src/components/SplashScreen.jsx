const SplashScreen = () => {
    return (
        <div
            class="bg-slate-200 h-screen flex items-center justify-center fixed top-0
         left-0 w-full gap-4"
        >
            <div className="flex items-center justify-center animate-pulse mb-11 lg:mb-0">
                <div class="splash-screen-loader"></div>
            </div>
            <div class="text-blue-900 animate-pulse mb-11 lg:mb-0">
                Loading...
            </div>
        </div>
    );
};

export default SplashScreen;
