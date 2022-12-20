import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import AffirmationModal from "@/src/components/modals/AffirmationModal";
import useDataTable from "@/src/helpers/useDataTable";
import {useEffect, useMemo, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import RemarksFormModal from "./components/RemarksFormModal";
import ViewRemarksModal from "./components/ViewRemarksModal";
import {useRequisitions} from "@/src/pages/approving/hooks/useRequisitions.js";
import Table from "@/src/components/table/Table.jsx";
import CardLayout from "@/src/components/layout/CardLayout.jsx";

const ViewRequestOrderPage = () => {
	const complete_order_ref = useRef(null);
	const remarks_form_ref = useRef(null);
	const view_remarks_form_ref = useRef(null);
	const return_ref = useRef(null);
	const {approvedRequisition} = useRequisitions()
	const navigate = useNavigate();



	const {id} = useParams()



	const [list, setList] = useState([
		{
			code: "AG454",
			name: "Product test 1",
			location: "Tagbilaran City, Bohol",
			uom: "10kg",
			qty: "10",
			status: "for_return",
		},
		{
			code: "AHW11",
			name: "Product test 2",
			location: "Baclayon, Bohol",
			uom: "1,000 ML",
			qty: "100",
			status: "",
		},
		{
			code: "AG425",
			name: "Product test 3",
			location: "Tagbilaran City, Bohol",
			uom: "10kg",
			qty: "10",
			status: "",
		},
	]);
	const { data, loading: dataLoading } = useDataTable(
		`/inventory/requisition/${id}`,
		null
	);

	const columns = useMemo(
		() => [
			{
				header: "Code",
				accessorKey: "product.code",
				className: "",
				cellClassName: "",
			},
			{
				header: "Name",
				accessorKey: "product.name",
				className: " !font-bold",
				cellClassName: "",
			},
			{
				header: "UoM",
				accessorKey: "product.uom",
				className: "",
				cellClassName: "",
			},
			{
				header: "Request qty",
				accessorKey: "request_quantity",
				className: "",
				cellClassName: "",
			},
		],
		[]
	);

	useEffect(() => {
		console.log('data',data?.data?.details)
	}, [data?.data]);

	return (
		<AppLayout
			title="View request"
			backBtn
			titleChildren={
				<div className="ml-auto flex items-start justify-center gap-4">
					<div className="flex flex-col">
						<span className="text-xs font-light text-dark">
							Project code
						</span>
						<b className="text-sm text-darker">{data?.data?.project_code}</b>
					</div>
					<div className="h-11 border-r border-border"></div>
					{
						data?.data?.status == 'pending' && (
							<Button

								type="accent"
								onClick={() => {
									complete_order_ref.current.show();
								}}
							>
								<FlatIcon icon="br-check" className="mr-2" /> Accept
								Request
							</Button>
						)
					}
				</div>
			}
		>
			<div className="w-full">
				<div className="flex flex-col gap-y-6 pt-6">
					<p className="text-sm text-dark">
						All ordered items will deliver by location
					</p>


					{
						data?.data?.details?.map( request => (
							<CardLayout className="!p-0 !bg-background !shadow-sm">
								<div className="border-b px-4 py-6 flex flex-col lg:flex-row gap-4 items-center">
									<div className="text-lg font-light">
										<span>Order location:</span>
										<b> {request.location.name}</b>
									</div>
									<div className="lg:ml-auto gap-4 flex items-center">
										<p>
											Date neeed:{" "}
											<b className="text-accent">{data?.data.date_needed}</b>
										</p>
									</div>
								</div>
								<Table
									rowClick={(data) => {}}
									columns={columns}
									pagination={false}
									loading={dataLoading}
									data={request.items}
									emptyMessage={`You don’t have an order`}
								/>
							</CardLayout>
						) )
					}









				</div>
			</div>
			<AffirmationModal
				ref={complete_order_ref}
				title="Accept request"
				body="Are you sure you want to accept the request?"
				footer={
					<>
						<Button
							type="accent"
							onClick={() => {
								approvedRequisition(id).then(() => {
									toast.success(
										"Order has been received successfully"
									);
									setTimeout(() =>{
										complete_order_ref.current.hide();
										navigate(-1)

									},1000)

								})
							}}
						>
							<FlatIcon icon="rr-print" className="mr-1" /> Yes,
							complete order
						</Button>

						<Button type="transparent" onClick={() => {

							complete_order_ref.current.hide();
						}}>Maybe later</Button>
					</>
				}
				footerClassName="!items-center !justify-center"
			/>
			<AffirmationModal
				ref={return_ref}
				title="Return items to requestor"
				body="Are you sure you want to return this Purchase Order lists?"
				footer={
					<>
						<Button
							type="accent"
							onClick={() => {
								toast.success(
									"Order has been returned successfully"
								);
								return_ref.current.hide();
							}}
						>
							<FlatIcon icon="rr-print" className="mr-1" /> Yes,
							return order
						</Button>

						<Button type="transparent">Maybe later</Button>
					</>
				}
				footerClassName="!items-center !justify-center"
			/>
			{/* view_remarks_form_ref */}
			<RemarksFormModal ref={remarks_form_ref} />
			<ViewRemarksModal
				ref={view_remarks_form_ref}
				remarks_form_ref={remarks_form_ref}
			/>
		</AppLayout>
	);
};

export default ViewRequestOrderPage;
