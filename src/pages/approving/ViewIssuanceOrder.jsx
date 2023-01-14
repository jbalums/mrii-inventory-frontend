import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import CardLayout from "@/src/components/layout/CardLayout";
import ContainerCard from "@/src/components/layout/ContainerCard";
import AffirmationModal from "@/src/components/modals/AffirmationModal";
import Table from "@/src/components/table/Table";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewIssuanceOrder = () => {
    const approve_issuance_modal = useRef(null);
    const navigate = useNavigate();
    const [list, setList] = useState([
        {
            code: "AG454",
            name: "Percal",
            location: "Cebu",
            uom: "20 KG",
            qty_on_hand: "205",
            qty_to_issue: "114",
            stock: "available",
            requested_qty: "4",
            fulfilled_qty: "2",
            qty: "2",
        },
        {
            code: "AG454",
            name: "Percal",
            location: "Cebu",
            uom: "20 KG",
            qty_on_hand: "205",
            qty_to_issue: "114",
            stock: "available",
            requested_qty: "5",
            fulfilled_qty: "3",
            qty: "2",
        },
        {
            code: "AG454",
            name: "Percal",
            location: "Cebu",
            uom: "20 KG",
            qty_on_hand: "205",
            qty_to_issue: "114",
            stock: "available",
            requested_qty: "50",
            fulfilled_qty: "30",
            qty: "20",
        },
        {
            code: "AG454",
            name: "Percal",
            location: "Cebu",
            uom: "20 KG",
            qty_on_hand: "205",
            qty_to_issue: "114",
            stock: "available",
            requested_qty: "15",
            fulfilled_qty: "13",
            qty: "12",
        },
    ]);
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
                header: "Location",
                accessorKey: "location",
            },
            {
                header: "UoM",
                accessorKey: "uom",
            },
            {
                header: "Requested QTY",
                accessorKey: "requested_qty",
            },
            {
                header: "Fulfilled QTY",
                accessorKey: "fulfilled_qty",
            },
            {
                header: "QTY",
                accessorKey: "qty",
            },
        ],
        []
    );
    return (
        <AppLayout
            title="Issuance details"
            backBtn={true}
            titleChildren={
                <div className="ml-auto flex items-start justify-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs font-light text-dark">
                            Order number
                        </span>
                        <b className="text-sm text-darker">AG454</b>
                    </div>
                    <div className="h-11 border-r border-border"></div>
                    <Button
                        type="accent"
                        onClick={() => {
                            approve_issuance_modal.current.show();
                        }}
                    >
                        <FlatIcon icon="br-check" className="mr-2" /> Approve
                        issuance
                    </Button>
                </div>
            }
        >
            <CardLayout className="!p-4 !bg-background mb-6 !shadow-sm">
                <h4 className="text-base font-bold mb-4">Issuance details</h4>
                <div className="grid grid-cols-12 pb-2">
                    <div className="col-span-2 flex flex-col">
                        <h5 className="text-xs font-bold mb-1">Project Code</h5>
                        <span className="text-sm">000011</span>
                    </div>
                    <div className="col-span-2 flex flex-col">
                        <h5 className="text-xs font-bold mb-1">
                            Requestor name
                        </h5>
                        <span className="text-sm">John doe</span>
                    </div>
                    <div className="col-span-2 flex flex-col">
                        <h5 className="text-xs font-bold mb-1">Division</h5>
                        <span className="text-sm">Divission data here</span>
                    </div>
                    <div className="col-span-2 flex flex-col">
                        <h5 className="text-xs font-bold mb-1">Date needed</h5>
                        <span className="text-sm">January 20, 2023</span>
                    </div>
                    {/* <div className="col-span-2 flex flex-col">
							<h5 className="text-xs font-bold mb-1">
								Approve by
							</h5>
							<span className="text-sm">Ariel Mann</span>
						</div> */}
                </div>
            </CardLayout>
            <div className="flex flex-col lg:flex-row gap-6 pb-6">
                <TextInputField
                    className="w-full lg:w-[320px]"
                    icon={<FlatIcon icon="rr-search" className="text-sm" />}
                    placeholder="Search"
                />
                <ReactSelectInputField
                    className="w-full lg:w-[256px]"
                    placeholder="All status"
                    /* options={supliers?.map((supplier) => ({
                        label: supplier?.name + ` - [${supplier?.address}]`,
                        value: supplier?.id,
                    }))} */
                />
            </div>

            <ContainerCard title="Items ready to serve" className="p-0">
                <Table
                    rowClick={(data) => {
                        navigate("/approve-request-order/view-request/1");
                    }}
                    columns={columns}
                    pagination={false}
                    loading={false}
                    data={list}
                />
            </ContainerCard>
            <AffirmationModal
                ref={approve_issuance_modal}
                title="Approve Issuance"
                body="Are you sure to approve the issuance order?"
                footer={
                    <>
                        <Button
                            type="accent"
                            onClick={() => {
                                // approvedRequisition(id).then(() => {
                                setAccepted(true);
                                toast.success(
                                    "Request has been accepted successfully"
                                );
                                accept_modal_ref.current.hide();
                                // });
                            }}
                        >
                            <FlatIcon icon="rr-print" className="mr-1" /> Yes,
                            Yes, confirm
                        </Button>

                        <Button
                            type="transparent"
                            onClick={() => {
                                accept_modal_ref.current.hide();
                            }}
                        >
                            Maybe later
                        </Button>
                    </>
                }
                footerClassName="!items-center !justify-center"
            />
        </AppLayout>
    );
};

export default ViewIssuanceOrder;
