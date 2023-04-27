import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import PrintAppLayout from "@/src/components/PrintAppLayout";
import ContainerCard from "@/src/components/layout/ContainerCard";
import PrintableLayout from "@/src/components/layout/PrintableLayout";
import PrintableTable from "@/src/components/table/PrintableTable";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo } from "react";
import { useRef, useState } from "react";

import Pdf from "react-to-pdf";
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
		<PrintAppLayout containerClassName={`!p-0`} backBtn>
			<div className="w-full py-5 bg-slate-700">
				<div className="flex items-center justify-end ml-auto gap-4 w-[8.5in] mx-auto">
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
								type="background"
								onClick={toPdf}
								loading={dataLoading}
							>
								<FlatIcon
									icon="rr-download"
									className="text-xs"
								/>{" "}
								Save as PDF
							</Button>
						)}
					</Pdf>
					<ReactToPrint
						trigger={() => (
							<Button
								className="gap-2 !rounded font-normal shadow-lg"
								type="background"
								loading={dataLoading}
							>
								<FlatIcon icon="rr-print" /> Print
							</Button>
						)}
						content={() => componentRef.current}
					/>
				</div>
			</div>
			<PrintableLayout ref={componentRef} className={``} title="Users">
				<div className="printable-table">
					<table className="">
						<thead>
							<tr>
								<th className="!text-[8pt] !text-left !font-semibold w-[128px]">
									Firstname
								</th>
								<th className="!text-[8pt] !text-left !font-semibold capitalize">
									Lastname
								</th>
								<th className="!text-[8pt] !text-left !font-semibold w-[128px]">
									Username
								</th>
								<th className="!text-[8pt] !text-left !font-semibold">
									User type
								</th>
							</tr>
						</thead>

						<tbody>
							{dataLoading ? (
								<tr>
									<td colSpan={999} className="!text-center">
										Loading...
									</td>
								</tr>
							) : (
								data?.data?.map((user) => {
									return (
										<tr>
											<td className="!text-[8pt] !text-left w-[128px]">
												{user?.firstname}
											</td>
											<td className="!text-[8pt] !text-left capitalize">
												{user?.lastname}
											</td>
											<td className="!text-[8pt] !text-left w-[128px]">
												{user?.username}
											</td>
											<td className="!text-[8pt] !text-left">
												{user?.user_type}
											</td>
										</tr>
									);
								})
							)}
						</tbody>
					</table>
				</div>
			</PrintableLayout>
		</PrintAppLayout>
	);
};

export default PrintUsers;
