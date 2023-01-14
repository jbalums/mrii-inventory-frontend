import AppLayout from "@/src/components/AppLayout";
import FlatIcon from "@/src/components/FlatIcon";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import Table from "@/src/components/table/Table";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ReceivingOrders = () => {
    const view_detail_ref = useRef(null);
    const navigate = useNavigate();
    const [list, setList] = useState([
        {
            order_number: "02065162",
            requestor: "Alturas Bohol",
            location: "Ilocos Norte",
            date_received: "Dec 7, 2022",
            date_needed: "Dec 20, 2022",
            qty_to_order: "123",
            approved_by: "Test approver",
            status: "need_approval",
        },
        {
            order_number: "02065162",
            requestor: "Alturas Bohol",
            location: "Ilocos Norte",
            date_received: "Dec 7, 2022",
            date_needed: "Dec 20, 2022",
            qty_to_order: "123",
            approved_by: "Test approver",
            status: "to_check",
        },
        {
            order_number: "02065162",
            requestor: "Alturas Bohol",
            location: "Ilocos Norte",
            date_received: "Dec 7, 2022",
            date_needed: "Dec 20, 2022",
            qty_to_order: "123",
            approved_by: "Test approver",
            status: "to_check",
        },
    ]);
    const columns = useMemo(
        () => [
            {
                header: "Project Code",
                accessorKey: "order_number",
                className: "w-lg",
            },
            {
                header: "Name",
                accessorKey: "requestor",
            },
            {
                header: "Location",
                accessorKey: "location",
            },
            {
                header: "Receive",
                accessorKey: "date_received",
            },
            {
                header: "Needed",
                accessorKey: "date_needed",
            },
            {
                header: "QTY to order",
                accessorKey: "qty_to_order",
            },
            {
                header: "Approve by",
                accessorKey: "approved_by",
            },
            {
                header: "Status",
                accessorKey: "status",
                cell: ({ row, getValue }) => {
                    return (
                        <span className="text-warning bg-warning bg-opacity-10 px-2 py-2 rounded-3xl">
                            To check
                        </span>
                    );
                },
            },
        ],
        []
    );
    return (
        <AppLayout title="Receiving orders" backBtn={true}>
            <div className="flex flex-col lg:flex-row gap-6 pb-6">
                <TextInputField
                    className="w-full lg:w-[320px]"
                    icon={<FlatIcon icon="rr-search" className="text-sm" />}
                    placeholder="Search request"
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

            <div className="w-full">
                <Table
                    rowClick={(data) => {
                        navigate("/receiving-orders/1");
                    }}
                    columns={columns}
                    pagination={false}
                    loading={false}
                    data={list}
                />
            </div>
        </AppLayout>
    );
};

export default ReceivingOrders;
