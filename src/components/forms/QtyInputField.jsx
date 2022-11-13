import { isNumeric } from "@/libs/helpers";
import { useEffect, useState } from "react";
import FlatIcon from "../FlatIcon";

const QtyInputField = ({ qty, setQty }) => {
	const [value, setValue] = useState(qty);

	const plusOneQty = () => {
		setValue((currentQty) => currentQty + 1);
		setQty((currentQty) => currentQty + 1);
	};
	const minusOneQty = () => {
		setValue((currentQty) => {
			if (currentQty > 1) {
				return currentQty - 1;
			}
			return 0;
		});
		setQty((currentQty) => {
			if (currentQty > 1) {
				return currentQty - 1;
			}
			return 0;
		});
	};

	return (
		<div className="flex items-center justify-center">
			<div
				className="h-11 w-11 flex items-center justify-center rounded-l-lg border-t border-b border-l border-border cursor-pointer hover:bg-background duration-200 bg-opacity-25"
				onClick={minusOneQty}
			>
				<FlatIcon icon="rr-minus" />
			</div>
			<input
				type="text"
				className="h-11 p-3 text-center bg-foreground border border-border w-20 active:bg-background hover:bg-background focus:bg-background  bg-opaci-25"
				value={value}
				onChange={(e) => {
					let input_value = e.target.value;
					if (isNumeric(String(input_value))) {
						setValue(input_value);
					} else {
						setValue(1);
					}
				}}
				onBlur={(e) => {
					let input_value = e.target.value;
					if (isNumeric(String(input_value))) {
						setQty(input_value);
					} else {
						setQty(1);
					}
				}}
			/>
			<div
				className="h-11 w-11 flex items-center justify-center rounded-r-lg border-t border-b border-r border-border cursor-pointer hover:bg-background duration-200 bg-opacity-25"
				onClick={plusOneQty}
			>
				<FlatIcon icon="rr-plus" />
			</div>
		</div>
	);
};

export default QtyInputField;
