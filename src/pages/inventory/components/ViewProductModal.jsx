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

const ViewProductModal = (props, ref) => {
	const [open, setOpen] = useState(false);
	const [item, setItem] = useState(null);
	const [list, setList] = useState([]);
	const { data, loading: dataLoading } = useDataTable(
		`/management/products`,
		[open]
	);

	useEffect(() => {
		setList(data?.data || []);
	}, [data?.data]);
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		setItem(data);
		setOpen(true);
	};
	const hide = () => {
		setOpen(false);
	};
	const columns = useMemo(
		() => [
			{
				header: "Unit price",
				accessorKey: "price",
			},
			{
				header: "Expiry date",
				accessorKey: "expiry_date",
			},
			{
				header: "New qty",
				accessorKey: "new_qty",
			},
			{
				header: "Modified by",
				accessorKey: "modified_by",
			},
			{
				header: "Date modified",
				accessorKey: "date_modified",
			},
		],
		[]
	);

	return (
		<Modal open={open} hide={hide} size="xl">
			<ModalHeader
				title={"Item view"}
				subtitle={`You can see item details and inventory information, and item modification reports.`}
				hide={hide}
			/>
			<ModalBody className={`!p-0 !bg-foreground`}>
				<div className="flex flex-col lg:flex-row h-full">
					<div className="w-[252px] flex flex-col !bg-background h-full">
						<div className="flex flex-col p-4 border-b border-border">
							<h3 className="text-2xl mb-2 text-darker">
								{item?.name}
							</h3>
							<p className="text-sm text-dark">
								{item?.description}
							</p>
						</div>
						<div className="flex flex-col gap-y-4 p-4">
							<Infotext label="Product code" text={item?.code} />
							<Infotext
								label="Unit of measurement"
								text={item?.uom}
							/>
							<Infotext label="Unit value" text="" />
							<Infotext label="Category" text="" />
							<Infotext label="Location" text="" />
							<Infotext label="Product status" text="" />
							<Infotext label="Category" text="" />
							<Infotext label="Category" text="" />
							<Infotext label="Category" text="" />
						</div>
					</div>
					<div className="w-[calc(100%-252px)] flex flex-col">
						<h3 className="text-lg font-bold text-darker px-4 pt-4 pb-[15px]">
							Item Report
						</h3>

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
				</div>
			</ModalBody>
		</Modal>
	);
};

export default forwardRef(ViewProductModal);
