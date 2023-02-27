import { purposeElements } from "@/libs/elementsHelper";

const RequestOrderCard = ({ className = "", data, status }) => {
	{
		console.log("RequestOrderCard datadata", data);
	}
	return (
		<div
			className={`rounded-lg bg-background shadow border border-border p-4 flex flex-col gap-2 ${className}`}
		>
			{/* Request Purpose 
            Reference Number 
            Project code 
            Date needed */}
			<b className="text-lg mb-3">Request Details</b>

			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
				<div className="flex flex-col gap-1">
					<span className="text-sm">Reference number:</span>
					<div className="!text-lg !font-bold flex items-center justify-start pt-2 !text-center uppercase">
						{data?.account_code}
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<span className="text-sm">Purpose:</span>
					<div className="!text-lg !font-bold scale-125 flex items-center justify-start pl-7 pt-2 !text-center uppercase">
						{purposeElements[data?.purpose]}
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<span className="text-sm">Project Code:</span>
					<div className="!text-lg !font-bold flex items-center justify-start pt-2 !text-center uppercase">
						{data?.account_code}
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<span className="text-sm">Requested by:</span>
					<div className="!text-lg !font-bold flex items-center justify-start pt-2 !text-center uppercase">
						{data?.requester?.name}
					</div>
				</div>
				{status && (
					<div className="flex flex-col gap-1">
						<span className="text-sm">{status?.title}</span>
						<div className="!text-lg !font-bold flex items-center justify-start pt-2 !text-center uppercase">
							{status?.value}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default RequestOrderCard;
