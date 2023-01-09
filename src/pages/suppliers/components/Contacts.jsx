import React from "react";
import { useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import TextInputField from "@/src/components/forms/TextInputField.jsx";
import FlatIcon from "@/src/components/FlatIcon.jsx";

const ContactPersonForm = ({ index, register, remove }) => {
	console.log("indexxx", index);
	return (
		<div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4 border border-secondary rounded-lg p-4 relative">
			<TextInputField
				label={`Contact Person name`}
				placeholder={"Enter person name"}
				id="name"
				name="name"
				defaultValue={""}
				{...register(`contacts.${index}.name`)}
			/>{" "}
			<TextInputField
				label={`Position`}
				placeholder={"Enter person position"}
				id="position"
				name="position"
				defaultValue={""}
				{...register(`contacts.${index}.position`)}
			/>
			{index !== 0 && (
				<div
					className="p-2 rounded-full h-8 w-8 bg-danger text-white flex items-center justify-center absolute right-1 top-1 lg:top-4 lg:right-4 cursor-pointer hover:shadow-xl duration-200"
					onClick={() => {
						remove(index);
					}}
				>
					<FlatIcon icon="rr-x" />
				</div>
			)}
			<TextInputField
				label={`Mobile No. / Tel No.`}
				placeholder={"Enter mobile No. / tel No."}
				id="number"
				name="number"
				defaultValue={""}
				{...register(`contacts.${index}.number`)}
			/>
			<TextInputField
				label={`Email`}
				placeholder={"Enter email"}
				id="email"
				name="email"
				type="email"
				defaultValue={""}
				{...register(`contacts.${index}.email`)}
			/>
		</div>
	);
};

const Contacts = ({ control, register }) => {
	const { fields, append, remove } = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormContext)
		name: "contacts", // unique name for your Field Array
	});

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
			<h3 className="border-b text-secondary">
				Supplier Contacts Person
			</h3>

			{fields.map((field, index) => (
				<ContactPersonForm
					key={field.id}
					register={register}
					remove={remove}
					index={index}
				/>
			))}

			<div
				className="cursor-pointer border border-dashed rounded-lg border-secondary flex items-center justify-center p-4 gap-4 lg:col-span-2"
				onClick={() => {
					append({
						name: "",
						number: "",
						email: "",
					});
				}}
			>
				<FlatIcon icon="rr-plus" />
				Add new contact
			</div>
		</div>
	);
};

export default Contacts;
