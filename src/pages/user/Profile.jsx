import AppLayout from "@/src/components/AppLayout";
import FlatIcon from "@/src/components/FlatIcon";

const Profile = () => {
	return (
		<AppLayout
			title={
				<div className="flex items-center gap-2">
					<FlatIcon icon="rr-truck-moving" />
					My profile
				</div>
			}
		>
			<div className="grid grid-cols-2 gap-6">
				<div className="p-6 bg-red-400"></div>
				<div className="p-6 bg-blue-400"></div>
			</div>
		</AppLayout>
	);
};

export default Profile;
