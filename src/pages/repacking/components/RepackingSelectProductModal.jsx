import {
	useState,
	Fragment,
	forwardRef,
	useImperativeHandle,
	useEffect,
	useMemo,
} from "react";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import ModalBody from "@/src/components/modals/components/ModalBody";
import Modal from "@/src/components/modals/Modal";
import TextInputField from "@/src/components/forms/TextInputField";
import { useForm } from "react-hook-form";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import { useAuth } from "@/hooks/useAuth";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import { v4 as uuidv4 } from "uuid";

let first_id = uuidv4();

const RepackingSelectProductModal = (props, ref) => {
	const { setProduct } = props;
	const { user } = useAuth();

	const {
		register,
		handleSubmit,
		setError,
		watch,
		clearErrors,
		reset,
		formState: { errors },
	} = useForm();

	const [open, setOpen] = useState(false);
	const [id, setId] = useState(null);
	const [dataKey, setDataKey] = useState(uuidv4());
	const [loading, setLoading] = useState(false);
	const [keyword, setKeyword] = useState("");
	const [products, setProducts] = useState([]);

	const [list, setList] = useState([]);

	const {
		data,
		setData,
		loading: dataLoading,
		addToList,
		filters,
		setFilters,
		updateInList,
		removeFromList,
		meta,
	} = useDataTable(`/inventory`, setList, {
		key: first_id,
	});

	useEffect(() => {
		setDataKey(uuidv4());
	}, [data]);

	useEffect(() => {
		let t = setTimeout(() => {
			setFilters((prevFils) => ({
				...prevFils,
				location_id: user?.data?.branch?.id,
				branch_id: user?.data?.branch?.id,
				keyword: keyword,
				key: uuidv4(),
			}));
			setLoading(true);
			getProductList();
		}, 500);
		return () => {
			clearTimeout(t);
		};
	}, [keyword, user?.data?.id]);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		setDataKey();
		setData([]);
		setLoading(true);
		setTimeout(() => {
			getProductList();
		}, 200);

		setTimeout(() => {
			setOpen(true);
		}, 300);
	};

	const hide = () => {
		setOpen(false);
		setTimeout(() => {
			reset();
			setId(null);
		}, 300);
	};

	const successCallBack = (data) => {
		hide();
	};

	const submitForm = (data) => {};

	const getProductList = () => {
		setFilters((prevFils) => ({
			...prevFils,
			location_id: user?.data?.branch?.id,
			branch_id: user?.data?.branch?.id,
			keyword: keyword,
			key: uuidv4(),
		}));
	};

	const handleSelectProduct = (item) => {
		setProduct(item);
		setTimeout(() => {
			hide();
		}, 200);
	};

	const columns = useMemo(
		() => [
			// {
			// 	header: "ID",
			// 	accessorKey: "product_id",
			// 	className: "min-w-[64px]",
			// },
			{
				header: "Code",
				accessorKey: "code",
				className: "min-w-[64px]",
				cell: ({ row }) => {
					return row?.original?.product?.code;
				},
			},
			{
				header: "Name",
				accessorKey: "name",
				className: "min-w-[128px]",
				cell: ({ row }) => {
					return row?.original?.product?.name;
				},
			},
			{
				header: "UoM",
				accessorKey: "uom",
				className: "min-w-[64px]",
				cell: ({ row }) => {
					return row?.original?.product?.unit_measurement;
				},
			},
			{
				header: "Branch",
				accessorKey: "branch",
				className: "min-w-[128px]",
				cell: ({ row }) => {
					return row?.original?.branch?.name;
				},
			},
			/* 	{
				header: "Business Unit",
				accessorKey: "unit_code",
			}, */
			{
				header: "QTY on hand",
				accessorKey: "total_quantity",
				className: "!text-center min-w-[128px]",
				thClassName: "items-center",
				cell: ({ row }) => {
					let qty = row?.original?.total_quantity;
					return qty;
				},
			},
			{
				header: "Action",
				accessorKey: "action",
				className: "!text-center",
				cell: ({ row, getValue }) => {
					// console.log("useruseruser", row?.original);
					let is_manageable = row?.original?.is_manageable;

					if (is_manageable || user?.data?.branch_id == 1)
						return (
							<>
								<Button
									className="mx-auto max-w-[100px]"
									size="sm"
									type="success"
									key={`actn-${row?.original?.id}`}
									onClick={() => {
										handleSelectProduct(row?.original);
									}}
								>
									<FlatIcon icon="rr-check" />
									Select
								</Button>
							</>
						);

					return "";
				},
			},
		],
		[dataKey]
	);

	return (
		<Modal open={open} hide={hide} size="xl">
			<ModalHeader title={`Repack Product`} hide={hide} />
			<ModalBody className={`py-4 bg-white`}>
				<div className="grid grid-cols-12 gap-4">
					<div className="col-span-12 gap-3 flex flex-col">
						<div className="flex items-center">
							<h3 className="text-lg font-bold text-slate-800">
								Select Product
							</h3>
							<TextInputField
								className="ml-auto lg:w-1/4"
								placeholder="Seach products"
								icon={<FlatIcon icon="rr-search" />}
								onChange={(e) => {
									setKeyword(e.target.value);
								}}
							/>
						</div>
						<div className=" overflow-auto w-full ">
							<div className="table w-[calc(100%-1px)]">
								<div className="w-full">
									<Table
										className="border"
										rowClick={(data) => {
											//	viewProductModal(data);
										}}
										meta={meta}
										columns={columns}
										pagination={true}
										loading={dataLoading}
										data={data?.data || []}
										onTableChange={(data) => {
											console.log("onTableChange", data);
											setFilters((prevFilters) => ({
												...prevFilters,
												paginate: data?.pageSize,
												page: data?.pageIndex + 1 || 1,
											}));
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ModalBody>
		</Modal>
	);
};

export default forwardRef(RepackingSelectProductModal);
