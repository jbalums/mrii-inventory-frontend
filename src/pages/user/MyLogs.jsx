import { useAuth } from "@/hooks/useAuth";
import axios from "@/libs/axios";
import { formatDateWithTime } from "@/libs/helpers";
import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import TextInputField from "@/src/components/forms/TextInputField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const MyLogs = () => {
	const { user } = useAuth();
	const {
		reset,
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm();
	const [loading, setLoading] = useState(false);

	return (
		<AppLayout
			icon={<FlatIcon icon="rr-user" />}
			title={"My profile"}
			breadcrumbs={[
				{
					to: "/profile",
					label: "My profile",
				},
			]}
		>
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
				<div className="p-6  rounded-xl flex flex-col">
					<div className="flex flex-col gap-4 items-center justify-center">
						<img
							className="h-[144px] w-[144px] md:h-[288px] md:w-[288px] object-contain bg-primary rounded-xl"
							src={
								user?.data?.avatar?.length > 0
									? user?.data?.avatar
									: `https://api.dicebear.com/5.x/initials/svg?seed=${user?.data?.name}&scale=75`
							}
						/>
						<h4 className="text-xl text-primary font-bold">
							{user?.data?.name}
						</h4>
					</div>
					<p className="text-gray-500 text-center capitalize text-sm">
						{user?.data?.business_unit}
					</p>
					<p className="text-gray-600 font-semibold text-center uppercase -mt-1">
						{user?.data?.user_type}
					</p>
				</div>
				<div className="flex flex-col gap-y-6 xl:col-span-3">
					<div className="p-6 bg-slate-100 flex flex-col gap-y-2 rounded-xl">
						<h2 className="text-xl font-bold pb-4 mb-4 border-b gap-2 flex items-center">
							<FlatIcon icon="rr-id-badge" />
							User logs
						</h2>
						<div className="flex flex-col pl-4">
							{user?.data?.operations?.map((operation) => {
								return (
									<div className="border-l-2 pl-4 py-2">
										<div className="flex items-start gap-4 pb-4 border-b">
											<FlatIcon icon="rr-pen-field" />
											<span className="flex flex-col">
												<b className="text-blue-700">
													{operation?.message}{" "}
												</b>
												{/* {operation?.meta} */}
												{operation?.meta?.length > 0 ? (
													<div className="flex flex-col">
														{operation?.meta?.map(
															(metaData) => {
																return (
																	<span className="ml-4">
																		Updated{" "}
																		<b>
																			{
																				metaData?.key
																			}{" "}
																		</b>{" "}
																		from{" "}
																		<b>
																			{
																				metaData?.old
																			}
																		</b>{" "}
																		to{" "}
																		<b>
																			{
																				metaData?.new
																			}
																		</b>
																	</span>
																);
															}
														)}
													</div>
												) : (
													""
												)}
												<span className="mt-2 text-xs text-slate-500">
													{formatDateWithTime(
														new Date(
															operation?.performed_at
														)
													)}
												</span>
											</span>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</AppLayout>
	);
};

export default MyLogs;
