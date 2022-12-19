import { useNavigate } from "react-router-dom";
import FlatIcon from "../FlatIcon";

const PageHeader = (props) => {
	const { title, children, backBtn, backAction } = props;

	const navigate = useNavigate();

	return (
		<div className="flex min-h-[76px] py-4 lg:py-[unset] items-start justify-center lg:justify-start lg:items-center gap-y-2 lg:gap-y-0 border-b border-border px-4 pb-4 lg:pb-0 lg:px-6 flex-col lg:flex-row">
			{backBtn ? (
				<div
					className="bg-background h-11 w-11 rounded-full flex items-center justify-center mr-4 cursor-pointer hover:shadow-sm duration-200"
					onClick={() => {
						if (backAction) {
							backAction();
						} else {
							navigate(-1);
						}
					}}
				>
					<FlatIcon icon="rr-arrow-left" />
				</div>
			) : (
				""
			)}
			{title ? <h1 className="text-xl font-bold">{title}</h1> : ""}
			{children ? children : ""}
		</div>
	);
};

export default PageHeader;
