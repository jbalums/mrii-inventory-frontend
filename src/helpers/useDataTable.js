import { useState } from "react";
import { useHttp } from "./useHttp";
import { v4 as uuidv4 } from "uuid";
const useDataTable = (url, setList, defaultFilters, allowFetch = true) => {
	const [page, setPage] = useState(1);
	const [paginate, setPaginate] = useState(10);
	const [keyword, setKeyword] = useState("");
	const [filters, setFilters] = useState(defaultFilters || {});

	const transformFilters = () => {
		let str = "";
		Object.keys(filters).map((key, index) => {
			str += `${index == 0 ? "" : "&"}${key}=${filters[key]}`;
		});
		return str;
	};

	const addToList = (item) => {
		setList((list) => [item, ...list]);
	};

	const updateInList = (item) => {
		setList((list) => list.map((x) => (x.id == item.id ? item : x)));
	};

	const removeFromList = (item) => {
		setList((list) => list.filter((x) => x.id != item.id));
	};

	const { data, loading, setLoading, meta, setMeta } = useHttp(
		`${url}?keyword=${keyword}&page=${page}&paginate=${paginate}&${transformFilters()}`,
		[page, paginate, keyword, filters],
		allowFetch
	);

	const refreshData = () => {
		setFilters((prevFils) => ({
			...prevFils,
			key: uuidv4(),
		}));
	};
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
		addToList,
		updateInList,
		removeFromList,
		refreshData,
	};
};

export default useDataTable;
