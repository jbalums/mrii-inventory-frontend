import { useState } from "react";
import { useHttp } from "./useHttp";

const useDataTable = (url) => {
    const [page, setPage] = useState(1);
    const [paginate, setPaginate] = useState(10);
    const [keyword, setKeyword] = useState("");
    const [filters, setFilters] = useState({});

    const transformFilters = () => {
        let str = "";
        Object.keys(filters).map((key, index) => {
            str += `${index == 0 ? "" : "&"}${key}=${filters[key]}`;
        });
        return str;
    };

    const { data, loading, setLoading, meta, setMeta } = useHttp(
        `${url}?keyword=${keyword}&page=${page}&paginate=${paginate}&${transformFilters()}`,
        [page, paginate, keyword, filters]
    );

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
