import FlatIcon from "../FlatIcon";

const DashboardWidget = ({ bgColor, color, title, count, icon }) => {
	return (
		<div
			className={`rounded-lg flex flex-col relative ${bgColor} aspect-[3/1] `}
		>
			<div
				className={`font-semibold px-4 text-xs 2xl:text-lg pt-3 ${color}`}
			>
				{title}
			</div>
			<div className="px-4 pt-11 pb-5 flex items-center justify-start">
				<h2 className={`text-[88px] font-bold ${color}`}>{count}</h2>
			</div>
			<div className="absolute top-4 right-4 2xl:right-6 opacity-20">
				<FlatIcon
					icon={icon}
					className={`text-[52px] 2xl:text-[72px] ${color}`}
				/>
			</div>
		</div>
	);
};

export default DashboardWidget;
