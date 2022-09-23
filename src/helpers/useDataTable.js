import { useState } from "react";
import { useHttp } from "./useHttp";

const useDataTable = (url) => {
	const [page, setPage] = useState(1);
	const [paginate, setPaginate] = useState(10);
	const [keyword, setKeyword] = useState("");
	const [filters, setFilters] = useState({});

	const { data, loading, setLoading, meta, setMeta } = useHttp(url, [
		page,
		paginate,
		keyword,
		filters,
	]);

	return {
		data,
		loading,
		setLoading,
		page,
		setPage,
		paginate,
		setPaginate,
		keyword,
		setKeyword,
		filters,
		setFilters,
		meta,
		setMeta,
	};
};

export default useDataTable;
