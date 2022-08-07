import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import CardLayout from "@/src/components/layout/CardLayout";
import ContainerCard from "@/src/components/layout/ContainerCard";
import ConfirmModal from "@/src/components/modals/ConfirmModal";
import Table from "@/src/components/table/Table";
import { useHttp } from "@/src/helpers/useHttp";
import React, { useEffect, useRef, useState } from "react";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import AddUserModal from "./components/AddUserModal";
import { useUserHook } from "./hooks/useUserHook";

const Users = () => {
	const form_modal_ref = useRef(null);
	const delete_user_modal_ref = useRef(null);

	const [list, setList] = useState([]);
	const { data, meta } = useHttp("/management/users", []);

	useEffect(() => {
		setList(data?.data || []);
	}, [data?.data]);

	const openFormModal = (data) => {
		form_modal_ref.current.show(data.type == "click" ? null : data);
	};
	const confirmDelete = (data) => {
		delete_user_modal_ref.current.show();
	};

	const addToList = (item) => {
		setList((list) => [item, ...list]);
	};
	const updateInList = (item) => {
		setList((list) => list.map((x) => (x.id == item.id ? item : x)));
	};
	const removeFromList = (item) => {
		setList((list) => list.filter((x) => x.id != item.id));
	};

	return (
		<AppLayout title="Manage users">
			<ContainerCard
				title="Users"
				subtitle="Add/Edit/Delete users on your system. "
				actions={
					<Button className="ml-auto" onClick={openFormModal}>
						<FiPlus className="text-2xl mr-1" />
						Add user
					</Button>
				}
			>
				<Table
					columns={[
						{
							text: "Firstname",
							id: "firstname",
							className: "",
							cellClassName: "",
						},
						{
							text: "Lastname",
							id: "lastname",
							className: "",
							cellClassName: "",
						},
						{
							text: "Email/Username",
							id: "username",
							className: "",
							cellClassName: "",
						},
						{
							text: "User type",
							id: "user_type",
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
										onClick={confirmDelete}
									>
										<FiTrash2 className="font-bold text-xl" />
									</Button>
								</div>
							),
						};
					})}
				/>
			</ContainerCard>
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
						<Button>No</Button>
						<Button type="danger" className="ml-4">
							Yes, delete user!
						</Button>
					</div>
				}
			/>
		</AppLayout>
	);
};

export default Users;
