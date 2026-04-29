import axios from "@/libs/axios";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import TextInputField from "@/src/components/forms/TextInputField";
import Infotext from "@/src/components/InfoText";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import Modal from "@/src/components/modals/Modal";
import Table from "@/src/components/table/Table";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const DEFAULT_TRANSACTION_SORTING = [{ id: "created_at", desc: true }];

const ProductDetailsModal = ({
	open,
	productId,
	onClose,
	extraElements = null,
	extraInventoryTransactionButton = null,
	options = {},
}) => {
	const [product, setProduct] = useState(null);
	const [transactions, setTransactions] = useState([]);
	const [transactionsMeta, setTransactionsMeta] = useState(null);
	const [transactionsPage, setTransactionsPage] = useState(1);
	const [transactionsPaginate, setTransactionsPaginate] = useState(10);
	const [transactionsSorting, setTransactionsSorting] = useState(
		DEFAULT_TRANSACTION_SORTING,
	);
	const [transactionsKeyword, setTransactionsKeyword] = useState(
		options?.keyword || "",
	);
	const [loading, setLoading] = useState(false);
	const [transactionsLoading, setTransactionsLoading] = useState(false);
	const [error, setError] = useState("");
	const [transactionsError, setTransactionsError] = useState("");
	const transactionSort = transactionsSorting[0] || null;

	const formatDate = (date) => {
		let d = new Date(date);
		return `${String(d.getDate()).padStart(2, "0")}/${String(
			d.getMonth() + 1,
		).padStart(2, "0")}/${d.getFullYear()} ${String(d.getHours()).padStart(
			2,
			"0",
		)}:${String(d.getMinutes()).padStart(2, "0")} ${
			d.getHours() >= 12 ? "PM" : "AM"
		}`;
	};

	const transactionColumns = useMemo(
		() => [
			{
				id: "transaction_details",
				header: "Details",
				accessorKey: "created_at",
				cell: ({ row }) => {
					return row?.original?.receive ? (
						`PO #${row?.original?.receive?.purchase_order}`
					) : row?.original?.request ? (
						<Link
							target="_blank"
							to={`/request-orders/${row?.original?.request?.id}`}
						>
							<span className="text-blue-600 hover:underline">{`Ref #${row?.original?.request?.account_code}`}</span>
						</Link>
					) : (
						row?.original?.details || "-"
					);
				},
			},
			{
				header: "Date",
				accessorKey: "created_at",
				sortable: true,
				cell: ({ row }) => {
					return row?.original?.created_at
						? formatDate(row?.original?.created_at)
						: "";
				},
			},
			{
				header: "Movement",
				accessorKey: "movement",
				className: "!text-center",
			},
			{
				header: "QTY",
				accessorKey: "quantity",
				className: "!text-center",
				cell: ({ row }) => {
					let item = row?.original;
					return (
						<span
							className={
								item?.movement == "in"
									? "text-green-700"
									: "text-red-700"
							}
						>
							{item?.movement == "in" ? "+ " : "- "}
							{item?.quantity}
						</span>
					);
				},
			},
			{
				header: "Running QTY",
				accessorKey: "running_quantity",
				className: "!text-center",
				cell: ({ row }) => {
					let item = row?.original;
					return (
						<span
							className={`text-sm font-bold ${
								item?.quantity_balance > 0
									? "text-green-700"
									: "text-red-700"
							}`}
						>
							{item?.quantity_balance}
						</span>
					);
				},
			},
		],
		[],
	);

	useEffect(() => {
		if (!open || !productId) {
			setProduct(null);
			setTransactions([]);
			setTransactionsMeta(null);
			setTransactionsPage(1);
			setTransactionsSorting(DEFAULT_TRANSACTION_SORTING);
			setTransactionsKeyword("");
			setError("");
			setTransactionsError("");
			return;
		}

		let isCurrent = true;

		setLoading(true);
		setError("");

		axios
			.get(`/management/products/${productId}`)
			.then((res) => {
				if (isCurrent) {
					setProduct(res.data?.data || null);
				}
			})
			.catch(() => {
				if (isCurrent) {
					setError("Unable to load product details.");
				}
			})
			.finally(() => {
				if (isCurrent) {
					setLoading(false);
				}
			});

		return () => {
			isCurrent = false;
		};
	}, [open, productId]);

	useEffect(() => {
		if (open && productId) {
			setTransactionsPage(1);
			setTransactionsKeyword(options?.keyword || "");
		}
	}, [open, productId]);

	useEffect(() => {
		if (!open || !productId) {
			setTransactions([]);
			setTransactionsMeta(null);
			setTransactionsError("");
			return;
		}

		let isCurrent = true;

		setTransactionsLoading(true);
		setTransactionsError("");

		axios
			.get("/v2/inventory/transaction-histories", {
				params: {
					product_id: productId,
					page: transactionsPage,
					paginate: transactionsPaginate,
					keyword: transactionsKeyword,
					...(transactionSort?.id
						? {
								sort_by: transactionSort.id,
								sort_direction: transactionSort.desc
									? "desc"
									: "asc",
							}
						: {}),
				},
			})
			.then((res) => {
				if (isCurrent) {
					setTransactions(res.data?.data || []);
					setTransactionsMeta({
						current_page: res.data?.meta?.current_page || 1,
						from: res.data?.meta?.from,
						last_page: res.data?.meta?.last_page || 1,
						per_page:
							res.data?.meta?.per_page || transactionsPaginate,
						to: res.data?.meta?.to,
						total: res.data?.meta?.total || 0,
					});
				}
			})
			.catch(() => {
				if (isCurrent) {
					setTransactionsError(
						"Unable to load inventory transactions.",
					);
				}
			})
			.finally(() => {
				if (isCurrent) {
					setTransactionsLoading(false);
				}
			});

		return () => {
			isCurrent = false;
		};
	}, [
		open,
		productId,
		transactionsPage,
		transactionsPaginate,
		transactionsKeyword,
		transactionSort?.id,
		transactionSort?.desc,
	]);

	return (
		<Modal open={open} hide={onClose} size="xl">
			<ModalHeader
				title="Product details"
				subtitle="Product information from the master product record."
				hide={onClose}
			/>
			<ModalBody className="!p-0">
				{loading ? (
					<div className="py-8 text-center text-placeholder">
						Loading product details...
					</div>
				) : error ? (
					<div className="py-8 text-center text-danger">{error}</div>
				) : (
					<div className="grid grid-cols-12 gap-4 px-4">
						<div className="flex flex-col gap-4 col-span-4 py-4">
							{extraElements ? extraElements : null}
							<Infotext
								label="Product code"
								text={product?.code || "-"}
								className="lg:col-span-2"
							/>
							<Infotext
								label="Product name"
								text={product?.name || "-"}
								className="lg:col-span-2"
							/>
							<Infotext
								label="Description"
								text={product?.description || "-"}
								className="lg:col-span-2"
							/>
							<Infotext
								label="Category"
								text={product?.category?.name || "-"}
							/>
							<Infotext
								label="Brand"
								text={
									product?.brand?.name ||
									product?.brand ||
									"-"
								}
							/>
							<Infotext
								label="Unit of measurement"
								text={product?.unit_measurement || "-"}
							/>
							<Infotext
								label="Unit value"
								text={product?.unit_value || "-"}
							/>
						</div>
						<div className="border-l col-span-8 lg:min-h-[calc(100vh-300px)]">
							<div className="flex flex-wrap items-center gap-3 w-full px-4 pt-4 pb-3">
								<h3 className="text-lg font-bold text-darker mr-auto">
									Inventory transactions
								</h3>
								<TextInputField
									className="w-full sm:w-[260px]"
									inputClassName="!py-2"
									icon={
										<FlatIcon
											icon="rr-search"
											className="text-sm"
										/>
									}
									placeholder="Search transactions"
									value={transactionsKeyword}
									onChange={(e) => {
										setTransactionsKeyword(e.target.value);
										setTransactionsPage(1);
									}}
								/>
								{extraInventoryTransactionButton ? (
									<div>{extraInventoryTransactionButton}</div>
								) : null}
							</div>
							{transactionsError ? (
								<div className="px-4 pb-4 text-sm text-danger">
									{transactionsError}
								</div>
							) : (
								<div className="w-full overflow-auto bg-white">
									<Table
										columns={transactionColumns}
										pagination={true}
										loading={transactionsLoading}
										data={transactions}
										meta={transactionsMeta}
										displayShowing={true}
										paginationClassName="px-4 pb-4"
										serverSort={true}
										initialSorting={
											DEFAULT_TRANSACTION_SORTING
										}
										onTableSort={(sorting) => {
											setTransactionsSorting(sorting);
											setTransactionsPage(1);
										}}
										onTableChange={(data) => {
											setTransactionsPage(
												data?.pageIndex + 1 || 1,
											);
											setTransactionsPaginate(
												data?.pageSize || 10,
											);
										}}
									/>
								</div>
							)}
						</div>
					</div>
				)}
			</ModalBody>
			<ModalFooter className="flex items-center justify-end">
				<Button type="primary" onClick={onClose}>
					Close
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default ProductDetailsModal;
