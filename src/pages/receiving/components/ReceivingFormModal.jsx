import TextInputField from "@/src/components/forms/TextInputField";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import Modal from "@/src/components/modals/Modal";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import useReceiving from "../hooks/useReceivingHook";

const ReceivingFormModal = (props, ref) => {
    const { addToList, updateInList } = props;
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
            addToList(data);
        }
        hide();
    };

    const submitForm = (data) => {
        setLoading(true);
        let formData = {
            ...data,
        };
        saveReceiving({
            setLoading,
            setError,
            callback: successCallBack,
            ...formData,
        });
    };

    return (
        <Modal open={open} hide={hide} size="md">
            <ModalHeader
                title={
                    id
                        ? "Update PO received details"
                        : "Create PO received form"
                }
                subtitle={`Input PO received details`}
                hide={hide}
            />
            <ModalBody className={`py-4`}>
                <div className="flex flex-col gap-4">
                    <TextInputField
                        label={`Receiving report number`}
                        className="col-span-2"
                        inputClassName="bg-foreground"
                        placeholder={"Enter receiving report number"}
                        error={errors?.purchase_order?.message}
                        {...register("purchase_order", {
                            required: "This field is required",
                        })}
                    />
                    <TextInputField
                        label={`Project Name`}
                        className="col-span-2"
                        inputClassName="bg-foreground"
                        placeholder={"Enter project Name"}
                        error={errors?.project_name?.message}
                        {...register("project_name", {
                            required: "This field is required",
                        })}
                    />
                    <TextInputField
                        label={`Purchase order number`}
                        className="col-span-2"
                        inputClassName="bg-foreground"
                        placeholder={"Enter purchase order number"}
                        error={errors?.project_name?.message}
                        {...register("project_name", {
                            required: "This field is required",
                        })}
                    />
                    <TextInputField
                        type="date"
                        label={`Date receive to warehouse`}
                        className="col-span-2"
                        inputClassName="bg-foreground"
                        placeholder={"Enter date receive to warehouse"}
                        error={errors?.date?.message}
                        {...register("date", {
                            required: "This field is required",
                        })}
                    />
                </div>
            </ModalBody>
            <ModalFooter className={`flex items-center justify-end`}>
                {/* <Button
                    type="accent"
                    onClick={handleSubmit(submitForm)}
                    loading={loading}
                >
                    <FlatIcon icon="rs-disk mr-2" />
                    Save product
                </Button> */}
            </ModalFooter>
        </Modal>
    );
};

export default forwardRef(ReceivingFormModal);
