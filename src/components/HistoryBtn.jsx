import { useRef } from "react";
import HistoryModal from "./HistoryModal";
import FlatIcon from "./FlatIcon";
import Button from "./Button";
import { getStorage } from "@/libs/storage";
import { useAuth } from "@/hooks/useAuth";

const HistoryBtn = ({ title, entity }) => {
	const history_modal_ref = useRef(null);
	const { user } = useAuth();
	return user?.data?.user_type?.includes("admin") ? (
		<>
			<div className="ml-auto">
				<Button
					type="secondary-dark-outline"
					className="ml-auto !rounded-xl !bg-blue-50"
					onClick={() => {
						history_modal_ref.current.show();
					}}
				>
					<FlatIcon icon="rr-clock" />
					Changes logs
				</Button>
			</div>
			<HistoryModal
				title="Change History Logs"
				entity={entity}
				ref={history_modal_ref}
			/>
		</>
	) : (
		""
	);
};

export default HistoryBtn;
