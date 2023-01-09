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
const PrintLocations = () => {
	const componentRef = useRef(null);
	const [list, setList] = useState([]);
	const {
		data,
		loading: dataLoading,
		setPage,
	} = useDataTable(`/management/branches`, setList, {});
	useEffect(() => {
		setPage("all");
	}, []);
	useEffect(() => {
		setList(data?.data || []);
	}, [data]);

	const columns = useMemo(
		() => [
			{
				header: "Location/Branch Name",
				accessorKey: "name",
				className: "",
				cellClassName: "",
			},
			{
				header: "Address",
				accessorKey: "address",
				className: "",
				cellClassName: "",
			},
		],
		[]
	);

	return (
		<AppLayout
			backBtn
			title={"Print locations"}
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
					title="Locations list"
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

export default PrintLocations;
