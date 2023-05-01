import { getGPUTier } from "detect-gpu";
import { useEffect, useState } from "react";

const Test = () => {
	const [accelerated, setAccelerated] = useState(null);

	useEffect(() => {
		const canvas = document.createElement("canvas");
		const gl = canvas.getContext("webgl");
		const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
		const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

		console.log("Renderer:", renderer);

		const hardwareAccelerationEnabled =
			renderer.toLowerCase().includes("swiftshader") === false;

		console.log(
			"Hardware acceleration enabled:",
			hardwareAccelerationEnabled
		);
		/* 
		let t = setTimeout(async () => {
			let getGPU = await getGPUTier();

			if (getGPU?.fps && getGPU?.tier > 1) {
			//  Hardware Acceleration is active. 
				setAccelerated(true);
			} else {
				//  Hardware Acceleration is NOT active 
				setAccelerated(false);
			}
		}, 2000);
		return () => {
			clearTimeout(t);
		}; */
	}, []);

	return accelerated == null
		? "LOADING"
		: accelerated
		? "Hardware Acceleration is active."
		: "Hardware Acceleration is NOT active.";
};

export default Test;
