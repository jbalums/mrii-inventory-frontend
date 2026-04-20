import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import TextInputField from "@/src/components/forms/TextInputField";
import ConfirmModal from "@/src/components/modals/ConfirmModal";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LocationFormModal from "./components/LocationFormModal";
import { useBranchLocation } from "./hooks/useBranchLocationHook";
import HistoryBtn from "@/src/components/HistoryBtn";

const Locations = () => {
	const form_modal_ref = useRef(null);
	const delete_modal_ref = useRef(null);

	const [list, setList] = useState([]);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const {
		data,
		loading: dataLoading,
		keyword,
		setKeyword,
	} = useDataTable(`/management/branches`);

	const { deleteItemBranch } = useBranchLocation();

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
				header: "Actions",
				accessorKey: "id",
				className: "!text-center",
				cell: ({ row, getValue }) => {
					//console.log("roww", row);
					return (
						<>
							<div className="flex items-center justify-center text-center gap-4">
								<Button
									type="secondary-dark"
									size="sm"
									className="rounded-full"
									onClick={() => {
										openFormModal(row?.original);
									}}
								>
									<FiEdit className="font-bold text-base" />
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
									<FiTrash2 className="font-bold text-base" />
								</Button>
							</div>
						</>
					);
				},
			},
		],
		[],
	);

	useEffect(() => {
		//console.log("dataaa", data);
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
		deleteItemBranch(id)
			.then((res) => {
				toast.success("Item branch deleted successfully!");
				removeFromList({ id: id });
			})
			.catch(() => {
				toast.error(
					"An error occured while trying to delete! Please try again later.",
				);
			})
			.finally(() => {
				delete_modal_ref.current.hide();
				setLoading(false);
			});
	};

	const removeFromList = (item) => {
		setList((list) => list.filter((x) => x.id != item.id));
	};

	return (
		<AppLayout
			icon={<FlatIcon icon="rs-map-marker" />}
			title="Manage locations"
			breadcrumbs={[
				{
					to: "/locations",
					label: "Locations",
				},
			]}
			titleChildren={<HistoryBtn entity={"location"} />}
		>
			<div className="w-full md:w-4/5 xl:w-4/5 2xl:w-1/2 flex flex-col lg:flex-row gap-6 pb-6">
				<TextInputField
					className="w-full lg:w-[320px]"
					icon={<FlatIcon icon="rr-search" className="text-sm" />}
					placeholder="Search locations"
					onChange={(e) => {
						setKeyword(e.target.value);
					}}
				/>
				<div className="ml-auto flex items-center gap-4">
					<Link to={"/locations/print"}>
						<Button className="gap-2" type="foreground">
							<FlatIcon icon="rr-print" className="text-base" />{" "}
							Print location
						</Button>
					</Link>
					<Button type="accent" onClick={openFormModal}>
						<FlatIcon icon="rs-plus" />
						Add location
					</Button>
				</div>
			</div>
			<div className="w-full md:w-4/5 xl:w-4/5 2xl:w-1/2 ">
				<Table
					columns={columns}
					loading={dataLoading}
					data={list}
					keyword={keyword}
				/>
			</div>
			<LocationFormModal
				ref={form_modal_ref}
				addToList={addToList}
				updateInList={updateInList}
			/>
			<ConfirmModal
				ref={delete_modal_ref}
				title="Cofirm delete item category?"
				body={
					<p className=" font- text-lg text-center">
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

export default Locations;
