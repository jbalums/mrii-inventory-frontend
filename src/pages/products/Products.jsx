import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import Table from "@/src/components/table/Table";
import { useBranchLocation } from "@/src/features/locations/hooks/useBranchLocationHook";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
		console.log("opeeen");
		addProductRef.current.show(data);
	};
	const viewProductModal = (item) => {
		viewProductRef.current.show();
	};

	const columns = useMemo(
		() => [
			{
				header: "Ref #",
				accessorKey: "account_code",
				className: "min-w-[128px]",
			},
			{
				header: "Code",
				accessorKey: "code",
				className: "min-w-[128px]",
			},
			{
				header: "Name",
				accessorKey: "name",
				className: "min-w-[144px]",
			},
			{
				header: "Brand",
				accessorKey: "brand",
				className: "min-w-[64px]",
			},
			{
				header: "Description",
				accessorKey: "description",
				className: "min-w-[256px]",
			},
			{
				header: "UoM",
				accessorKey: "uom",
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
									type="secondary-dark"
									size="sm"
									className="rounded-full"
									onClick={() => {
										openFormModal(row?.original);
									}}
								>
									<FlatIcon
										icon="rr-edit"
										className="text-sm "
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
			title={
				<div className="flex items-center gap-2">
					<FlatIcon icon="rr-boxes" />
					Products
				</div>
			}
			breadcrumbs={[
				{
					to: "/products",
					label: "Products",
				},
			]}
		>
			<div className="flex flex-col lg:flex-row gap-6 pb-6">
				<TextInputField
					className="w-full lg:w-[320px]"
					icon={<FlatIcon icon="rr-search" className="text-sm" />}
					placeholder="Search product"
				/>
				<div className="ml-auto flex items-center gap-4">
					<Link to={"/products/print"}>
						<Button className="gap-2" type="foreground">
							<FlatIcon icon="rr-print" className="text-base" />{" "}
							Print Products
						</Button>
					</Link>
					<Button
						type="accent"
						className="ml-auto"
						onClick={() => {
							openFormModal();
						}}
					>
						<FlatIcon icon="rs-plus" /> Register product
					</Button>
				</div>
			</div>

			<div className="w-full">
				<Table
					rowClick={(data) => {
						//	viewProductModal(data);
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
