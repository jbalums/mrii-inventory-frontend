export const purposeElements = {
	production: (
		<span className="min-w-[128px] p-1 px-3 rounded-2xl text-sm bg-blue-500 text-blue-700 bg-opacity-10">
			production
		</span>
	),
	project_plant: (
		<span className="min-w-[128px] p-1 px-3 rounded-2xl text-sm bg-indigo-700 text-indigo-700 bg-opacity-10">
			project/plant
		</span>
	),
	sale: (
		<span className="min-w-[128px] p-1 px-3 rounded-2xl text-sm bg-green-600 text-green-700 bg-opacity-10">
			sales
		</span>
	),
	stocking: (
		<span className="min-w-[128px] p-1 px-3 rounded-2xl text-sm bg-primary text-primary bg-opacity-10">
			stocking
		</span>
	),
	internal_use: (
		<span className="min-w-[128px] p-1 px-3 rounded-2xl text-sm bg-secondary text-secondary bg-opacity-10">
			internal use
		</span>
	),
	for_purchase: (
		<span className="min-w-[128px] p-1 px-3 rounded-2xl text-sm bg-orange-500 text-orange-700 bg-opacity-10">
			for purchase
		</span>
	),
};

export const requestOrderStatus = {
	cancelled: (
		<span className="font-semibold uppercase text-red-700">cancelled</span>
	),
	completed: (
		<span className="font-semibold uppercase  text-green-700">
			completed
		</span>
	),
	approved: (
		<span className="font-semibold uppercase text-blue-700">approved</span>
	),
	pending: (
		<span className="font-semibold uppercase text-warning">pending</span>
	),
};
