import { useState } from "react";
import FlatIcon from "../components/FlatIcon";
import PublicAppLayout from "../components/PublicAppLayout";
import { QrReader } from "react-qr-reader";
const ScanQr = () => {
	const [data, setData] = useState("No result");
	const handleScan = (data) => {
		if (data) {
			alert(`Scanned QR code with data: ${data}`);
		}
	};

	const handleError = (error) => {
		console.error(error);
	};

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
			<QrReader
				facingMode={{ exact: "environment" }}
				onResult={(result, error) => {
					if (!!result) {
						setData(result?.text);
					}

					if (!!error) {
						console.info(error);
					}
				}}
				style={{
					width: "100%",
					background: "red",
					border: "1px solid black",
				}}
			/>
			<p>{data}</p>
		</PublicAppLayout>
	);
};

export default ScanQr;
