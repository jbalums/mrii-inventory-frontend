import axios from "@/libs/axios";
import { formatToCurrency } from "@/libs/helpers";
import Button from "@/src/components/Button";
import Infotext from "@/src/components/InfoText";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import Modal from "@/src/components/modals/Modal";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useMemo,
	useState,
} from "react";
import { Link } from "react-router-dom";

const ViewInventoryTransactionsModal = (props, ref) => {
	const [open, setOpen] = useState(false);
	const [item, setItem] = useState(null);
	const [stock, setStock] = useState(null);
	const [info, setInfo] = useState(null);
	const [list, setList] = useState([]);
	const [url, setUrl] = useState(`/inventory/histories`);
	const {
		data,
		loading: dataLoading,
		setFilters,
	} = useDataTable(url, [open, url]);

	useEffect(() => {
		console.log("datadatadatadata", data);
		setList(data?.data || []);
	}, [data?.data]);
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		setInfo(data);
		setUrl(`/inventory/histories/${data?.id}`);
		setFilters((filters) => ({
			...filters,
			id: data?.id,
		}));
		setItem(data);
		getItemDetails(data?.product_id);
		setTimeout(() => {
			setOpen(true);
		}, 50);
	};

	const hide = () => {
		setOpen(false);
		setItem(null);
	};
	const formatDate = (date) => {
		let d = new Date(date);
		return `${String(d.getDate()).padStart(2, "0")}/${String(
			d.getMonth() + 1
		).padStart(2, "0")}/${d.getFullYear()} ${String(d.getHours()).padStart(
			2,
			"0"
		)}:${String(d.getMinutes()).padStart(2, "0")} ${
			d.getHours() >= 12 ? "PM" : "AM"
		}`;
	};
	const columns = useMemo(
		() => [
			{
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
				cell: ({ row }) => {
					console.log("row", row);
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
							className={
								item?.quantity_balance > 0
									? "text-green-700"
									: "text-red-700"
							}
						>
							{item?.quantity_balance}
						</span>
					);
				},
			},
			/* {
				header: "Unit price",
				accessorKey: "price",
				className: "!text-right",
				cell: ({ row }) => {
					let p = row?.original?.price || 0;
					return formatToCurrency(p);
				},
			}, */
		],
		[]
	);

	const getItemDetails = (id) => {
		axios.get(`./management/get-product-with-stock/${id}`).then((res) => {
			setItem(res.data?.product);
			setStock(res.data?.stock);
		});
	};

	return (
		<Modal open={open} hide={hide} size="xl">
			<ModalHeader
				title={"Inventory Transactions"}
				subtitle={`You can see product information and inventory histories.`}
				hide={hide}
			/>
			<ModalBody className={`!p-0 !bg-background`}>
				<h3 className="text-2xl mb-2 text-darker px-4 pt-4 bg-background border-b pb-4 w-full flex">
					{item?.name}

					<span className=" ml-auto font-normal">
						<div className="!text-sm px-3 py-1 rounded-xl flex items-center justify-center gap-1 bg-success bg-opacity-10 text-success">
							<span>QTY on hand: </span>
							<b className="text-xl px-1 border-b-4 border-success">
								{stock?.total_quantity}
							</b>
						</div>
					</span>
				</h3>
				<div className="grid grid-cols-1 lg:grid-cols-12 h-full">
					<div className="col-span-4 flex flex-col !bg-background h-full border-r">
						<div className="">
							<h3 className="text-lg font-bold text-darker px-4 pt-4">
								Product details
							</h3>
						</div>
						<div className="flex flex-col gap-y-4 p-4">
							<Infotext label="Product code" text={item?.code} />
							<Infotext label="Product name" text={item?.name} />
							<Infotext
								label="Product description"
								text={item?.description}
							/>
							<Infotext
								label="Category"
								text={item?.category?.name}
							/>
							<Infotext
								label="Unit of measurement"
								text={item?.unit_measurement}
							/>
							<Infotext
								label="Unit value"
								text={item?.unit_value}
							/>
							<Infotext
								label="Brand"
								text={item?.brand?.name || "-"}
							/>
						</div>
					</div>
					<div className="col-span-8 flex flex-col">
						<h3 className="text-lg font-bold text-darker px-4 pt-4 pb-[15px]">
							Inventory Transactions
						</h3>

						<div className="w-full border-t lg:px-0 overflow-auto">
							<Table
								tableClassName=""
								columns={columns}
								pagination={false}
								loading={dataLoading}
								data={list}
							/>
						</div>
					</div>
				</div>
			</ModalBody>
			<ModalFooter className={"flex justify-end"}>
				<Button type="primary" onClick={hide}>
					Close
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default forwardRef(ViewInventoryTransactionsModal);
