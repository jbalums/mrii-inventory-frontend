import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import TextInputField from "@/src/components/forms/TextInputField";
import CardLayout from "@/src/components/layout/CardLayout";
import ContainerCard from "@/src/components/layout/ContainerCard";
import ConfirmModal from "@/src/components/modals/ConfirmModal";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import { useHttp } from "@/src/helpers/useHttp";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AddItemCategories from "./components/AddItemCategories";
import { useItemCategories } from "./hooks/useItemCategoriesHook";

const ItemCategories = () => {
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
	} = useDataTable(`/management/categories`);

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
				delete_modal_ref.current.hide();
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

	const columns = useMemo(
		() => [
			{
				header: "GL Account ID",
				accessorKey: "gl_account",
			},
			{
				header: "Name",
				accessorKey: "name",
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
		[]
	);
	return (
		<AppLayout
			icon={<FlatIcon icon="rs-apps" />}
			title="Item categories"
			breadcrumbs={[
				{
					to: "/item-categories",
					label: "Categories",
				},
			]}
		>
			<div className="w-full xl:w-2/3 flex flex-col lg:flex-row gap-6 pb-6">
				<TextInputField
					className="w-full lg:w-[320px]"
					icon={<FlatIcon icon="rr-search" className="text-sm" />}
					placeholder="Search "
					onChange={(e) => {
						setKeyword(e.target.value);
					}}
				/>
				<div className="ml-auto flex items-center flex-row gap-4">
					<Link to={"/item-categories/print"}>
						<Button className="gap-2" type="foreground">
							<FlatIcon icon="rr-print" /> Print
						</Button>
					</Link>
					<Button
						className="gap-2"
						type="accent"
						onClick={openFormModal}
					>
						<FlatIcon icon="rs-plus" /> Add
					</Button>
				</div>
			</div>
			<div className="w-full xl:w-2/3">
				<Table
					columns={columns}
					loading={dataLoading}
					data={list}
					keyword={keyword}
				/>
			</div>
			<AddItemCategories
				ref={form_modal_ref}
				addToList={addToList}
				updateInList={updateInList}
			/>
			<ConfirmModal
				ref={delete_modal_ref}
				title="Cofirm delete item category?"
				body={
					<p className="text- text-lg text-center">
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
