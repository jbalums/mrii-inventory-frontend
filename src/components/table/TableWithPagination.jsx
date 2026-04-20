import React, { useEffect, useMemo, useState } from "react";
import axios from "@/libs/axios";

const DEFAULT_PARAMS = {};

export default function TableWithPagination({
	url,
	params = DEFAULT_PARAMS,
	columns = [],
	rowKey = "id",
	perPage = 10,
}) {
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [pagination, setPagination] = useState({
		current_page: 1,
		last_page: 1,
		per_page: perPage,
		total: 0,
		from: null,
		to: null,
	});

	const paramsKey = JSON.stringify(params || DEFAULT_PARAMS);

	const mergedParams = useMemo(() => {
		return {
			...JSON.parse(paramsKey),
			page: pagination.current_page,
			per_page: pagination.per_page,
		};
	}, [paramsKey, pagination.current_page, pagination.per_page]);

	const fetchData = async () => {
		try {
			if (!url) return;

			setLoading(true);
			setError("");

			const response = await axios.get(url, {
				params: mergedParams,
			});

			const result = response.data;
			setRows(result.data || []);
			setPagination((prev) => {
				const next = {
					...prev,
					current_page: result.current_page ?? 1,
					last_page: result.last_page ?? 1,
					per_page: result.per_page ?? perPage,
					total: result.total ?? 0,
					from: result.from ?? null,
					to: result.to ?? null,
				};

				return Object.keys(next).every((key) => next[key] === prev[key])
					? prev
					: next;
			});
		} catch (err) {
			setError(
				err?.response?.data?.message ||
					err?.message ||
					"Failed to load table data.",
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [url, mergedParams]);

	const goToPage = (page) => {
		if (page < 1 || page > pagination.last_page) return;

		setPagination((prev) => ({
			...prev,
			current_page: page,
		}));
	};

	const changePerPage = (value) => {
		setPagination((prev) => ({
			...prev,
			per_page: Number(value),
			current_page: 1,
		}));
	};

	return (
		<div
			style={{
				padding: "16px",
				border: "1px solid #ddd",
				borderRadius: "8px",
			}}
		>
			<div
				style={{
					marginBottom: "12px",
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<div>
					<strong>Total:</strong> {pagination.total}
				</div>

				<div>
					<label>
						Per page:{" "}
						<select
							value={pagination.per_page}
							onChange={(e) => changePerPage(e.target.value)}
						>
							<option value={5}>5</option>
							<option value={10}>10</option>
							<option value={25}>25</option>
							<option value={50}>50</option>
						</select>
					</label>
				</div>
			</div>

			{loading && <p>Loading...</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}

			{!loading && !error && (
				<>
					<table
						width="100%"
						cellPadding="10"
						style={{
							borderCollapse: "collapse",
							border: "1px solid #ddd",
						}}
					>
						<thead>
							<tr>
								{columns.map((col) => (
									<th
										key={col.key}
										style={{
											borderBottom: "1px solid #ddd",
											textAlign: "left",
										}}
									>
										{col.title}
									</th>
								))}
							</tr>
						</thead>

						<tbody>
							{rows.length > 0 ? (
								rows.map((row, index) => (
									<tr key={row[rowKey] ?? index}>
										{columns.map((col) => (
											<td
												key={col.key}
												style={{
													borderBottom:
														"1px solid #eee",
												}}
											>
												{col.render
													? col.render(
															row[col.dataIndex],
															row,
															index,
														)
													: row[col.dataIndex]}
											</td>
										))}
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan={columns.length}
										style={{ textAlign: "center" }}
									>
										No data found.
									</td>
								</tr>
							)}
						</tbody>
					</table>

					<div
						style={{
							marginTop: "16px",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<div>
							Showing {pagination.from ?? 0} to{" "}
							{pagination.to ?? 0} of {pagination.total}
						</div>

						<div style={{ display: "flex", gap: "8px" }}>
							<button
								onClick={() =>
									goToPage(pagination.current_page - 1)
								}
								disabled={pagination.current_page === 1}
							>
								Prev
							</button>

							<span>
								Page {pagination.current_page} of{" "}
								{pagination.last_page}
							</span>

							<button
								onClick={() =>
									goToPage(pagination.current_page + 1)
								}
								disabled={
									pagination.current_page ===
									pagination.last_page
								}
							>
								Next
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
