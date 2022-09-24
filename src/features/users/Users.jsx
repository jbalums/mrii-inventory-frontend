import AppLayout from "@/src/components/AppLayout";
import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import ConfirmModal from "@/src/components/modals/ConfirmModal";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import AddUserModal from "./components/AddUserModal";
import { useUserHook } from "./hooks/useUserHook";

const Users = () => {
    const form_modal_ref = useRef(null);
    const delete_user_modal_ref = useRef(null);

    const [list, setList] = useState([]);
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(false);
    const {
        data,
        loading: dataLoading,
        setLoading: setDataLoading,
        page,
        setPage,
        paginate,
        setPaginate,
        keyword,
        setKeyword,
        filters,
        setFilters,
        meta,
        setMeta,
    } = useDataTable(`/management/users`);
    const columns = useMemo(
        () => [
            {
                header: "Firstname",
                accessorKey: "firstname",
            },
            {
                header: "Lastname",
                accessorKey: "lastname",
            },
            {
                header: "Email/Username",
                accessorKey: "username",
            },
            {
                header: "User type",
                className: "!text-center",
                accessorKey: "user_type",
            },
            {
                header: "Action",
                accessorKey: "action",
                className: "!text-center",
                cell: ({ row, getValue }) => {
                    console.log("roww", row);
                    if (row?.original?.id != 1)
                        return (
                            <>
                                <div className="flex items-center justify-center text-center gap-4">
                                    <Button
                                        type="primary"
                                        size="sm"
                                        className="rounded-full"
                                        onClick={() => {
                                            openFormModal(row?.original);
                                        }}
                                    >
                                        <FiEdit className="font-bold text-sm" />
                                    </Button>
                                    <Button
                                        type="danger"
                                        size="sm"
                                        className="rounded-full"
                                        onClick={() => {
                                            setId(row?.original?.id);
                                            openConfirmDelete();
                                        }}
                                    >
                                        <FiTrash2 className="font-bold text-sm" />
                                    </Button>
                                </div>
                            </>
                        );
                },
            },
        ],
        []
    );

    const { deleteUser } = useUserHook();

    useEffect(() => {
        setList(data?.data || []);
    }, [data?.data]);

    const openFormModal = (data) => {
        form_modal_ref.current.show(data.type == "click" ? null : data);
    };

    const openConfirmDelete = () => {
        setLoading(false);
        delete_user_modal_ref.current.show();
    };

    const closeConfirmDelete = () => {
        setLoading(false);
        delete_user_modal_ref.current.hide();
    };

    const addToList = (item) => {
        setList((list) => [item, ...list]);
    };

    const updateInList = (item) => {
        setList((list) => list.map((x) => (x.id == item.id ? item : x)));
    };

    const deleteData = () => {
        setLoading(true);
        deleteUser(id)
            .then((res) => {
                toast.success("User deleted successfully!");
                removeFromList({ id: id });
            })
            .catch(() => {
                toast.error(
                    "An error occured while trying to delete! Please try again later."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const removeFromList = (item) => {
        setList((list) => list.filter((x) => x.id != item.id));
    };
    return (
        <AppLayout
            title="Manage users"
            titleChildren={
                <Button
                    type="accent"
                    className="ml-auto"
                    onClick={openFormModal}
                >
                    <FlatIcon icon="rs-plus" className="mr-2" /> Register new
                    User
                </Button>
            }
        >
            <div className="w-full">
                <Table
                    meta={meta}
                    columns={columns}
                    pagination={true}
                    loading={dataLoading}
                    data={list}
                    onTableChange={(data) => {
                        console.log("onTableChange", data);
                        setPage(data.pageIndex + 1);
                        setPaginate(data.pageSize);
                    }}
                />
            </div>
            <AddUserModal
                ref={form_modal_ref}
                addToList={addToList}
                updateInList={updateInList}
            />
            <ConfirmModal
                ref={delete_user_modal_ref}
                title="Cofirm delete user?"
                body={
                    <p className="text-red-600 font-semibold text-lg text-center">
                        Are you sure you want to delete user?{" "}
                    </p>
                }
                footer={
                    <div className="flex items-center">
                        <Button onClick={closeConfirmDelete}>No</Button>
                        <Button
                            type="danger"
                            className="ml-4"
                            onClick={deleteData}
                            loading={loading}
                        >
                            Yes, delete user!
                        </Button>
                    </div>
                }
            />
        </AppLayout>
    );
};

export default Users;
