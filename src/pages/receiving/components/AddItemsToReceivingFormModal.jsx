import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import TextInputField from "@/src/components/forms/TextInputField";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import Modal from "@/src/components/modals/Modal";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import useReceiving from "../hooks/useReceivingHook";

const AddItemsToReceivingFormModal = (props, ref) => {
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
        /*  setLoading(true);
        let formData = {
            ...data,
        };
        saveReceiving({
            setLoading,
            setError,
            callback: successCallBack,
            ...formData,
        }); */
    };

    return (
        <Modal open={open} hide={hide} size="lg">
            <ModalHeader title={"Select items to add"} hide={hide} />
            <ModalBody className={`py-4`}>
                <div className="flex flex-col">
                    <div className="flex items-center ">
                        <p>
                            Please select the item you receive from the supplier
                            and adjust them afterward.
                        </p>

                        <TextInputField
                            className="lg:w-[320px]"
                            icon={
                                <FlatIcon
                                    icon="rr-search"
                                    className="text-sm"
                                />
                            }
                            placeholder="Search Purchase order"
                        />
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
                    Save
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default forwardRef(AddItemsToReceivingFormModal);
