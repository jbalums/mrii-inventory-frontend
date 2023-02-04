import LayoutContainer from "./layout/LayoutContainer";

const SplashScreen = () => {
	return (
		<LayoutContainer className=" ">
			<div
				className="bg-slate-900 z-10 bg-opacity-75 h-screen flex items-center justify-center fixed top-0
         left-0 w-full gap-4 animate-fadeOut"
			>
				<div className="flex items-center justify-center animate-pulse mb-11 lg:mb-0">
					<div class="splash-screen-loader"></div>
				</div>
				<div class="text-blue-100 tracking-widest animate-pulse mb-11 lg:mb-0 font-bold text-lg">
					Loading...
				</div>
			</div>
		</LayoutContainer>
	);
};

export default SplashScreen;
