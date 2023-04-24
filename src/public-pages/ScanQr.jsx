import { useEffect, useRef, useState } from "react";
import FlatIcon from "../components/FlatIcon";
import PublicAppLayout from "../components/PublicAppLayout";
import { QrReader } from "react-qr-reader";
const ScanQr = () => {
	const [scannedData, setScannedData] = useState("");
	const videoRef = useRef();

	const handleScan = (event) => {
		const video = videoRef.current;
		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d");

		// Draw video frame onto canvas
		context.drawImage(video, 0, 0, canvas.width, canvas.height);

		// Get image data from canvas
		const imageData = context.getImageData(
			0,
			0,
			canvas.width,
			canvas.height
		);

		// Decode QR code from image data
		const qr = new window.QRCodeDecoder();
		const result = qr.decodeFromImage(imageData);

		// Set scanned data
		setScannedData(result);
	};

	const handleError = (error) => {
		console.error(error);
	};

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: { facingMode: "environment" } })
			.then((stream) => {
				videoRef.current.srcObject = stream;
			})
			.catch(handleError);
	}, []);

	return (
		<PublicAppLayout
			containerClassName={`!p-0`}
			icon={<FlatIcon icon="rr-document" />}
			title={"Scan QR"}
			breadcrumbs={[
				{
					to: "/scan-qr",
					icon: "rr-mode-landscape",
					label: "Scan QR",
				},
			]}
		>
			<div>
				{scannedData ? (
					<p>Scanned data: {scannedData}</p>
				) : (
					<video
						ref={videoRef}
						style={{ width: "100%", height: "auto" }}
						onPlay={handleScan}
						onError={handleError}
					/>
				)}
			</div>
		</PublicAppLayout>
	);
};

export default ScanQr;
