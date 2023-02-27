import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import SelectItemsModal from "@/src/components/items/SelectItemsModal";
import CardLayout from "@/src/components/layout/CardLayout";
import AffirmationModal from "@/src/components/modals/AffirmationModal";
import ConfirmModal from "@/src/components/modals/ConfirmModal";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RequestOrdersFormModal from "./components/RequestOrdersFormModal";
import useRequestOrdersHook from "./hooks/useRequestOrdersHook.js";

const ItemDelivery = () => {
	const complete_order_ref = useRef(null);
	const navigate = useNavigate();
	const [list, setList] = useState([
		{
			code: "AG454",
			name: "Product test 1",
			location: "Tagbilaran City, Bohol",
			uom: "10kg",
			qty: "10",
		},
		{
			code: "AHW11",
			name: "Product test 2",
			location: "Baclayon, Bohol",
			uom: "1,000 ML",
			qty: "100",
		},
		{
			code: "AG425",
			name: "Product test 3",
			location: "Tagbilaran City, Bohol",
			uom: "10kg",
			qty: "10",
		},
	]);
	const { data, loading: dataLoading } = useDataTable(
		`/inventory/request`,
		null
	);

	const columns = useMemo(
		() => [
			{
				header: "Code",
				accessorKey: "code",
				className: "",
				cellClassName: "",
			},
			{
				header: "Name",
				accessorKey: "name",
				className: " !font-bold",
				cellClassName: "",
			},
			{
				header: "Location",
				accessorKey: "location",
				className: "",
				cellClassName: "",
			},
			{
				header: "UoM",
				accessorKey: "uom",
				className: "",
				cellClassName: "",
			},
			{
				header: "QTY on hand",
				accessorKey: "qty",
				className: "",
				cellClassName: "",
			},
			{
				header: "QTY to order",
				accessorKey: "qty",
				className: "",
				cellClassName: "",
			},
		],
		[]
	);

	useEffect(() => {
		// setList(data?.data || []);
	}, [data?.data]);

	return (
		<AppLayout
			title="Item delivery"
			backBtn
			titleChildren={
				<div className="ml-auto flex items-start justify-center gap-4">
					<div className="flex flex-col">
						<span className="text-xs font-light text-dark">
							Order number
						</span>
						<b className="text-sm text-darker">AG454</b>
					</div>
					<div className="h-11 border-r border-border"></div>
					<Button
						disabled={true}
						type="accent"
						onClick={() => {
							complete_order_ref.current.show();
						}}
					>
						<FlatIcon icon="br-check" className="mr-2" /> Complete
						order{" "}
					</Button>
				</div>
			}
		>
			<div className="w-full">
				<div className="flex flex-col lg:flex-row items-center justify-center pb-6 border-b border-border -mx-6 px-6">
					<Button
						type="background"
						className="rounded-r-none"
						onClick={() => {
							navigate("/request-orders/prepare-item-delivery");
						}}
					>
						<FlatIcon icon="rr-box-check" className="mr-2" />
						Preparing to order
						<div className="bg-foreground px-2 min-w-[32px] text-center text-dark rounded-lg ml-2">
							3
						</div>
					</Button>
					<Button
						type="primary"
						className="rounded-l-none"
						onClick={() => {
							navigate("/request-orders/item-delivery");
						}}
					>
						<FlatIcon icon="rs-garage-open" className="mr-2" />
						Recieved products
						<div className="bg-background px-2 min-w-[32px] text-center text-dark rounded-lg ml-2">
							3
						</div>
					</Button>
				</div>
				<div className="flex flex-col gap-y-6 pt-6">
					{/* <p className="text-sm text-dark">
						All ordered items will deliver by location
					</p> */}
					<CardLayout className="!p-0 !bg-background !shadow-sm">
						<div className="border-b px-4 py-6 flex flex-col lg:flex-row gap-4 items-center">
							<div className="text-lg font-light">
								<span>Order location:</span>
								<b> Cebu</b>
								<span className="bg-success bg-opacity-10 text-sm py-1 px-2 rounded-xl ml-2  text-success">
									Completed
								</span>
							</div>
							<div className="lg:ml-auto gap-4 flex items-center">
								<p>
									Expected date to arrive:{" "}
									<b className="text-accent">Dec 23, 2022</b>
								</p>
							</div>
						</div>
						<Table
							rowClick={(data) => {}}
							columns={columns}
							pagination={false}
							loading={dataLoading}
							data={list}
							emptyMessage={`You don’t have an order`}
						/>
					</CardLayout>
					<CardLayout className="!p-0 !bg-background !shadow-sm">
						<div className="border-b px-4 py-6 flex flex-col lg:flex-row gap-4 items-center">
							<div className="text-lg font-light">
								<span>Order location:</span>
								<b> Cagayan de Oro</b>
								<span className="bg-success bg-opacity-10 text-sm py-1 px-2 rounded-xl ml-2  text-success">
									Completed
								</span>
							</div>
							<div className="lg:ml-auto gap-4 flex items-center">
								<p>
									Expected date to arrive:{" "}
									<b className="text-accent">Dec 23, 2022</b>
								</p>
							</div>
						</div>
						<Table
							rowClick={(data) => {}}
							columns={columns}
							pagination={false}
							loading={dataLoading}
							data={list}
							emptyMessage={`You don’t have an order`}
						/>
					</CardLayout>
				</div>
			</div>
			<AffirmationModal
				ref={complete_order_ref}
				title="Complete this order"
				body="Are you sure you want to print this Purchase Order lists?"
				footer={
					<>
						<Button
							type="accent"
							onClick={() => {
								toast.success(
									"Order has been received successfully"
								);
								complete_order_ref.current.hide();
							}}
						>
							<FlatIcon icon="rr-print" className="mr-1" /> Yes,
							complete order
						</Button>

						<Button
							type="transparent"
							onClick={() => {
								complete_order_ref.current.hide();
							}}
						>
							Maybe later
						</Button>
					</>
				}
				footerClassName="!items-center !justify-center"
			/>
		</AppLayout>
	);
};

export default ItemDelivery;
