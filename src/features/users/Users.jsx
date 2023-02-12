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
import AddUserModal from "./components/AddUserModal";
import { useUserHook } from "./hooks/useUserHook";

let user_types = [
	{
		value: "admin",
		label: "Admin",
	},
	{
		value: "warehouse_man",
		label: "Warehouse Man",
	},
	{
		value: "area_manger",
		label: "Area Manager",
	},
	{
		value: "approving_manager",
		label: "Approving Manager",
	},
	{
		value: "bu_manager",
		label: "Business Unit Manager",
	},
	{
		value: "employee",
		label: "Employee",
	},
];
const Users = () => {
	const form_modal_ref = useRef(null);
	const delete_user_modal_ref = useRef(null);

	const [list, setList] = useState([]);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const {
		data,
		loading: dataLoading,
		setLoading: setDataLoading,
		page,
		setPage,
		paginate,
		setPaginate,
		keyword,
		setKeyword,
		filters,
		setFilters,
		meta,
		setMeta,
	} = useDataTable(`/management/users`);
	/* 
	USE INSIDE USE_EFFECT user

	for Area Manager 
	/management/users?location_id=<user location_id> <Area manager>
	
	for Business Unit Manager
	/management/users?location_id=<user location_id>&business_unit=<user business_unut> <BU manager>

	*/
	const columns = useMemo(
		() => [
			{
				header: "Username",
				accessorKey: "username",
				sortable: true,
				className: "min-w-[128px]",
			},
			{
				header: "Name",
				accessorKey: "firstname",
				sortable: true,
				cell: ({ row }) => {
					return row?.original?.name || "";
				},
				className: "min-w-[144px]",
			},
			{
				header: "Email",
				accessorKey: "email",
				className: "min-w-[128px]",
			},
			{
				header: "User type",
				className: "!text-center",
				accessorKey: "user_type",
				cell: ({ row }) => {
					return (
						user_types.find(
							(x) => x.value == row?.original?.user_type
						)?.label || ""
					);
				},
				className: "min-w-[128px]",
			},
			{
				header: "Action",
				accessorKey: "action",
				className: "!text-center",
				cell: ({ row, getValue }) => {
					console.log("roww", row);
					if (row?.original?.id != 1)
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

	const { deleteUser } = useUserHook();

	useEffect(() => {
		setList(data?.data || []);
	}, [data?.data]);

	const openFormModal = (data) => {
		form_modal_ref.current.show(data.type == "click" ? null : data);
	};

	const openConfirmDelete = () => {
		setLoading(false);
		delete_user_modal_ref.current.show();
	};

	const closeConfirmDelete = () => {
		setLoading(false);
		delete_user_modal_ref.current.hide();
	};

	const addToList = (item) => {
		setList((list) => [item, ...list]);
	};

	const updateInList = (item) => {
		setList((list) => list.map((x) => (x.id == item.id ? item : x)));
	};

	const deleteData = () => {
		setLoading(true);
		deleteUser(id)
			.then((res) => {
				toast.success("User deleted successfully!");
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
			icon={<FlatIcon icon="rr-users-alt" />}
			title={<div className="flex items-center gap-2">Manage users</div>}
			breadcrumbs={[
				{
					to: "/users",
					label: "Users",
				},
			]}
		>
			<div className="w-full flex flex-col lg:flex-row gap-4 md:gap-6 pb-4 md:pb-6">
				<TextInputField
					className="w-full lg:w-[320px]"
					icon={<FlatIcon icon="rr-search" className="text-sm" />}
					placeholder="Search user"
					onChange={(e) => {
						setKeyword(e.target.value);
					}}
				/>

				<div className="ml-auto flex items-center gap-4">
					<Link to={"/users/print"}>
						<Button className="gap-2" type="foreground">
							<FlatIcon icon="rr-print" className="text-base" />{" "}
							Print users
						</Button>
					</Link>
					<Button type="accent" onClick={openFormModal}>
						<FlatIcon icon="rs-plus" /> Register User
					</Button>
				</div>
			</div>
			<div className="w-full">
				<Table
					meta={meta}
					columns={columns}
					pagination={true}
					loading={dataLoading}
					data={list}
					onTableChange={(data) => {
						console.log("onTableChange", data);
						setPage(data.pageIndex + 1);
						setPaginate(data.pageSize);
					}}
					keyword={keyword}
				/>
			</div>
			<AddUserModal
				ref={form_modal_ref}
				addToList={addToList}
				updateInList={updateInList}
			/>
			<ConfirmModal
				ref={delete_user_modal_ref}
				title="Cofirm delete user?"
				body={
					<p className="text-red-600 font-semibold text-lg text-center">
						Are you sure you want to delete user?{" "}
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
							Yes, delete user!
						</Button>
					</div>
				}
			/>
		</AppLayout>
	);
};

export default Users;
