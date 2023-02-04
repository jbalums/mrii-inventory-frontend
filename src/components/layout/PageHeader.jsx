import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import DropdownMenu from "../DropdownMenu";
import FlatIcon from "../FlatIcon";
import ConfirmModal from "../modals/ConfirmModal";

const PageHeader = (props) => {
	const { title, children, backBtn, backAction } = props;
	const confirm_logout_ref = useRef(null);
	const [loading, setLoading] = useState(false);
	const { logout, user } = useAuth({
		middleware: "auth",
		redirectIfAuthenticated: "/",
	});
	const navigate = useNavigate();

	return (
		<div className="flex min-h-[76px] sticky top-0 bg-background shadow-sm py-4 lg:py-[unset] items-start justify-center lg:justify-start lg:items-center gap-y-2 lg:gap-y-0 border-b border-border px-4 pb-4 lg:pb-0 lg:px-6 flex-col lg:flex-row z-[2]">
			{backBtn ? (
				<div
					className="bg-white h-11 w-11 rounded-full flex items-center justify-center mr-4 cursor-pointer hover:shadow-sm duration-200"
					onClick={() => {
						if (backAction) {
							backAction();
						} else {
							navigate(-1);
						}
					}}
				>
					<FlatIcon icon="rr-arrow-small-left" className="text-3xl" />
				</div>
			) : (
				""
			)}
			{title ? <h1 className="text-xl font-bold">{title}</h1> : ""}
			{children ? children : <div className="ml-auto"></div>}
			<DropdownMenu
				className="self-center place-self-end ml-4"
				menuButtonClassName="flex items-center flex items-center gap-3"
				options={[
					{
						label: (
							<>
								<FlatIcon icon="rr-user" className="text-" />
								My profile
							</>
						),
						onClick: () => {},
						className: "",
					},
					{
						label: (
							<>
								<FlatIcon
									icon="rr-sign-out-alt"
									className="text-"
								/>
								Logout
							</>
						),
						onClick: () => {
							confirm_logout_ref.current.show();
						},
						className: "",
					},
				]}
			>
				<div className="h-8 w-8 rounded-full bg-gray-500"></div>
				<span>{user?.data?.name}</span>
				<span className="text-dark mt-1">
					<FlatIcon icon="rr-caret-down" />
				</span>
			</DropdownMenu>
			<ConfirmModal
				ref={confirm_logout_ref}
				title="Confirm logout"
				body={
					<p className="text-red-600 text-lg text-center my-3">
						Are you sure you want to <b>logout user</b>?{" "}
					</p>
				}
				footer={
					<div className="flex items-center w-full justify-between">
						<Button
							className=""
							onClick={() => {
								confirm_logout_ref.current.hide();
							}}
						>
							No
						</Button>
						<Button
							type="success"
							onClick={() => {
								setLoading(true);
								if (typeof window == "object") {
									window.localStorage.clear();
								}
								setTimeout(() => {
									// logout();
									confirm_logout_ref.current.hide();
									window.location.pathname = "/login";
								}, 1000);
							}}
							loading={loading}
						>
							Yes, logout
						</Button>
					</div>
				}
			/>
		</div>
	);
};

export default PageHeader;
