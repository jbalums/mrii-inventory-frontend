import axios from "@/libs/axios";
import Button from "@/src/components/Button";
import Infotext from "@/src/components/InfoText";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import Modal from "@/src/components/modals/Modal";
import { useEffect, useState } from "react";

const ProductDetailsModal = ({ open, productId, onClose }) => {
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		if (!open || !productId) {
			setProduct(null);
			setError("");
			return;
		}

		let isCurrent = true;

		setLoading(true);
		setError("");

		axios
			.get(`/management/products/${productId}`)
			.then((res) => {
				if (isCurrent) {
					setProduct(res.data?.data || null);
				}
			})
			.catch(() => {
				if (isCurrent) {
					setError("Unable to load product details.");
				}
			})
			.finally(() => {
				if (isCurrent) {
					setLoading(false);
				}
			});

		return () => {
			isCurrent = false;
		};
	}, [open, productId]);

	return (
		<Modal open={open} hide={onClose} size="md">
			<ModalHeader
				title="Product details"
				subtitle="Product information from the master product record."
				hide={onClose}
			/>
			<ModalBody className="py-4">
				{loading ? (
					<div className="py-8 text-center text-placeholder">
						Loading product details...
					</div>
				) : error ? (
					<div className="py-8 text-center text-danger">{error}</div>
				) : (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						<Infotext
							label="Product code"
							text={product?.code || "-"}
							className="lg:col-span-2"
						/>
						<Infotext
							label="Product name"
							text={product?.name || "-"}
							className="lg:col-span-2"
						/>
						<Infotext
							label="Description"
							text={product?.description || "-"}
							className="lg:col-span-2"
						/>
						<Infotext
							label="Category"
							text={product?.category?.name || "-"}
						/>
						<Infotext
							label="Brand"
							text={product?.brand?.name || product?.brand || "-"}
						/>
						<Infotext
							label="Unit of measurement"
							text={product?.unit_measurement || "-"}
						/>
						<Infotext
							label="Unit value"
							text={product?.unit_value || "-"}
						/>
					</div>
				)}
			</ModalBody>
			<ModalFooter className="flex items-center justify-end">
				<Button type="primary" onClick={onClose}>
					Close
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default ProductDetailsModal;
