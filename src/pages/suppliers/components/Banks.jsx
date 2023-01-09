import React from "react";
import { v4 as uuidv4 } from "uuid";
import FlatIcon from "@/src/components/FlatIcon.jsx";
import TextInputField from "@/src/components/forms/TextInputField.jsx";
import { useFieldArray } from "react-hook-form";

const BanksForm = ({ index, remove, register }) => {
	return (
		<div className="col-span-2 grid grid-cols-1 lg:grid-cols-12 gap-4 border border-secondary rounded-lg p-4 relative">
			<TextInputField
				className={`lg:col-span-3`}
				label={`Account/Bank name`}
				placeholder={"Account/Bank name"}
				id="name"
				name="name"
				defaultValue={""}
				{...register(`banks.${index}.name`)}
			/>
			<TextInputField
				className={`lg:col-span-4`}
				label={`Account number`}
				placeholder={"Account number"}
				id="account_number"
				name="account_number"
				defaultValue={""}
				{...register(`banks.${index}.account_number`)}
			/>
			<TextInputField
				className={`lg:col-span-4`}
				label={`Account name`}
				placeholder={"Account name"}
				id="account_name"
				name="account_name"
				defaultValue={""}
				{...register(`banks.${index}.account_name`)}
			/>
			{index !== 0 && (
				<div className="flex items-center justify-center">
					<div
						className="p-2 rounded-full h-8 w-8 bg-danger text-white flex items-center justify-center absolute right-1 top-1 lg:top-4 lg:right-4 cursor-pointer hover:shadow-xl duration-200"
						onClick={() => {
							remove(index);
						}}
					>
						<FlatIcon icon="rr-x" />
						<span className="lg:hidden">Remove row</span>
					</div>
				</div>
			)}
		</div>
	);
};

const Banks = ({ control, register }) => {
	const { fields, append, remove } = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormContext)
		name: "banks", // unique name for your Field Array
	});
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
			<h3 className="border-b text-secondary">Supplier Bank Accounts</h3>
			{fields.map((field, index) => {
				return (
					<BanksForm
						key={field.id}
						register={register}
						remove={remove}
						index={index}
					/>
				);
			})}
			<div
				className="cursor-pointer border border-dashed rounded-lg border-secondary flex items-center justify-center p-4 gap-4 lg:col-span-2"
				onClick={() => {
					append({
						name: "",
						account_number: "",
						account_name: "",
					});
				}}
			>
				<FlatIcon icon="rr-plus" />
				Add new bank
			</div>
		</div>
	);
};

export default Banks;
