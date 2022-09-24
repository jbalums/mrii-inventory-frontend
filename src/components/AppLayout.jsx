import { useAuth } from "@/hooks/useAuth";
import { ToastContainer } from "react-toastify";
import LeftSidebar from "./layout/LeftSidebar";
import PageHeader from "./layout/PageHeader";

const AppLayout = (props) => {
    const { title, titleChildren, children } = props;

    const { user } = useAuth({
        middleware: "auth",
        redirectIfAuthenticated: "/",
    });

    return (
        <div
            className={`antialiased h-screen min-h-[720px] w-screen max-h-screen overflow-auto bg-slate-100 flex flex-col`}
        >
            <div className="w-full flex h-full ">
                <LeftSidebar user={user} />

                <div className="relative bg-foreground h-full w-full max-h-screen overflow-auto">
                    <PageHeader title={title}>{titleChildren}</PageHeader>
                    <div className="p-6 w-full">{children}</div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default AppLayout;
