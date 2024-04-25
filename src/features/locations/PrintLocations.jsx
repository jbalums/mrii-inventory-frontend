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
import Pdf from "react-to-pdf";
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
					<Pdf
						options={{
							unit: "in",
							format: [8.5, 11],
						}}
						targetRef={componentRef.current}
						filename={`request-order-${data?.account_code}.pdf`}
						onComplete={() => {
							toast.success("PDF export success!");
						}}
					>
						{({ toPdf }) => (
							<Button
								className="gap-2 !rounded font-normal shadow-lg"
								type="secondary"
								onClick={toPdf}
							>
								<FlatIcon
									icon="rr-download"
									className="text-xs"
								/>
								Save as PDF
							</Button>
						)}
					</Pdf>
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
