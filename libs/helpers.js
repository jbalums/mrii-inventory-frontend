export const pipe =
	(...fns) =>
	(x) =>
		fns.reduce((v, f) => f(v), x);

export const isNumeric = (value) => {
	return /^-?\d+$/.test(value);
};

export const dateTodayInput = () => {
	let date = new Date();
	let output = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
		2,
		"0"
	)}-${String(date.getDate()).padStart(2, "0")}`;
	// console.log("outputoutputoutput", output);
	return output;
};
export const currentDate = () => {
	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	let d = new Date();
	// ("January 15, 2023");
	return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};
export const formatDate = (date = null) => {
	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	let d = new Date(date);
	// ("January 15, 2023");
	return `${months[d.getMonth()]} ${String(d.getDate()).padStart(
		2,
		"0"
	)}, ${d.getFullYear()}`;
};
export const addZero = (str) => {
	return String(str).padStart(2, "0");
};
export const formatDateYYYMMDD = (date = null) => {
	let d = new Date(date);
	// ("January 15, 2023");
	return `${d.getFullYear()}-${addZero(d.getMonth() + 1)}-${addZero(
		d.getDate()
	)}`;
};
export const formatDateWithTime = (date) => {
	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	let d = new Date(date);
	// ("January 15, 2023");
	let h = d.getHours();
	let min = d.getHours();
	let period = h >= 12 ? "PM" : "AM";
	return `${months[d.getMonth()]} ${addZero(
		d.getDate()
	)}, ${d.getFullYear()} ${addZero(h > 12 ? h - 12 : h)}:${addZero(
		min
	)} ${period}`;
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

export const formatToCurrency = (value) => {
	const formatter = new Intl.NumberFormat("en-PH", {
		style: "currency",
		currency: "PHP",
		currencyDisplay: "symbol",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
	const result = formatter.format(value).replace("₱", "₱ ");
	return result;
};
export const setErrors = (data, setError) => {
	if (data) {
		Object.keys(data).map((key) => {
			setError(key == "username" ? "email" : key, {
				type: "manual",
				message: data[key][0],
			});
		});
	}
};

export const extractFirstLetters = (sentence, limit) => {
	// Split the sentence into words
	const words = sentence.split(" ");

	// Initialize an empty array to store the first letters
	const firstLetters = [];

	// Loop through all words and extract their first letters
	for (let i = 0; i < limit; i++) {
		const word = words[i].trim(); // Trim to remove any leading/trailing spaces
		if (word !== "") {
			// Check if the word is not empty
			firstLetters.push(word[0]);
		}
	}

	// Join the first letters and return as a string
	const result = firstLetters.join("");

	return String(result).toUpperCase();
};


export const cleanStr = (str) => {
	return str.replaceAll('_',' ');
}