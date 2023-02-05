import React, { useEffect, useState } from "react";
import TextInputField from "./TextInputField";
const ImageUpload = ({
	defaultPreview,
	label,
	onChange,
	className = "",
	imgClassName = "",
}) => {
	const [preview, setPreview] = useState(null);
	const [file, setFile] = useState(null);

	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
		setPreview(URL.createObjectURL(event.target.files[0]));
	};

	useEffect(() => {
		if (defaultPreview) {
			setPreview(defaultPreview);
		}
	}, [defaultPreview]);
	useEffect(() => {
		if (file != null && onChange) {
			onChange(file);
		}
	}, [file]);

	return (
		<label
			className={`flex flex-col cursor-pointer ${className}`}
			title={file ? "Change picture" : "Click to select picture."}
		>
			{preview && (
				<img
					src={preview}
					alt="Preview"
					className={`${imgClassName}`}
				/>
			)}
			<TextInputField
				className=" !cursor-pointer"
				label={label}
				type="file"
				accept="image/*"
				onChange={handleFileChange}
			/>
		</label>
	);
};

export default ImageUpload;
