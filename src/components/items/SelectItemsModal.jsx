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
import ReactSelectInputField from "../forms/ReactSelectInputField";
import SelectInputField from "../forms/SelectInputField";
import { toast } from "react-toastify";

const SelectItemsModal = (props, ref) => {
	const {
		url = "/management/products",
		defaultFilter = {
			paginate: 10,
		},
	} = props;
	const { selectedItems, setSelectedItems, isSelected, selectItem } =
		useSelection();

	const [open, setOpen] = useState(false);
	const [list, setList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [purpose, setPurpose] = useState("");
	const [callBack, setCallBack] = useState({ fn: null });

	const {
		data,
		loading: dataLoading,
		meta,
		filters,
		setFilters,
		setPage,
		setPaginate,
	} = useDataTable(url, null, {
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
			})) || [],
		);
	}, [data?.data]);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = ({ callback, items, purpose }) => {
		setPurpose(purpose);
		if (callback) {
			setCallBack({
				fn: callback,
			});
		}
		setSelectedItems(items);
		setFilters({
			key: Math.random(200),
			purpose: purpose,
			...defaultFilter,
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
				cell: ({ row, getValue }) => {
					const item = row.original;
					return item?.product?.code
						? item?.product?.code
						: item?.code;
				},
			},
			{
				header: "Name",
				accessorKey: "name",
				className: "min-w-[128px] !whitespace-pre",
				cell: ({ row, getValue }) => {
					const item = row.original;
					return item?.product?.name
						? item?.product?.name
						: item?.name;
				},
			},
			{
				header: "Location",
				accessorKey: "location",
				className: "min-w-[128px] !whitespace-pre !text-center",
				cell: ({ row, getValue }) => {
					const item = row.original;
					return item?.branch?.name
						? item?.branch?.name
						: item?.location?.name;
				},
			},
			{
				header: "Unit of measurement",
				accessorKey: "unit_measurement",
				className: "!text-center",
				cell: ({ row, getValue }) => {
					const item = row.original;
					return item?.product?.unit_measurement
						? item?.product?.unit_measurement
						: item?.unit_measurement;
				},
			},
			{
				header: "Stock",
				accessorKey: "quantity",
				className: "!text-center",
				cell: ({ row, getValue }) => {
					const item = row.original;
					return item?.total_quantity > 0 ? (
						<b className="text-green-700">{item?.total_quantity}</b>
					) : (
						<span className="text-red-500">0</span>
					);
				},
			},
			{
				header: "Select",
				id: "action",
				className: "!text-center",
				cell: ({ row, getValue }) => {
					const item = row.original;
					return (
						<div className="flex items-center justify-center text-center gap-4">
							<div
								className={`w-6 h-6 rounded border-border border-2 flex justify-center items-center cursor-pointer  duration-200 group ${
									isSelected(item)
										? "!bg-blue-600 hover:!opacity-100"
										: " hover:opacity-50"
								}`}
								onClick={() => {
									if (item.total_quantity <= 0) {
										toast.error(
											"Cannot select item no stock available.",
										);
										return;
									}
									selectItem(item);
								}}
							>
								<FlatIcon
									icon="br-check"
									className={`-mb-1  text-white group-hover:opacity-100 duration-200 ${
										isSelected(item)
											? "text-white opacity-100"
											: "opacity-0"
									}`}
								/>
							</div>
						</div>
					);
				},
			},
		],
		[selectedItems, list],
	);

	return (
		<Modal open={open} hide={hide} size="2xl">
			<ModalHeader
				title={"Add items"}
				subtitle={`Select items to add/remove`}
				hide={hide}
			/>
			<ModalBody
				className={`py-4 min-h-[448px] !bg- !px-0 overflow-auto`}
			>
				<div className="flex flex-col">
					<div className="flex flex-col lg:flex-row lg:items-center pb-4 px-4 gap-4">
						<TextInputField
							className="lg:w-[288px] "
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
							placeholder="Search product"
						/>
						{/* <ReactSelectInputField
							inputClassName=" "
							// ref={ref}
							// value={value}
							// onChange={onChange} // send value to hook form
							// onBlur={onBlur} // notify when input is touched
							// error={error?.message}
							placeholder="Select Branch"
							options={[
								{
									label: "Production",
									value: "production",
									description:
										"Use for PRODUCTION in the Warehouse. (STOCK-OUT)",
								},
							]}
						/> */}
					</div>

					<Table
						columns={columns}
						loading={dataLoading}
						data={list}
						meta={meta}
						rowHighlight={true}
						pagination={true}
						paginationClassName={"px-6"}
						onTableChange={(data) => {
							setPage(data.pageIndex + 1);
							setPaginate(data.pageSize);
						}}
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

export default forwardRef(SelectItemsModal);
