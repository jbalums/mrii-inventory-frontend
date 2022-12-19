import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import Table from "@/src/components/table/Table";
import { useBranchLocation } from "@/src/features/locations/hooks/useBranchLocationHook";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import ProductFormModal from "./components/ProductFormModal";
import ViewProductModal from "./components/ViewProductModal";

const Products = () => {
	const addProductRef = useRef(null);
	const viewProductRef = useRef(null);
	const [list, setList] = useState([]);
	const [branches, setBranches] = useState([]);
	const {
		data,
		loading: dataLoading,
		addToList,
		filters,
		setFilters,
		updateInList,
		removeFromList,
	} = useDataTable(`/management/products`, setList, {
		branch_id: "",
	});

	const { getBranches } = useBranchLocation();

	useEffect(() => {
		getBranches().then((res) => {
			setBranches(res.data.data);
		});
	}, [1]);
	useEffect(() => {
		setList(data?.data || []);
	}, [data?.data]);

	const openFormModal = (data) => {
		console.log('opeeen')
		addProductRef.current.show(data);
	};
	const viewProductModal = (item) => {
		viewProductRef.current.show();
	};

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
				accessorKey: "unit_measurement",
			},
			{
				header: "Action",
				accessorKey: "action",
				className: "!text-center",
				cell: ({ row, getValue }) => {
					return (
						<>
							<div className="flex items-center justify-center text-center gap-4">
								<Button
									type="background"
									size="sm"
									className="rounded-full"
									onClick={() => {
										openFormModal(row?.original);
									}}
								>
									<FlatIcon
										icon="rr-edit"
										className="text-sm text-dark"
									/>
								</Button>
							</div>
						</>
					);
				},
			},
		],
		[]
	);
	return (
		<AppLayout
			title="Products"

		>
			<div className="flex flex-col lg:flex-row gap-6 pb-6">
				<TextInputField
					className="w-full lg:w-[320px]"
					icon={<FlatIcon icon="rr-search" className="text-sm" />}
					placeholder="Search product"
				/>
				<Button
					type="accent"
					className="ml-auto"
					onClick={() => {
						openFormModal()
					}}
				>
					<FlatIcon icon="rs-plus" className="mr-2" /> Register
					product
				</Button>
			</div>

			<div className="w-full">
				<Table
					rowClick={(data) => {
						viewProductModal(data);
					}}
					columns={columns}
					pagination={true}
					loading={dataLoading}
					data={list}
				/>
			</div>

			<ProductFormModal
				ref={addProductRef}
				addToList={addToList}
				updateInList={updateInList}
			/>

			<ViewProductModal ref={viewProductRef} />
		</AppLayout>
	);
};

export default Products;
