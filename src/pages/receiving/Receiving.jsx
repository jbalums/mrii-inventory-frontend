import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import AddItemsReceivedModal from "./components/AddItemsReceivedModal";
import ReceivingFormModal from "./components/ReceivingFormModal";

const Receiving = () => {
	const addFormRef = useRef(null);
	const viewProductRef = useRef(null);
	const add_items_received = useRef(null);

	const [list, setList] = useState([]);
	const {
		data,
		loading: dataLoading,
		addToList,
		updateInList,
		removeFromList,
	} = useDataTable(`/inventory/receiving`);

	useEffect(() => {
		setList(data?.data || []);
	}, [data?.data]);

	const openFormModal = (data = null) => {
		addFormRef.current.show(data);
	};
	const viewProductModal = (item) => {
		viewProductRef.current.show();
	};

	const columns = useMemo(
		() => [
			{
				header: "Receiving report number",
				accessorKey: "code",
			},
			{
				header: "Supplier Name",
				accessorKey: "name",
			},
			{
				header: "PO number",
				accessorKey: "description",
			},
			{
				header: "Date received",
				accessorKey: "unit_measurement",
			},
			{
				header: "No. of received items",
				accessorKey: "location",
			},
			{
				header: "Manage",
				accessorKey: "action",
				className: "!text-center",
				cell: ({ row, getValue }) => {
					return (
						<>
							<div className="flex items-center justify-center text-center gap-4">
								<Button
									type="background"
									size="sm"
									className="rounded-full"
									onClick={() => {
										openFormModal(row?.original);
									}}
								>
									<FlatIcon
										icon="rr-edit"
										className="text-sm text-information"
									/>
								</Button>
								<Button
									type="background"
									size="sm"
									className="rounded-full"
									onClick={() => {
										openFormModal(row?.original);
									}}
								>
									<FlatIcon icon="rr-edit" className="text-sm text-danger" />
								</Button>
							</div>
						</>
					);
				},
			},
		],
		[]
	);
	return (
		<AppLayout title="Receiving Page" titleChildren={""}>
			<div className="flex flex-col lg:flex-row gap-6 pb-6">
				<TextInputField
					className="lg:w-[320px]"
					icon={<FlatIcon icon="rr-search" className="text-sm" />}
					placeholder="Search Purchase order"
				/>
				<ReactSelectInputField
					className="w-full lg:w-[160px]"
					placeholder="All suppliers"
					options={[
						{
							label: "Supplier 1",
							value: "1",
						},
						{
							label: "Supplier 2",
							value: "2",
						},
						{
							label: "Supplier 3",
							value: "3",
						},
					]}
				/>
				<TextInputField
					type="date"
					className="w-full lg:w-[160px]"
					placeholder="By date"
				/>
				<Button type="accent" className="ml-auto" onClick={openFormModal}>
					<FlatIcon icon="rs-plus" className="mr-2" /> Add received PO
				</Button>
			</div>
			<Table
				rowClick={(data) => {
					viewProductModal(data);
				}}
				columns={columns}
				pagination={true}
				loading={dataLoading}
				data={list}
			/>
			<ReceivingFormModal
				ref={addFormRef}
				addToList={addToList}
				add_items_received={add_items_received}
				updateInList={updateInList}
			/>
			<AddItemsReceivedModal ref={add_items_received} />
		</AppLayout>
	);
};

export default Receiving;
