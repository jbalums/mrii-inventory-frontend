import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import ReactSelectInputField from "@/src/components/forms/ReactSelectInputField";
import TextInputField from "@/src/components/forms/TextInputField";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import Modal from "@/src/components/modals/Modal";
import Table from "@/src/components/table/Table";
import useSelection from "@/src/helpers/useSection";
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { useSuppliersHook } from "../../suppliers/hooks/useSuppliersHook";
import useReceiving from "../hooks/useReceivingHook";

const QtyInput = ({ updateQty }) => {
    return (
        <input
            type="text"
            className="rounded-md p-2 w-[88px] text-center bg-foreground"
            placeholder="Qty"
            onBlur={(e) => {
                updateQty(e.target.value);
            }}
        />
    );
};
const ReceivingFormModal = (props, ref) => {
    const { add_items_received } = props;
    const {
        register,
        handleSubmit,
        setError,
        watch,
        setValue,
        clearErrors,
        reset,
        control,
        formState: { errors },
    } = useForm();
    const { saveReceiving } = useReceiving();
    const { getSuppliers } = useSuppliersHook();
    const { selectedItems, setSelectedItems, isSelected, selectItem } =
        useSelection();
    const [suppliers, setSuppliers] = useState([]);
    const [list, setList] = useState([]);

    const [data, setData] = useState(null);

    useEffect(() => {
        getSuppliers().then((res) => {
            setSuppliers(res.data.data);
        });
    }, []);

    /* useEffect(() => {
		setList(data?.data || []);
	}, [data?.data]); */

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
                header: "Quantity",
                accessorKey: "quantity",
                className: "!text-center",
                cell: ({ row, getValue }) => {
                    const item = row.original;
                    return (
                        <QtyInput
                            updateQty={(qty) => {
                                item.quantity = qty;
                            }}
                        />
                    );
                },
            },
            {
                header: "Unit of measurement",
                accessorKey: "unit_measurement",
                className: "!text-center",
            },
            {
                header: "Remove",
                id: "action",
                className: "!text-center",
                cell: ({ row, getValue }) => {
                    const item = row.original;
                    return (
                        <>
                            <div
                                className="flex items-center justify-center text-center cursor-pointer"
                                onClick={() => {
                                    setList((list) =>
                                        list.filter((x) => x.id != item?.id)
                                    );
                                    setSelectedItems((list) =>
                                        list.filter((x) => x.id != item?.id)
                                    );
                                }}
                            >
                                <FlatIcon
                                    icon="rr-trash"
                                    className={`-mb-1 text-danger duration-200 text-lg`}
                                />
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
        setData(data);
        setValue("purchase_order", data?.purchase_order);
        if (data?.details?.length > 0) {
            setList(
                data?.details.map((item) => ({
                    ...item?.details,
                    ...item,
                }))
            );
        }
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
            // updateInList(data);
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
        <Modal open={open} hide={hide} size="2xl">
            <ModalHeader
                title={`Receive`}
                subtitle={`Receive order from supplier`}
                hide={hide}
            />
            <ModalBody className={`py-4 min-h-[448px]`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
                    <div className="col-span-4 gap-4 flex flex-col">
                        <div className="bg-foreground rounded-lg p-4 gap-4 flex flex-col">
                            <h4 className="text-base font-bold">
                                Receiving form
                            </h4>
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

                            <Controller
                                render={({
                                    field: {
                                        onChange,
                                        onBlur,
                                        value,
                                        name,
                                        ref,
                                    },
                                    fieldState: {
                                        invalid,
                                        isTouched,
                                        isDirty,
                                        error,
                                    },
                                }) => (
                                    <ReactSelectInputField
                                        label="Select Supplier"
                                        className="col-span-2"
                                        inputClassName="!bg-"
                                        ref={ref}
                                        value={value}
                                        onChange={onChange} // send value to hook form
                                        onBlur={onBlur} // notify when input is touched
                                        error={error?.message}
                                        placeholder="Select supplier"
                                        options={suppliers.map((supplier) => ({
                                            label:
                                                supplier?.name +
                                                ` - [${supplier?.address}]`,
                                            value: supplier?.id,
                                        }))}
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
                    </div>
                    <div className="col-span-8 w-full gap-4 flex flex-col h-full">
                        <div className="bg-foreground rounded-lg p-4 gap-y-4 flex flex-col h-full">
                            <div className="flex items-center">
                                <h4 className="text-lg font-bold mr-auto">
                                    List of received items
                                </h4>
                                <Button
                                    onClick={() => {
                                        add_items_received.current.show({
                                            callback: (items) => {
                                                setList(items);
                                                setSelectedItems(items);
                                            },
                                            items: list,
                                        });
                                    }}
                                >
                                    Add items
                                </Button>
                            </div>
                            <Table
                                columns={columns}
                                // loading={dataLoading}
                                data={list}
                                emptyMessage={"No items added"}
                            />
                        </div>
                    </div>
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
