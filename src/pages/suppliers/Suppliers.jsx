import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import ConfirmModal from "@/src/components/modals/ConfirmModal";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import SuppliersFormModal from "./components/SuppliersFormModal";
import { useSuppliersHook } from "./hooks/useSuppliersHook";

const Suppliers = () => {
	const form_modal_ref = useRef(null);
	const delete_modal_ref = useRef(null);

	const [list, setList] = useState([]);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const { data, loading: dataLoading } = useDataTable(
		`/management/suppliers`
	);

	const { deleteSupplier } = useSuppliersHook();

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
				className: "",
				cellClassName: "",
			},
			{
				header: "Address",
				accessorKey: "address",
				className: "",
				cellClassName: "",
			},
			{
				header: "Owner",
				accessorKey: "owner",
				className: "",
				cellClassName: "",
			},
			{
				header: "Actions",
				accessorKey: "id",
				className: "!text-center",
				cell: ({ row, getValue }) => {
					console.log("roww", row);
					return (
						<>
							<div className="flex items-center justify-center text-center gap-4">
								<Button
									type="primary"
									size="sm"
									className="rounded-full"
									onClick={() => {
										openFormModal(row?.original);
									}}
								>
									<FiEdit className="font-bold text-sm" />
								</Button>
								<Button
									type="danger"
									size="sm"
									className="rounded-full"
									onClick={() => {
										setId(row?.original?.id);
										openConfirmDelete();
									}}
								>
									<FiTrash2 className="font-bold text-sm" />
								</Button>
							</div>
						</>
					);
				},
			},
		],
		[]
	);

	useEffect(() => {
		setList(data?.data || []);
	}, [data?.data]);

	const openFormModal = (data) => {
		form_modal_ref.current.show(data.type == "click" ? null : data);
	};

	const openConfirmDelete = () => {
		setLoading(false);
		delete_modal_ref.current.show();
	};

	const closeConfirmDelete = () => {
		setLoading(false);
		delete_modal_ref.current.hide();
	};

	const addToList = (item) => {
		setList((list) => [item, ...list]);
	};

	const updateInList = (item) => {
		setList((list) => list.map((x) => (x.id == item.id ? item : x)));
	};

	const deleteData = () => {
		setLoading(true);
		deleteSupplier(id)
			.then((res) => {
				toast.success("Supplier deleted successfully!");
				removeFromList({ id: id });
			})
			.catch(() => {
				toast.error(
					"An error occured while trying to delete supplier! Please try again later."
				);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const removeFromList = (item) => {
		setList((list) => list.filter((x) => x.id != item.id));
	};

	return (
		<AppLayout
			title="Suppliers"
			titleChildren={
				<Button
					type="accent"
					className="ml-auto"
					onClick={openFormModal}
				>
					<FlatIcon icon="rs-plus" className="mr-2" /> Register
					supplier
				</Button>
			}
		>
			<div className="w-full">
				<Table columns={columns} loading={dataLoading} data={list} />
			</div>
			<SuppliersFormModal
				ref={form_modal_ref}
				addToList={addToList}
				updateInList={updateInList}
			/>
			<ConfirmModal
				ref={delete_modal_ref}
				title="Cofirm delete item category?"
				body={
					<p className="text-red-600 font-semibold text-lg text-center">
						Are you sure you want to delete item category?{" "}
					</p>
				}
				footer={
					<div className="flex items-center">
						<Button onClick={closeConfirmDelete}>No</Button>
						<Button
							type="danger"
							className="ml-4"
							onClick={deleteData}
							loading={loading}
						>
							Yes, delete item category!
						</Button>
					</div>
				}
			/>
		</AppLayout>
	);
};

export default Suppliers;
