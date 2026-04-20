import { toast } from "react-toastify";

const ClickToCopy = ({ text }) => {
	const handleCopy = () => {
		navigator.clipboard
			.writeText(text)
			.then(() => {})
			.catch(() => {});
	};
	return (
		<div title={text} onClick={handleCopy}>
			{text}
		</div>
	);
};

export default ClickToCopy;
