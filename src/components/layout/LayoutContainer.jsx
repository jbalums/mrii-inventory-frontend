import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { useLocation } from "react-router-dom";

const LayoutContainer = ({ className = " animate-fadeIn", children }) => {
	const location = useLocation();
	const [ready, setReady] = useState(false);

	const allowParticles = ["/", "/login", "/register"].includes(
		location.pathname,
	);

	const particlesInit = useCallback(async (engine) => {
		// you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(engine);
	}, []);

	const particlesLoaded = useCallback(async (container) => {}, []);

	useEffect(() => {
		setTimeout(() => {
			setReady(allowParticles);
		}, 200);
	}, []);

	return (
		<div
			className={`h-screen w-screen bg-slate-900 flex flex-col lg:flex-row items-center justify-start lg:justify-center px-6 pt-20 pb-11 lg:p-20 relative ${className}`}
		>
			<img
				src="/b1.jpg"
				className="fixed top-0 left-0 w-[125%] h-[125%] opacity-75 object-cover z-[1]"
			/>

			<div
				className="z-[5] fixed h-screen w-full top-0 left-0
	 opacity-50
"
			>
				{ready && (
					<Particles
						id="tsparticles"
						init={particlesInit}
						loaded={particlesLoaded}
						options={{
							background: {
								color: {
									value: "transparent",
								},
							},
							fpsLimit: 30,
							fullScreen: {
								enable: true,
								zIndex: 0,
							},
							interactivity: {
								events: {
									onClick: {
										enable: false,
										mode: "push",
									},
									onHover: {
										enable: false,
										mode: "repulse",
									},
									resize: false,
								},
								modes: {
									bubble: {
										distance: 400,
										duration: 2,
										opacity: 0.8,
										size: 40,
									},
									push: {
										quantity: 10,
									},
									repulse: {
										distance: 200,
										duration: 1,
									},
								},
							},
							particles: {
								color: {
									value: "#ffffff",
								},
								links: {
									color: "#ffffff",
									distance: 150,
									enable: true,
									opacity: 0.6,
									width: 1,
								},
								collisions: {
									enable: true,
								},
								move: {
									direction: "none",
									enable: true,
									outMode: "bounce",
									random: false,
									speed: 0.5,
									straight: false,
								},
								number: {
									density: {
										enable: true,
										area: 800,
									},
									value: 100,
								},
								opacity: {
									value: 0.5,
								},
								shape: {
									type: "circle",
								},
								size: {
									random: true,
									value: 3,
								},
							},
							detectRetina: true,
						}}
					/>
				)}
			</div>

			{children}
		</div>
	);
};

export default LayoutContainer;
