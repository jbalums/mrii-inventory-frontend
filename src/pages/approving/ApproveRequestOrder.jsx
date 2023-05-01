import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import Table from "@/src/components/table/Table";
import { useBranchLocation } from "@/src/features/locations/hooks/useBranchLocationHook";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const purpose = {
	production: (
		<span className="min-w-[128px] p-1 px-3 rounded-2xl text-xs bg-blue-500 text-blue-700 bg-opacity-5">
			production
		</span>
	),
	project_plant: (
		<span className="min-w-[128px] p-1 px-3 rounded-2xl text-xs bg-indigo-700 text-indigo-700 bg-opacity-5">
			project/plant
		</span>
	),
	sale: (
		<span className="min-w-[128px] p-1 px-3 rounded-2xl text-xs bg-green-600 text-green-700 bg-opacity-5">
			sales
		</span>
	),
	stocking: (
		<span className="min-w-[128px] p-1 px-3 rounded-2xl text-xs bg-primary text-primary bg-opacity-5">
			stocking
		</span>
	),
	internal_use: (
		<span className="min-w-[128px] p-1 px-3 rounded-2xl text-xs bg-secondary text-secondary bg-opacity-5">
			Test
		</span>
	),
	for_purchase: (
		<span className="min-w-[128px] p-1 px-3 rounded-2xl text-xs bg-orange-500 text-orange-700 bg-opacity-5">
			for purchase
		</span>
	),
};

const ApproveRequestOrder = () => {
	const view_detail_ref = useRef(null);
	const navigate = useNavigate();
	const [list, setList] = useState([[]]);
	const {
		data,
		loading: dataLoading,
		setKeyword,
	} = useDataTable(`/inventory/requisition`, null, {
		type: "pending",
	});

	useEffect(() => {
		setList(data?.data || []);
	}, [data?.data]);

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
				header: "Purpose",
				accessorKey: "purpose",
				className: "cursor-pointer",
				cellClassName: "",
				cell: ({ row: { original } }) => {
					return original?.purpose;
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
				header: "Status",
				accessorKey: "status",
				cell: ({ row, getValue }) => {
					if (row.original.status == "pending")
						return (
							<span className="text-warning bg-warning bg-opacity-10 px-2 py-2 rounded-3xl">
								To check
							</span>
						);

					return "";
				},
			},
		],
		[]
	);
	return (
		<AppLayout title="Approve request order" backBtn={true}>
			<div className="flex flex-col lg:flex-row gap-6 pb-6">
				<TextInputField
					className="w-full lg:w-[320px]"
					icon={<FlatIcon icon="rr-search" className="text-sm" />}
					placeholder="Search request"
					onChange={(e) => {
						setKeyword(e.target.value);
					}}
				/>
				{/*<ReactSelectInputField
					className="w-full lg:w-[256px]"
					placeholder="All status"
					 options={supliers?.map((supplier) => ({
                        label: supplier?.name + ` - [${supplier?.address}]`,
                        value: supplier?.id,
                    }))}
				/>*/}
			</div>

			<div className="w-full">
				<Table
					rowClick={(data) => {
						console.log("datadatadata", data.original.id);
						navigate(
							`/approving/approve-request-order/view-request/${data.original.id}`
						);
					}}
					columns={columns}
					pagination={false}
					loading={dataLoading}
					data={list}
				/>
			</div>
		</AppLayout>
	);
};

export default ApproveRequestOrder;
