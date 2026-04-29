import { mobileNumber } from "@/libs/helpers";
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
const PrintSuppliers = () => {
	const componentRef = useRef(null);
	const [list, setList] = useState([]);
	const {
		data,
		loading: dataLoading,
		setPage,
	} = useDataTable(`/management/suppliers`, setList, {});
	useEffect(() => {
		setPage("all");
	}, []);
	useEffect(() => {
		setList(data?.data || []);
	}, [data]);

	const columns = useMemo(
		() => [
			{
				header: "Supplier",
				accessorKey: "name",
				className: "",
				cellClassName: "",
				cell: ({ row: { original } }) => {
					const {
						name,
						code,
						street,
						address,
						gl_account,
						tin,
						owner,
					} = original;
					return (
						<div className="flex flex-col">
							<div className="flex flex-col mb-2">
								<p className="text-lg font-bold text-darker">
									{name}
								</p>
								<span className="text-base">{code}</span>
							</div>
							<div className="flex flex-col mb-2">
								<span className="text-xs text-placeholder">
									Address
								</span>
								<span className="text-base text-darker">
									{street}, {address}
								</span>
							</div>
							<div className="flex flex-col mb-2">
								<span className="text-xs text-placeholder">
									TIN
								</span>
								<span className="text-base text-darker">
									{tin}
								</span>
							</div>
							<div className="flex flex-col mb-2">
								<span className="text-xs text-placeholder">
									GL Account ID
								</span>
								<span className="text-base text-darker">
									{gl_account || (
										<>
											<i className="text-placeholder !text-xs">
												-
											</i>
											&nbsp;
										</>
									)}
								</span>
							</div>
							<div className="flex flex-col mb-2">
								<span className="text-xs text-placeholder">
									Owner
								</span>
								<span className="text-base text-darker">
									{owner}
								</span>
							</div>
						</div>
					);
				},
			},

			{
				header: "Contacts",
				accessorKey: "code",
				className: "",
				cellClassName: "",
				cell: ({ row: { original } }) => {
					const { contacts } = original;
					return (
						<div className="flex flex-col gap-y-2">
							{contacts?.map((contact) => {
								return (
									<div
										className="p-3 rounded-lg bg-white relative"
										key={`contact-${contact?.id}`}
									>
										<div className="absolute right-4 top-4">
											<FlatIcon
												icon="rr-circle-phone"
												className="text-[50px] text-placeholder opacity-10 "
											/>
										</div>
										<div className="flex flex-col">
											<div className="flex flex-col mb-2">
												<p className="text-base font-bold text-darker flex items-center gap-2">
													{contact?.name}
												</p>
												<span className="text-xs">
													{contact?.position || "-"}
												</span>
											</div>
											<div className="flex items-center mb-1 gap-2">
												<FlatIcon icon="rr-phone-call" />
												<span className="text-sm font-">
													{mobileNumber(
														contact?.number,
													)}
												</span>
											</div>
											<div className="flex items-center mb-1 gap-2">
												<FlatIcon icon="rr-envelope" />
												<span className="text-sm font-">
													{contact?.email}
												</span>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					);
				},
			},
			{
				header: "Bank Accounts",
				accessorKey: "code",
				className: "",
				cellClassName: "",
				cell: ({ row: { original } }) => {
					const { banks } = original;
					return (
						<div className="flex flex-col gap-y-2">
							{banks?.map((bank) => {
								return (
									<div className="p-3 rounded-lg bg-white shadow flex items-start gap-3">
										<FlatIcon
											icon="rr-bank"
											className="text-[40px] text-placeholder opacity-20 mt-2"
										/>
										<div className="flex flex-col">
											<div className="flex flex-col mb-2">
												<p className="text-base font-bold text-darker">
													{bank?.account_name}
												</p>
												<span className="text-sm">
													{bank?.name}
												</span>
											</div>
											<div className="flex items-center mb-2 gap-2">
												<FlatIcon icon="rr-hastag" />
												<span className="text-base font-semibold">
													{bank?.account_number}
												</span>
											</div>
											<div className="flex items-center mb-1 gap-2">
												<FlatIcon icon="rr-map-marker" />
												<span className="text-sm font-">
													{bank?.location || (
														<i className="text-placeholder text-xs">
															blank
														</i>
													)}
												</span>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					);
				},
			},
		],
		[],
	);

	return (
		<AppLayout
			backBtn
			title={"Print suppliers"}
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
					title="Suppliers list"
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

export default PrintSuppliers;
