import AppLayout from "@/src/components/AppLayout";
import FlatIcon from "@/src/components/FlatIcon";
import Table from "@/src/components/table/Table";
import { useEffect, useMemo, useRef, useState } from "react";

const Repacking = () => {
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
				header: "Date inputted",
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
					Repacking
				</div>
			}
		>
			<div className="w-full">
				<Table columns={columns} loading={false} data={list} />
			</div>
		</AppLayout>
	);
};

export default Repacking;
