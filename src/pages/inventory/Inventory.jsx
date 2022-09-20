import AppLayout from "@/src/components/AppLayout";
import Table from "@/src/components/table/Table";
import React from "react";
const Inventory = () => {
	return (
		<AppLayout title="Inventory">
			<div className="grid grid-cols-12 gap-6"></div>
			<div className="w-full">
				<Table
					columns={[
						{
							text: "Code",
							id: "firstname",
							className: "",
							cellClassName: "",
						},
						{
							text: "Name",
							id: "firstname",
							className: "",
							cellClassName: "",
						},
						{
							text: "Description",
							id: "firstname",
							className: "",
							cellClassName: "",
						},
						{
							text: "UoM",
							id: "firstname",
							className: "",
							cellClassName: "",
						},
						{
							text: "Location",
							id: "firstname",
							className: "",
							cellClassName: "",
						},
						{
							text: "QTY on hand",
							id: "firstname",
							className: "",
							cellClassName: "",
						},
						{
							text: "Unit price",
							id: "firstname",
							className: "",
							cellClassName: "",
						},
						{
							text: "Stocks",
							id: "firstname",
							className: "",
							cellClassName: "",
						},
						{
							text: "Action",
							id: "firstname",
							className: "",
							cellClassName: "",
						},
					]}
					data={[
						{
							firstname: "Sample",
						},
					]}
					loading={false}
				/>
			</div>
		</AppLayout>
	);
};

export default Inventory;
