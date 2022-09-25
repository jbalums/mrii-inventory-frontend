import Button from "@/src/components/Button";
import FlatIcon from "@/src/components/FlatIcon";
import TextInputField from "@/src/components/forms/TextInputField";
import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import Modal from "@/src/components/modals/Modal";
import { useItemCategories } from "@/src/features/item-categories/hooks/useItemCategoriesHook";
import { useBranchLocation } from "@/src/features/locations/hooks/useBranchLocationHook";
import useFormHelper from "@/src/helpers/useFormHelper";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import useInventory from "../hooks/useInventory";

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
    const { setErrors } = useFormHelper();
    const { saveProduct } = useInventory();
    const { getCategories } = useItemCategories();
    const { getBranches } = useBranchLocation();

    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(false);

    useImperativeHandle(ref, () => ({
        show: show,
        hide: hide,
    }));

    const show = (data) => {
        getBranches().then((res) => {
            setLocations(res.data.data);
        });
        getCategories().then((res) => {
            setCategories(res.data.data);
        });
        if (data) {
            reset({
                ...data,
            });
            if (data.id) {
                setId(data?.id);
            }
        } else {
            reset({
                name: "",
                code: "",
                description: "",
                unit_value: "",
                unit_measurement: "",
                stock_low_level: "",
                reorder_point: "",
                price: "",
            });
            setId(null);
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
        saveProduct({
            setLoading,
            setError,
            callback: successCallBack,
            ...formData,
        });
    };

    return (
        <Modal open={open} hide={hide} size="md">
            <ModalHeader
                title={id ? "Register product" : "Register product"}
                subtitle={`Register your new product`}
                hide={hide}
            />
            <ModalBody className={`py-4`}>
                <div className="flex flex-col gap-4">
                    <TextInputField
                        label={`Product code`}
                        className="col-span-2"
                        inputClassName="bg-foreground"
                        placeholder={"Enter product code"}
                        error={errors?.code?.message}
                        {...register("code", {
                            required: "This field is required",
                        })}
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
                    Save product
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default forwardRef(ReceivingFormModal);
