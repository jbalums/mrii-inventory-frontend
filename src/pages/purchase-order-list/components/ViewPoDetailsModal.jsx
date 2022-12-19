import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
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

const ViewPoDetailsModal = (props, ref) => {
	const [open, setOpen] = useState(false);

	const [list, setList] = useState([
		{
			id: "AG454",
			name: "Banana chopper",
			uom: "20 kg",
			qty_on_hand: "498",
			qty_to_order: "32",
		},
		{
			id: "BG231",
			name: "Test product 2",
			uom: "50 kg",
			qty_on_hand: "50",
			qty_to_order: "20",
		},
		{
			id: "CQW45",
			name: "Test product 3",
			uom: "10 kg",
			qty_on_hand: "200",
			qty_to_order: "15",
		},
	]);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = () => {
		setOpen(true);
	};
	const hide = () => {
		setOpen(false);
	};
	const columns = useMemo(
		() => [
			{
				header: "Product ID",
				accessorKey: "id",
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
				accessorKey: "qty_on_hand",
			},
			{
				header: "QTY to order",
				accessorKey: "qty_to_order",
			},
		],
		[]
	);

	return (
		<Modal open={open} hide={hide} size="xl">
			<ModalHeader
				headerClassName={`w-full`}
				title={"MACTAN ROCK INDUSTRIES, INC."}
				subtitle={`Manufacturer of Water Treatment Chemicals and Equipment`}
				titleClassName="!w-full text-center font-bold text-xl"
				subtitleClassName="!w-full text-center text-base"
				className={`border-0`}
				hide={hide}
			/>
			<ModalBody className={`!p-0 !bg-background`}>
				<div className="flex flex-col h-full">
					<div className=" flex flex-col lg:flex-row !bg-foreground h-full p-4 gap-2 lg:gap-6 xl:gap-8">
						<div className="flex flex-col pr-2 lg:pr-6 xl:pr-8 border-r border-border">
							<h4 className="text-base font-bold text-darker">
								Purchase Order list
							</h4>
							<span className="text-dark text-sm">
								Date: Dec 14, 2022
							</span>
						</div>
						<div className="flex flex-col pr-2 lg:pr-6 xl:pr-8">
							<h4 className="text-base font-bold text-darker">
								Order number
							</h4>
							<span className="text-dark text-sm">AG454</span>
						</div>
						<div className="flex flex-col pr-2 lg:pr-6 xl:pr-8">
							<h4 className="text-base font-bold text-darker">
								Requestor name
							</h4>
							<span className="text-dark text-sm">
								Jonas Nickel
							</span>
						</div>
						<div className="flex flex-col pr-2 lg:pr-6 xl:pr-8">
							<h4 className="text-base font-bold text-darker">
								Division
							</h4>
							<span className="text-dark text-sm">Cebu</span>
						</div>
						<div className="ml-auto flex items-center gap-6">
							<Button type="primary" size="md" className="gap-2">
								<FlatIcon icon="rr-disk" />
								Save PDF
							</Button>
							<Button type="accent" size="md" className="gap-2">
								<FlatIcon icon="rr-print" />
								Print list
							</Button>
						</div>
					</div>

					<div className="w-full border-t lg:min-h-[calc(100vh-384px)]">
						<Table
							tableClassName="square-table transparent-table"
							columns={columns}
							pagination={false}
							loading={false}
							data={list}
						/>
					</div>
				</div>
			</ModalBody>
		</Modal>
	);
};

export default forwardRef(ViewPoDetailsModal);
