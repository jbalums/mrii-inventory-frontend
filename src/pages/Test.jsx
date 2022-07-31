import { useRef } from "react";
import Button from "../components/Button";
import Modal from "../components/modals/Modal";

const Test = () => {
	const modal = useRef(null);
	const openModal = () => {
		modal.current.show();
	};
	return (
		<div className="flex p-6">
			<Button onClick={openModal}>Open modal</Button>
			<Modal ref={modal} />
		</div>
	);
};

export default Test;
