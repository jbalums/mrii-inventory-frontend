import { formatToCurrency } from "@/libs/helpers";
import Infotext from "@/src/components/InfoText";
import ModalBody from "@/src/components/modals/components/ModalBody";
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

const ViewLowStocksModal = (props, ref) => {
	const [open, setOpen] = useState(false);
	const [item, setItem] = useState(null);
	const [list, setList] = useState([]);
	const [type, setType] = useState("low");
	const [dataLoading, setDataLoading] = useState(false);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data, type = "low") => {
		setType(type);
		if (data) {
			setList(data);
		} else {
			setList([]);
		}
		setOpen(true);
	};
	const hide = () => {
		setOpen(false);
	};
	const columns = useMemo(
		() => [
			{
				header: "Code",
				accessorKey: "code",
				className: "w-lg",
			},
			{
				header: "Name",
				accessorKey: "name",
			},
			{
				header: "UoM",
				accessorKey: "uom",
			},
			{
				header: "QTY on hand",
				accessorKey: "quantity",
				className: "!text-center !text-secondary-dark font-bold",
				thClassName: "items-center",
			},
			{
				header: "Low stock point",
				accessorKey: "stock_low_level",
				className: "!text-center !text-warning-dark font-bold",
				thClassName: "items-center ",
			},
			{
				header: "Re-order point",
				accessorKey: "reorder_point",
				className: "!text-center !text-danger font-bold",
				thClassName: "items-center",
			},
			{
				header: "Unit price",
				accessorKey: "price",
				cell: ({ row }) => {
					console.log("rrroooowww", row?.original);
					let p = row?.original?.price || 0;
					return formatToCurrency(p);
				},
			},
		],
		[]
	);

	return (
		<Modal open={open} hide={hide} size="xl">
			<ModalHeader
				title={
					type == "low"
						? "Low on stocks products"
						: "Empty stocks products"
				}
				hide={hide}
			/>
			<ModalBody
				className={`!p-0 !bg-foreground min-h-[calc(100vh-256px)]`}
			>
				<div className="flex flex-col lg:flex-row h-full">
					<div className="w-full border-t">
						<Table
							tableClassName="square-table transparent-table"
							columns={columns}
							pagination={false}
							loading={dataLoading}
							data={list}
						/>
					</div>
				</div>
			</ModalBody>
		</Modal>
	);
};

export default forwardRef(ViewLowStocksModal);
