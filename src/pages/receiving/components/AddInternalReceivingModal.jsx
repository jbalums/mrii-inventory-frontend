import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import TextInputField from "@/src/components/forms/TextInputField";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import Modal from "@/src/components/modals/Modal";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import useSelection from "@/src/helpers/useSection";
import { useEffect } from "react";
import { forwardRef, useImperativeHandle, useMemo, useState } from "react";

const AddInternalReceivingModal = (props, ref) => {
	const { selectedItems, setSelectedItems, isSelected, selectItem } =
		useSelection();

	const [open, setOpen] = useState(false);
	const [list, setList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [callBack, setCallBack] = useState({ fn: null });

	const {
		data,
		loading: dataLoading,
		meta,
		filters,
		setFilters,
		setPage,
		setPaginate,
	} = useDataTable("/management/products", null, {
		location_id: 1,
	});

	useEffect(() => {
		return () => {
			setList([]);
		};
	}, []);
	useEffect(() => {
		setList(
			data?.data.map((item) => ({
				...item,
				selected: isSelected(item),
			})) || []
		);
	}, [data?.data]);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = ({ callback, items }) => {
		setCallBack({
			fn: callback,
		});
		setSelectedItems(items);
		setFilters({
			key: Math.random(200),
		});
		setOpen(true);
	};
	const hide = () => {
		setList([]);
		setOpen(false);
	};

	const columns = useMemo(
		() => [
			{
				header: "Product ID",
				accessorKey: "code",
			},
			{
				header: "Name",
				accessorKey: "name",
			},
			{
				header: "Unit of measurement",
				accessorKey: "unit_measurement",
				className: "!text-center",
			},
			{
				header: "Quantity on hand",
				accessorKey: "quantity",
				className: "!text-center",
			},
			{
				header: "Select",
				id: "action",
				className: "!text-center",
				cell: ({ row, getValue }) => {
					console.log("rowwwww", row);
					const item = row.original;
					return (
						<div className="flex items-center justify-center text-center gap-4">
							<div
								className={`w-6 h-6 rounded border-border border-2 flex justify-center items-center cursor-pointer  duration-200 group ${
									isSelected(item)
										? "!bg-darker hover:!opacity-100"
										: " hover:opacity-50"
								}`}
								onClick={() => {
									selectItem(item);
								}}
							>
								<FlatIcon
									icon="br-check"
									className={`-mb-1 opacity-0 text-light group-hover:opacity-100 duration-200 ${
										isSelected(item)
											? "text-light opacity-100"
											: ""
									}`}
								/>
							</div>
						</div>
					);
				},
			},
		],
		[selectedItems, list]
	);

	return (
		<Modal open={open} hide={hide} size="xl">
			<ModalHeader title={"Select items to add"} hide={hide} />
			<ModalBody
				className={`py-4 min-h-[448px] !bg-foreground !px-0 overflow-auto`}
			>
				<div className="flex flex-col">
					<div className="flex items-center pb-4 px-4">
						<p>
							Please select the item you receive from the supplier
							and adjust them afterward.
						</p>

						<TextInputField
							className="lg:w-[320px] ml-auto"
							icon={
								<FlatIcon
									icon="rr-search"
									className="text-sm"
								/>
							}
							onChange={(e) => {
								setFilters((prevFilters) => ({
									...prevFilters,
									keyword: e.target.value,
									query: e.target.value,
								}));
							}}
							placeholder="Search Purchase order"
						/>
					</div>

					<Table
						columns={columns}
						loading={dataLoading}
						data={list}
						meta={meta}
						rowHighlight={true}
						onTableChange={(data) => {
							console.log("onTableChange", data);
							setPage(data.pageIndex + 1);
							setPaginate(data.pageSize);
						}}
						pagination={true}
						paginationClassName={"px-6"}
					/>
				</div>
			</ModalBody>
			<ModalFooter className={`flex items-center justify-end`}>
				<Button
					type="accent"
					onClick={() => {
						if (callBack.fn) {
							callBack.fn(selectedItems);
						}
						hide();
					}}
					loading={loading}
				>
					<div className="w-11 bg-background text-dark text-xs rounded-md text-center mr-2 py-1">
						<span>{selectedItems?.length || 0}</span>
					</div>
					Save added items
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default forwardRef(AddInternalReceivingModal);
