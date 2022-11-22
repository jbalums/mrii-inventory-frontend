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
