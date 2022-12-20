import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import ContainerCard from "@/src/components/layout/ContainerCard";
import Table from "@/src/components/table/Table";
import { useBranchLocation } from "@/src/features/locations/hooks/useBranchLocationHook";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "@/libs/axios.js";

const Approving = () => {

	const [stats,setStats] = useState({})

	useEffect(() => {
		axios.get(`/inventory/accepting-stats`).then((res) =>{
			setStats(res.data)
		})
	},[])

	return (
		<AppLayout title="Approving">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
				<ContainerCard
					mainClassName={` col-span-1 lg:col-span-6 2xl:col-span-5`}
					className="!p-0 !relative"
				>
					<div className="lg:flex lg:flex-row relative w-full items-center">
						<div className="flex flex-col items-start p-4 pb-11 z-20 ">
							<h3 className="text-xl font-bold text-accent mb-2">
								Approve Requested Order
							</h3>
							<span className="text-sm text-dark mb-4">
								Review all requested orders before approving
							</span>
							<div className="rounded-lg bg-foreground flex flex-col p-4 mb-4 w-full z-20">
								<h3 className="text-xl mb-1 text-primary">
									{stats.request_orders ?? 0} pending orders
								</h3>
								<span className="text-primary text-sm">
									Requested to order
								</span>
							</div>
							<Link to="/approving/approve-request-order">
								<Button
									type="accent"
									size="md"
									className="gap-2"
								>
									View requests{" "}
									<FlatIcon icon="rr-arrow-right" />
								</Button>
							</Link>
						</div>

						<img
							className=" w-[224px] ml-auto absolute top-6 lg:top-[unset] right-6 lg:right-[unset] z-[1] lg:relative opacity-25 lg:opacity-100"
							src="/approve_request_img.png"
							alt=""
						/>
					</div>
				</ContainerCard>
				<ContainerCard
					mainClassName={` col-span-1 lg:col-span-6 2xl:col-span-5`}
					className="!p-0 !relative"
				>
					<div className="lg:flex lg:flex-row relative w-full items-center">
						<div className="flex flex-col items-start p-4 pb-11">
							<h3 className="text-xl font-bold text-accent mb-2">
								Approve Issuance
							</h3>
							<span className="text-sm text-dark mb-4">
								Review all items that are ready to issue before
								approving
							</span>
							<div className="rounded-lg bg-foreground flex flex-col p-4 mb-4 w-full z-20">
								<h3 className="text-xl mb-1 text-primary">
									{stats.issuance ?? 0} pending issuance
								</h3>
								<span className="text-primary text-sm">
									requested to issue
								</span>
							</div>
							<Link to="/approving/approve-issuance-order">
								<Button
									type="accent"
									size="md"
									className="gap-2"
								>
									View requests{" "}
									<FlatIcon icon="rr-arrow-right" />
								</Button>
							</Link>
						</div>

						<img
							className=" w-[224px] ml-auto absolute top-6 lg:top-[unset] right-6 lg:right-[unset] z-[1] lg:relative opacity-25 lg:opacity-100"
							src="/approve_issuance_img.png"
							alt=""
						/>
					</div>
				</ContainerCard>
			</div>
		</AppLayout>
	);
};

export default Approving;
