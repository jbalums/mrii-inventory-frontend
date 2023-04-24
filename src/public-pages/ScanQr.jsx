import { useEffect, useState } from "react";
import FlatIcon from "../components/FlatIcon";
import PublicAppLayout from "../components/PublicAppLayout";
import { QrReader } from "react-qr-reader";
import Button from "../components/Button";
const ScanQr = () => {
	const [data, setData] = useState("No result");
	const [constraints, setConstraints] = useState({ facingMode: "user" });
	const handleScan = (data) => {
		if (data) {
			alert(`Scanned QR code with data: ${data}`);
		}
	};

	const handleError = (error) => {
		console.error(error);
	};

	useEffect(() => {
		navigator?.mediaDevices
			?.getUserMedia({ video: { facingMode: "environment" } })
			.then(() => {
				console.log("success");
			})
			.catch((err) => console.error(err));
	});
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
			<div className="w-[256px]">
				<QrReader
					constraints={constraints}
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
			</div>
			<p>{data}</p>
			<Button
				onClick={() => {
					setConstraints((prevData) => {
						if (prevData?.facingMode == "user")
							return { facingMode: "environment" };
						else return { facingMode: "user" };
					});
				}}
			>
				Switch
			</Button>
		</PublicAppLayout>
	);
};

export default ScanQr;
