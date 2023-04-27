import {
	useState,
	Fragment,
	forwardRef,
	useImperativeHandle,
	useEffect,
	useRef,
} from "react";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import Modal from "@/src/components/modals/Modal";
import TextInputField from "@/src/components/forms/TextInputField";
import { useForm } from "react-hook-form";
import Button from "@/src/components/Button";
import axios from "@/libs/axios";
import FlatIcon from "@/src/components/FlatIcon";
import RepackingSelectProductModal from "./RepackingSelectProductModal";

const RepackingModal = (props, ref) => {
	const {
		register,
		handleSubmit,
		setError,
		watch,
		clearErrors,
		reset,
		formState: { errors },
	} = useForm();

	const selectProductRef = useRef(null);
	const [open, setOpen] = useState(false);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [keyword, setKeyword] = useState("");
	const [products, setProducts] = useState([]);
	useEffect(() => {
		let t = setTimeout(() => {
			setLoading(true);
			getProductList();
		}, 500);
		return () => {
			clearTimeout(t);
		};
	}, [keyword]);
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		setOpen(true);
	};
	const hide = () => {
		setOpen(false);
		setTimeout(() => {
			reset();
			setId(null);
		}, 300);
	};
	const successCallBack = (data) => {
		hide();
	};
	const submitForm = (data) => {};
	const getProductList = () => {
		axios
			.get(`/inventory?keyword=${keyword}`)
			.then((res) => {
				setProducts(res.data.data);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<>
			<Modal open={open} hide={hide} size="lg">
				<ModalHeader title={`Repack Product`} hide={hide} />
				<ModalBody className={`py-4 relative min-h-[256px]`}>
					<div className="absolute top-0 left-0 h-full w-full bg-white backdrop-blur flex items-center justify-center">
						<Button
							onClick={() => {
								selectProductRef.current.show();
							}}
						>
							Select product
						</Button>
					</div>
					<div className="grid grid-cols-12 gap-4">
						<div className=" col-span-12 flex flex-col gap-3">
							<h3 className="text-lg font-bold">Convertion</h3>
						</div>
					</div>
				</ModalBody>
				<ModalFooter className={`flex items-center justify-end`}>
					<Button
						onClick={handleSubmit(submitForm)}
						loading={loading}
					>
						Submit
					</Button>
				</ModalFooter>
			</Modal>
			<RepackingSelectProductModal ref={selectProductRef} />
		</>
	);
};

export default forwardRef(RepackingModal);
