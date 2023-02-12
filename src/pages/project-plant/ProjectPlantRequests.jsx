import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import TextInputField from "@/src/components/forms/TextInputField";
import Table from "@/src/components/table/Table";
import { useEffect, useMemo, useRef, useState } from "react";

const ProjectPlantRequests = () => {
	const [list, setList] = useState([]);

	const columns = useMemo(
		() => [
			{
				header: "Project Code",
				accessorKey: "code",
				className: "",
				cellClassName: "",
			},

			{
				header: "Date entry",
				accessorKey: "date_entry",
				className: "",
				cellClassName: "",
			},
			{
				header: "Date returned",
				accessorKey: "date_returned",
				className: "",
				cellClassName: "",
			},
			{
				header: "No. of returned items",
				accessorKey: "num_returned",
				className: "",
				cellClassName: "",
			},
		],
		[]
	);

	/* useEffect(() => {
		setList(data?.data || []);
	}, [data?.data]); */

	return (
		<AppLayout
			title={
				<div className="flex items-center gap-2">
					<FlatIcon icon="rr-truck-moving" />
					ProjectPlantRequests
				</div>
			}
		>
			<div className="flex flex-col lg:flex-row gap-6 pb-6">
				<TextInputField
					className="w-full lg:w-[320px]"
					icon={<FlatIcon icon="rr-search" className="text-sm" />}
					placeholder="Search"
				/>
				<Button type="accent" className="ml-auto" onClick={() => {}}>
					<FlatIcon icon="rs-plus" /> Add returned materials
				</Button>
			</div>
			<div className="w-full">
				<Table columns={columns} loading={false} data={list} />
			</div>
		</AppLayout>
	);
};

export default ProjectPlantRequests;
