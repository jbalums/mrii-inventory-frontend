import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import ContainerCard from "@/src/components/layout/ContainerCard";
import PrintableLayout from "@/src/components/layout/PrintableLayout";
import PrintableTable from "@/src/components/table/PrintableTable";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo } from "react";
import { useRef, useState } from "react";

import ReactToPrint from "react-to-print";
const PrintUsers = () => {
	const componentRef = useRef(null);
	const [list, setList] = useState([]);
	const {
		data,
		loading: dataLoading,
		setPage,
	} = useDataTable(`/management/users`, setList, {});
	useEffect(() => {
		setPage("all");
	}, []);
	useEffect(() => {
		setList(data?.data || []);
	}, [data]);

	const columns = useMemo(
		() => [
			{
				header: "Firstname",
				accessorKey: "firstname",
			},
			{
				header: "Lastname",
				accessorKey: "lastname",
			},
			{
				header: "Email/Username",
				accessorKey: "username",
			},
			{
				header: "User type",
				className: "!text-center",
				accessorKey: "user_type",
			},
		],
		[]
	);

	return (
		<AppLayout
			backBtn
			title={"Print users"}
			titleChildren={
				<div className="flex items-center ml-auto gap-4">
					<Button className="gap-2" loading={dataLoading}>
						<FlatIcon icon="rr-disk" /> Save as PDF
					</Button>
					<ReactToPrint
						trigger={() => (
							<Button
								type="accent"
								className="gap-2"
								loading={dataLoading}
							>
								<FlatIcon icon="rr-print" /> Print list
							</Button>
						)}
						content={() => componentRef.current}
					/>
				</div>
			}
		>
			<PrintableLayout ref={componentRef}>
				<ContainerCard
					title="Users list"
					className={`p-0`}
					mainClassName={`bg-white rounded-none`}
					headerClassName="bg-white !p-2"
				>
					<PrintableTable
						columns={columns}
						pagination={false}
						loading={dataLoading}
						data={list}
					/>
				</ContainerCard>
			</PrintableLayout>
		</AppLayout>
	);
};

export default PrintUsers;
