import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import CardLayout from "@/src/components/layout/CardLayout";
import ContainerCard from "@/src/components/layout/ContainerCard";
import ConfirmModal from "@/src/components/modals/ConfirmModal";
import Table from "@/src/components/table/Table";
import { useHttp } from "@/src/helpers/useHttp";
import React, { useEffect, useRef, useState } from "react";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import AddItemCategories from "./components/AddItemCategories";
import { useItemCategories } from "./hooks/useItemCategoriesHook";

const ItemCategories = () => {
	const form_modal_ref = useRef(null);
	const delete_modal_ref = useRef(null);

	const [list, setList] = useState([]);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const { data, loadingData } = useHttp("/management/categories", []);

	const { deleteItemCategory } = useItemCategories();

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
		deleteItemCategory(id)
			.then((res) => {
				toast.success("Item category deleted successfully!");
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
		<AppLayout title="Manage item categories">
			<ContainerCard
				title="Item Categories"
				subtitle="Add/Edit/Delete data on your system. "
				actions={
					<Button className="ml-auto" onClick={openFormModal}>
						<FiPlus className="text-2xl mr-1" />
						Add Item Category
					</Button>
				}
			>
				<Table
					loading={loadingData}
					columns={[
						{
							text: "Item Category",
							id: "name",
							className: "",
							cellClassName: "",
						},
						{
							text: "",
							id: "action",
							className: "",
							cellClassName: "",
						},
					]}
					data={list.map((item) => {
						return {
							...item,
							action: (
								<div className="flex items-center justify-center">
									<Button
										type="primary"
										size="sm"
										onClick={() => {
											openFormModal(item);
										}}
									>
										<FiEdit className="font-bold text-xl" />
									</Button>
									<Button
										type="danger"
										size="sm"
										className="ml-2"
										onClick={() => {
											setId(item?.id);
											openConfirmDelete();
										}}
									>
										<FiTrash2 className="font-bold text-xl" />
									</Button>
								</div>
							),
						};
					})}
				/>
			</ContainerCard>
			<AddItemCategories
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

export default ItemCategories;
