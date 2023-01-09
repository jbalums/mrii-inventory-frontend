export const pipe =
	(...fns) =>
	(x) =>
		fns.reduce((v, f) => f(v), x);

export const isNumeric = (value) => {
	return /^-?\d+$/.test(value);
};

export const dateTodayInput = () => {
	let date = new Date();
	let output = `${date.getFullYear()}-${
		date.getMonth() + 1
	}-${date.getDate()}`;
	console.log("output", output);
	return output;
};

export const mobileNumber = (number = "") => {
	let str = String(number);
	if (str.startsWith("09")) {
		str = str.substring(1);
	}
	let output = str.match(/.{1,3}/g);
	return output?.length > 3
		? `(+63) ${output[0] || ""} ${output[1] || ""} ${output[2] || ""}${
				output[3] || ""
		  }`
		: `(+63)  ${output[0] || ""} ${output[1] || ""} ${output[2] || ""}`;
};
