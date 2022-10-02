import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import Modal from "@/src/components/modals/Modal";
import Table from "@/src/components/table/Table";
import useDataTable from "@/src/helpers/useDataTable";
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import useReceiving from "../hooks/useReceivingHook";

const ReceivingFormModal = (props, ref) => {
    const {
        register,
        handleSubmit,
        setError,
        watch,
        clearErrors,
        reset,
        control,
        formState: { errors },
    } = useForm();
    const { saveReceiving } = useReceiving();

    const [list, setList] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const {
        data,
        loading: dataLoading,
        addToList,
        updateInList,
        removeFromList,
    } = useDataTable(`/management/products`);

    useEffect(() => {
        setList(data?.data || []);
    }, [data?.data]);
    const isSelected = (item) => {
        if (selectedItems.length == 0) {
            return false;
        }
        return selectedItems.find((x) => x.id == item.id) ? true : false;
    };
    const selectItem = (item) => {
        console.log("isSelected", item?.id, isSelected(item));
        if (isSelected(item)) {
            item.selected = false;
            setSelectedItems((prevItems) =>
                prevItems.filter((x) => x.id != item?.id)
            );
        } else {
            item.selected = true;
            setSelectedItems([...selectedItems, item]);
        }
    };
    const columns = useMemo(
        () => [
            {
                header: "Product ID",
                accessorKey: "code",
            },
            {
                header: "Name",
                accessorKey: "name",
            },
            {
                header: "Unit of measurement",
                accessorKey: "unit_measurement",
                className: "!text-center",
            },
            {
                header: "Quantity on hand",
                accessorKey: "quantity",
                className: "!text-center",
            },
            {
                header: "Select",
                id: "action",
                className: "!text-center",
                cell: ({ row, getValue }) => {
                    console.log("rowwwww", row);
                    const item = row.original;
                    return (
                        <>
                            <div className="flex items-center justify-center text-center gap-4">
                                <div
                                    className={`w-6 h-6 rounded border-border border-2 flex justify-center items-center cursor-pointer  duration-200 group ${
                                        isSelected(item)
                                            ? "!bg-darker hover:!opacity-100"
                                            : " hover:opacity-50"
                                    }`}
                                    onClick={() => {
                                        selectItem(item);
                                    }}
                                >
                                    <FlatIcon
                                        icon="br-check"
                                        className={`-mb-1 opacity-0 text-light group-hover:opacity-100 duration-200 ${
                                            isSelected(item)
                                                ? "text-light opacity-100"
                                                : ""
                                        }`}
                                    />
                                </div>
                            </div>
                        </>
                    );
                },
            },
        ],
        [list, selectedItems]
    );

    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(false);

    useImperativeHandle(ref, () => ({
        show: show,
        hide: hide,
    }));

    const show = (data) => {
        setOpen(true);
    };
    const hide = () => {
        setOpen(false);
        setTimeout(() => {
            reset();
            setId(null);
        }, 300);
    };

    const successCallBack = (data) => {
        if (id) {
            updateInList(data);
        } else {
            props.addToList(data);
        }
        hide();
    };

    const submitForm = (data) => {
        setLoading(true);
        let formData = {
            ...data,
            products: selectedItems.map((item) => item.id),
            quantity: selectedItems.map((item) => item.quantity),
        };
        saveReceiving({
            setLoading,
            setError,
            callback: successCallBack,
            ...formData,
        });
    };

    return (
        <Modal open={open} hide={hide} size="3xl">
            <ModalHeader
                title={
                    id
                        ? "Update PO received details"
                        : "Create PO received form"
                }
                subtitle={`Input PO received details`}
                hide={hide}
            />
            <ModalBody className={`py-4 !bg-foreground`}>
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 pb-4">
                    <TextInputField
                        label={`Enter Purchase Order Number`}
                        className="col-span-2"
                        inputClassName="bg-"
                        placeholder={"Enter purchase order number"}
                        error={errors?.purchase_order?.message}
                        {...register("purchase_order", {
                            required: "This field is required",
                        })}
                    />
                    {/*   <TextInputField
                        label={`Receiving report number`}
                        className="col-span-2"
                        inputClassName="bg-foreground"
                        placeholder={"Enter receiving report number"}
                        error={errors?.purchase_order?.message}
                        {...register("purchase_order", {
                            required: "This field is required",
                        })}
                    /> */}
                    <TextInputField
                        label={`Enter Project Name`}
                        className="col-span-2"
                        inputClassName="bg-"
                        placeholder={"Enter project name"}
                        error={errors?.project_name?.message}
                        {...register("project_name", {
                            required: "This field is required",
                        })}
                    />
                    {/*   <TextInputField
                        type="date"
                        label={`Date receive to warehouse`}
                        className="col-span-2"
                        inputClassName="bg-foreground"
                        placeholder={"Enter date receive to warehouse"}
                        error={errors?.date?.message}
                        {...register("date", {
                            required: "This field is required",
                        })}
                    /> */}

                    <Controller
                        render={({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState: { invalid, isTouched, isDirty, error },
                        }) => (
                            <ReactSelectInputField
                                label="PO Status"
                                className="col-span-1"
                                inputClassName="!bg-"
                                ref={ref}
                                value={value}
                                onChange={onChange} // send value to hook form
                                onBlur={onBlur} // notify when input is touched
                                error={error?.message}
                                placeholder="Status"
                                options={[
                                    {
                                        label: "Pending",
                                        value: "pending",
                                    },
                                    {
                                        label: "Approved",
                                        value: "approved",
                                    },
                                    {
                                        label: "Completed",
                                        value: "completed",
                                    },
                                ]}
                            />
                        )}
                        name="category"
                        control={control}
                        rules={{
                            required: {
                                value: false,
                                message: "This field is required",
                            },
                        }}
                    />
                </div>
                <div className="w-full -mb-[70px]">
                    <Table
                        columns={columns}
                        pagination={true}
                        loading={dataLoading}
                        data={list}
                        rowHighlight={true}
                    />
                </div>
            </ModalBody>
            <ModalFooter className={`flex items-center justify-end`}>
                <Button
                    type="accent"
                    onClick={handleSubmit(submitForm)}
                    loading={loading}
                >
                    <FlatIcon icon="rs-disk mr-2" />
                    Save recieved purchase order
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default forwardRef(ReceivingFormModal);
