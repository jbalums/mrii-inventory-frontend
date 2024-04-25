import { isNumeric } from "@/libs/helpers";
import { useEffect, useState } from "react";
import FlatIcon from "../FlatIcon";
import useNoBugUseEffect from "@/hooks/useNoBugUseEffect";

const QtyInputField = ({ qty, setQty, max, ...props }) => {
	const [value, setValue] = useState(1);

	const plusOneQty = () => {
		setValue((currentQty) => {
			if (max) {
				if (currentQty < max) {
					return currentQty + 1;
				} else {
					return max;
				}
			} else {
				return currentQty + 1;
			}
		});
		// setQty((currentQty) => {
		// 	if(currentQty < max){
		// 		return currentQty + 1
		// 	}
		// });
	};

	const minusOneQty = () => {
		setValue((currentQty) => {
			if (currentQty > 1) {
				return currentQty - 1;
			}
			return 0;
		});
		// setQty((currentQty) => {
		// 	if (currentQty > 1) {
		// 		return currentQty - 1;
		// 	}
		// 	return 0;
		// });
	};

	useNoBugUseEffect({
		functions: () => {
			setQty(value);
		},
		params: [value],
	});
	return (
		<div className="flex items-center justify-center group">
			<div
				className="h-11 w-11 flex items-center justify-center rounded-l-lg border-t border-b border-l border-border group-hover:border-secondary group-focus-within:border-secondary cursor-pointer hover:bg-background duration-200 bg-opacity-25"
				onClick={minusOneQty}
			>
				<FlatIcon icon="rr-minus" />
			</div>
			<input
				type="text"
				className="h-11 py-3 px-2 text-center bg-foreground border border-border group-hover:border-secondary group-focus-within:border-secondary w-20 active:bg-background hover:bg-background focus:bg-background bg-opacity-25"
				value={value}
				onChange={(e) => {
					let input_value = e.target.value;
					// if (isNumeric(String(input_value))) {
					setValue(input_value);
					// }
				}}
				onBlur={(e) => {
					let input_value = e.target.value;
					if (isNumeric(String(input_value))) {
						setValue(input_value);
					} else {
						setValue(1);
					}
				}}
				{...props}
			/>
			<div
				className="h-11 w-11 flex items-center justify-center rounded-r-lg border-t border-b border-r border-border group-hover:border-secondary group-focus-within:border-secondary cursor-pointer hover:bg-background duration-200 bg-opacity-25"
				onClick={plusOneQty}
			>
				<FlatIcon icon="rr-plus" />
			</div>
		</div>
	);
};

export default QtyInputField;
