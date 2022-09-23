import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import TextInputField from "@/src/components/forms/TextInputField";
import CardLayout from "@/src/components/layout/CardLayout";
import ContainerCard from "@/src/components/layout/ContainerCard";
import ConfirmModal from "@/src/components/modals/ConfirmModal";
import Table from "@/src/components/table/Table";
import { useHttp } from "@/src/helpers/useHttp";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import LocationFormModal from "./components/LocationFormModal";
import AddItemCategories from "./components/LocationFormModal";
import { useItemBranch } from "./hooks/useItemBranchesHook";

const Locations = () => {
	const form_modal_ref = useRef(null);
	const delete_modal_ref = useRef(null);

	const [list, setList] = useState([]);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const { data, loadingData } = useHttp("/management/branches", []);

	const { deleteItemBranch } = useItemBranch();

	const columns = useMemo(
		() => [
			{
				header: "Code",
				id: "code",
				className: "",
				cellClassName: "",
			},
			{
				header: "Name",
				id: "name",
				className: "",
				cellClassName: "",
			},
			{
				header: "Description",
				id: "description",
				className: "",
				cellClassName: "",
			},
			{
				header: "UoM",
				id: "uom",
				className: "",
				cellClassName: "",
			},
			{
				header: "Location",
				id: "firstname",
				className: "",
				cellClassName: "",
			},
			{
				header: "QTY on hand",
				id: "firstname",
				className: "",
				cellClassName: "",
			},
			{
				header: "Unit price",
				id: "firstname",
				className: "",
				cellClassName: "",
			},
			{
				header: "Stocks",
				id: "firstname",
				className: "",
				cellClassName: "",
			},
			{
				header: "Action",
				id: "firstname",
				className: "",
				cellClassName: "",
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
		deleteItemBranch(id)
			.then((res) => {
				toast.success("Item branch deleted successfully!");
				removeFromList({ id: id });
			})
			.catch(() => {
				toast.error(
					"An error occured while trying to delete! Please try again later."
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
			title="Locations"
			titleChildren={
				<Button type="accent" className="ml-auto" onClick={openFormModal}>
					<FlatIcon icon="rs-plus" className="mr-2" /> Register location/branch
				</Button>
			}
		>
			<div className="w-full">
				<Table columns={columns} loading={false} data={list} />
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

export default Locations;
