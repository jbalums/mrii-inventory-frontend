import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import CardLayout from "@/src/components/layout/CardLayout";
import ContainerCard from "@/src/components/layout/ContainerCard";
import PrintableLayout from "@/src/components/layout/PrintableLayout";
import PrintableTable from "@/src/components/table/PrintableTable";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo } from "react";
import { useRef, useState } from "react";

import ReactToPrint from "react-to-print";
const PrintProducts = () => {
	const componentRef = useRef(null);
	const [list, setList] = useState([]);
	const {
		data,
		loading: dataLoading,
		setPage,
	} = useDataTable(`/management/products`, setList, {});
	useEffect(() => {
		setPage("all");
	}, []);
	useEffect(() => {
		setList(data?.data || []);
	}, [data]);

	const columns = useMemo(
		() => [
			{
				header: "Code",
				accessorKey: "code",
				className: "w-lg",
			},
			{
				header: "Name",
				accessorKey: "name",
			},
			{
				header: "Brand",
				accessorKey: "brand",
			},
			{
				header: "Description",
				accessorKey: "description",
			},
			{
				header: "UoM",
				accessorKey: "uom",
			},
		],
		[]
	);

	return (
		<AppLayout
			backBtn
			title={"Print products"}
			titleChildren={
				<div className="flex items-center ml-auto gap-4">
					<Button className="gap-2">
						<FlatIcon icon="rr-disk" /> Save as PDF
					</Button>
					<ReactToPrint
						trigger={() => (
							<Button type="accent" className="gap-2">
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
					title="Product list"
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

export default PrintProducts;
