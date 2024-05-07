import useNoBugUseEffect from "@/hooks/useNoBugUseEffect";
import AppLayout from "@/src/components/AppLayout";
import FlatIcon from "@/src/components/FlatIcon";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import { useMemo, useState } from "react";

const SystemLogs = () => {
	const [list, setList] = useState([]);

	const {
		data,
		meta,
		loading: dataLoading,
		keyword,
		setPage,
		setPaginate,
		setKeyword,
		refreshData,
	} = useDataTable(`/management/get-model-history`, null);
	const columns = useMemo(
		() => [
			{
				header: "User",
				accessorKey: "user",
				cell: ({ row }) => {
					return (
						<span className="font-bold">
							{row?.original?.user?.username}
						</span>
					);
				},
			},
			{
				header: "Action",
				accessorKey: "message",
			},
			{
				header: "Changes",
				accessorKey: "changes",
				cell: ({ row: { original } }) => {
					return (
						<div className="flex flex-col gap-y-1">
							{original?.meta?.map((metaData) => {
								return (
									<div className="flex gap-2">
										•
										<span className="ml-    ">
											Updated <b>{metaData?.key} </b>
											{metaData?.key != "password" ? (
												<>
													from <b>{metaData?.old}</b>{" "}
													to <b>{metaData?.new}</b>
												</>
											) : (
												""
											)}
										</span>
									</div>
								);
							})}
							{original?.message?.includes("Created")
								? "Created new record"
								: ""}
							{original?.message?.includes("Deleting")
								? "Deleted a record"
								: ""}
						</div>
					);
				},
			},
		],
		[]
	);
	useNoBugUseEffect({
		functions: () => {
			console.log("data?.datadata?.data", data?.data);
			setList(data?.data || []);
		},
		params: [data?.data],
	});

	return (
		<AppLayout
			icon={<FlatIcon icon="rr-user" />}
			title={"My profile"}
			breadcrumbs={[
				{
					to: "/profile",
					label: "My profile",
				},
			]}
		>
			<div className="w-full">
				<Table
					meta={meta}
					columns={columns}
					loading={dataLoading}
					data={list}
					keyword={keyword}
					pagination={true}
					onTableChange={(data) => {
						setPage(data.pageIndex + 1);
						setPaginate(data.pageSize);
					}}
				/>
			</div>
		</AppLayout>
	);
};

export default SystemLogs;
