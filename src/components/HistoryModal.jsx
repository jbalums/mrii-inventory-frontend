import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import FlatIcon from "./FlatIcon";
import ModalBody from "./modals/components/ModalBody";
import ModalFooter from "./modals/components/ModalFooter";
import Modal from "./modals/Modal";
import useDataTable from "../helpers/useDataTable";
import Table from "./table/Table";
import useNoBugUseEffect from "@/hooks/useNoBugUseEffect";
import Button from "./Button";

const HistoryModal = (props, ref) => {
	const { title, entity, footer, footerClassName = "" } = props;
	const [open, setOpen] = useState(false);
	const [btnLoading, setBtnLoading] = useState(false);
	const [list, setList] = useState([]);

	const {
		data,
		meta,
		loading: dataLoading,
		keyword,
		setPage,
		setPaginate,
		setKeyword,
		refreshData,
	} = useDataTable(`/management/get-model-history`, null, {
		entity: entity,
	});
	const columns = useMemo(
		() => [
			{
				header: "User",
				accessorKey: "user",
				cell: ({ row }) => {
					return (
						<span className="font-bold">
							{row?.original?.user?.username}
						</span>
					);
				},
			},
			{
				header: "Action",
				accessorKey: "message",
			},
			{
				header: "Changes",
				accessorKey: "changes",
				cell: ({ row: { original } }) => {
					return (
						<div className="flex flex-col gap-y-1">
							{original?.meta?.map((metaData) => {
								return (
									<div className="flex gap-2">
										•
										<span className="ml-    ">
											Updated <b>{metaData?.key} </b> from{" "}
											<b>{metaData?.old}</b> to{" "}
											<b>{metaData?.new}</b>
										</span>
									</div>
								);
							})}
							{original?.message?.includes("Created")
								? "Created new record"
								: ""}
							{original?.message?.includes("Deleting")
								? "Deleted a record"
								: ""}
						</div>
					);
				},
			},
		],
		[],
	);
	useNoBugUseEffect({
		functions: () => {
			setList(data?.data || []);
		},
		params: [data?.data],
	});
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));
	const show = () => {
		setOpen(true);
		refreshData();
	};
	const hide = () => {
		setOpen(false);
	};
	return (
		<Modal open={open} hide={hide} size="lg">
			<ModalBody className={`px-4 pt-4 rounded-t-xl`}>
				<div className="flex flex-col">
					<h4 className="text-xl !font-bold mb-4 text-indigo-800 text-left">
						{title}
					</h4>
					<Button
						type="danger"
						className="absolute top-3 right-3"
						size="sm"
						onClick={hide}
					>
						<FlatIcon icon="rr-cross-small" />
					</Button>

					<div className="w-full">
						<Table
							meta={meta}
							columns={columns}
							loading={dataLoading}
							data={list}
							keyword={keyword}
							pagination={true}
							onTableChange={(data) => {
								setPage(data.pageIndex + 1);
								setPaginate(data.pageSize);
							}}
						/>
					</div>
				</div>
			</ModalBody>
			<ModalFooter>
				<div className="flex justify-end">
					<Button className="ml-auto" type="danger" onClick={hide}>
						CLOSE
					</Button>
				</div>
			</ModalFooter>
		</Modal>
	);
};

export default forwardRef(HistoryModal);
