import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import TextInputField from "@/src/components/forms/TextInputField";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import ConsumbedMaterialsModal from "./components/ConsumbedMaterialsModal";
import ReturnMaterialsModal from "./components/ReturnMaterialsModal";
import { useAuth } from "@/hooks/useAuth";

const ProjectPlantRequests = () => {
	const { user } = useAuth();
	const [list, setList] = useState([]);

	const return_materials_ref = useRef(null);
	const consumed_materials_ref = useRef(null);

	const [loading, setLoading] = useState(false);
	const { data, loading: dataLoading } = useDataTable(
		`/inventory/project-plant-orders`,
		null,
		false,
	);
	const columns = useMemo(
		() => [
			{
				header: "Ref #",
				accessorKey: "account_code",
				className: "cursor-pointer",
				cellClassName: "",
			},
			{
				header: "Project Code",
				accessorKey: "project_code",
				className: "cursor-pointer",
				cellClassName: "",
			},
			{
				header: "Branch",
				accessorKey: "location",
				className: "cursor-pointer",
				cellClassName: "",
				cell: ({ row: { original } }) => {
					return original?.location?.name || "";
				},
			},
			{
				header: "Requestor name",
				accessorKey: "name",
				className: "cursor-pointer",
				cellClassName: "",
				cell: ({ row: { original } }) => {
					return `${original?.requester?.lastname}, ${
						original?.requester?.firstname
					} ${original?.requester?.middlename.slice(0, 1)}`;
				},
			},
			{
				header: "Date requested",
				accessorKey: "created_at",
				className: "cursor-pointer",
				cellClassName: "",
			},
			{
				header: "Date needed",
				accessorKey: "date_needed",
				className: "cursor-pointer",
				cellClassName: "",
			},
			{
				header: "Order status",
				accessorKey: "order_status",
				className: "cursor-pointer",
				cellClassName: "",
				cell: ({ row: { original } }) => {
					return (
						<span
							className={`px-2 py-1  bg-opacity-10  rounded-xl capitalize ${
								original?.status == "approved"
									? "text-success bg-success"
									: "text-warning bg-warning"
							}`}
						>
							{original?.status || "Pending"}
						</span>
					);
				},
			},
			/* {
				header: "Approved by",
				accessorKey: "approved_by",
				className: "",
				cellClassName: "",
				cell: ({ row: { original } }) => {
					if (original?.status == "approved")
						return (
							<span
								className={`px-0 py-1  bg-opacity-10  rounded-xl text-success`}
							>
								{original.accepted_by?.name}
							</span>
						);
				},
			}, */
			{
				header: "Action",
				accessorKey: "action",
				className: "!text-center",
				cell: ({ row: { original } }) => {
					if (original?.location?.id == user?.data?.branch_id)
						return (
							<div className="flex flex-col lg:flex-row items-center justify-center text-center gap-4">
								<Button
									type="success"
									size="sm"
									className="rounded-lg"
									onClick={() => {
										consumed_materials_ref.current.show(
											original,
										);
									}}
								>
									<FlatIcon
										icon="rr-shopping-cart-check"
										className="font-bold text-sm"
									/>
									Use materials
								</Button>
								<Button
									type="primary"
									size="sm"
									className="rounded-lg"
									onClick={() => {
										return_materials_ref.current.show(
											original,
										);
									}}
								>
									<FlatIcon
										icon="rr-undo"
										className="font-bold text-sm"
									/>
									Return materials
								</Button>
							</div>
						);
					return (
						<span className="text-placeholder">
							This request is from another branch
						</span>
					);
				},
			},
		],
		[],
	);

	useEffect(() => {
		setList(data?.data || []);
	}, [data?.data]);

	return (
		<AppLayout
			title={
				<div className="flex items-center gap-2">
					<FlatIcon icon="rr-diagram-project" />
					Project/Plant requests
				</div>
			}
			breadcrumbs={[
				{
					to: "/for-project-or-plant-requests",
					icon: "rr-inbox-in",
					label: "Project/Plant requests",
				},
			]}
		>
			<div className="flex flex-col lg:flex-row gap-6 pb-6">
				<TextInputField
					className="w-full lg:w-[320px]"
					icon={<FlatIcon icon="rr-search" className="text-sm" />}
					placeholder="Search"
				/>
				{/* <Button type="accent" className="ml-auto" onClick={() => {}}>
					<FlatIcon icon="rs-plus" /> Add returned materials
				</Button> */}
			</div>
			<div className="w-full">
				<Table columns={columns} loading={false} data={list} />
			</div>
			<ConsumbedMaterialsModal ref={consumed_materials_ref} />
			<ReturnMaterialsModal ref={return_materials_ref} />
		</AppLayout>
	);
};

export default ProjectPlantRequests;
