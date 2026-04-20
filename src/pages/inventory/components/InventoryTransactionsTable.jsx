import { useEffect } from "react";

const InventoryTransactionsTable = ({ url, params }) => {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!url) return;
		setLoading(true);
	}, [url, params]);

	return (
		<div className="w-full border-t lg:px-0 overflow-auto">
			{loading ? (
				<div>Loading</div>
			) : (
				<div className="p-4 text-center text-sm text-gray-500">
					{{ url }}
				</div>
			)}
		</div>
	);
};

export default InventoryTransactionsTable;
