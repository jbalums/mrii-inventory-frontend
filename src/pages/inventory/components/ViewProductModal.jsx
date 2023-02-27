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

const ViewProductModal = (props, ref) => {
	const [open, setOpen] = useState(false);
	const [item, setItem] = useState(null);
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
	};

	const columns = useMemo(
		() => [
			{
				header: "PO #",
				accessorKey: "receives.purchase_order",
			},
			{
				header: "Date received",
				accessorKey: "receives.date_receive",
			},
			{
				header: "QTY received",
				accessorKey: "quantity",
				className: "!text-center",
			},
			{
				header: "Unit price",
				accessorKey: "price",
				className: "!text-right",
				cell: ({ row }) => {
					let p = row?.original?.price || 0;
					return formatToCurrency(p);
				},
			},
		],
		[]
	);

	const getItemDetails = (id) => {
		axios.get(`./management/products/${id}`).then((res) => {
			setItem(res.data.data);
		});
	};

	return (
		<Modal open={open} hide={hide} size="lg">
			<ModalHeader
				title={"Inventory information"}
				subtitle={`You can see product information and inventory histories.`}
				hide={hide}
			/>
			<ModalBody className={`!p-0 !bg-background`}>
				<h3 className="text-2xl mb-2 text-darker px-4 pt-4 bg-background border-b pb-4">
					{item?.name}
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-4 px-4">
					<div className="p-3 rounded-xl flex flex-col gap-1 bg-success bg-opacity-10 text-success">
						<span>QTY on hand</span>
						<b className="text-2xl">{info?.quantity}</b>
					</div>
					<div className="p-3 rounded-xl flex flex-col gap-1 bg-warning bg-opacity-5 text-warning">
						<span>Stock minimum level</span>
						<b className="text-2xl">{info?.stock_low_level}</b>
					</div>
					<div className="p-3 rounded-xl flex flex-col gap-1 bg-danger bg-opacity-5 text-danger">
						<span>Stock re-order point</span>
						<b className="text-2xl">{info?.reorder_point}</b>
					</div>
				</div>
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
							Inventory histories
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

export default forwardRef(ViewProductModal);
