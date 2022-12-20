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

const ApproveRequestOrder = () => {
	const view_detail_ref = useRef(null);
	const navigate = useNavigate();
	const [list, setList] = useState([
		[]
	]);
	const { data, loading: dataLoading } = useDataTable(
		`/inventory/requisition`,
		null,
		{
			type: 'pending'
		}
	);

	useEffect(() => {
		setList(data?.data || []);
	}, [data?.data]);

	const columns = useMemo(
		() => [
			{
				header: "Code",
				accessorKey: "project_code",
				className: "w-lg",
			},
			{
				header: "Requestor name",
				accessorKey: "requester.name",
			},
			{
				header: "Division",
				accessorKey: "requester.business_unit",

			},
			{
				header: "Date created",
				accessorKey: "created_at",
			},
			{
				header: "Date needed",
				accessorKey: "date_needed",
			},
			{
				header: "Status",
				accessorKey: "status",
				cell: ({ row, getValue }) => {

					if(row.original.status == 'pending')
					return (
						<span className="text-warning bg-warning bg-opacity-10 px-2 py-2 rounded-3xl">
							To check
						</span>
					);

					return ""
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
						console.log('datadatadata',data.original.id)
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
