import ModalBody from "@/src/components/modals/components/ModalBody";
import ModalFooter from "@/src/components/modals/components/ModalFooter";
import ModalHeader from "@/src/components/modals/components/ModalHeader";
import Modal from "@/src/components/modals/Modal";
import { forwardRef, useImperativeHandle, useState } from "react";

const ModalTemplate = (props, ref) => {
    const [open, setOpen] = useState(false);
    useImperativeHandle(ref, () => ({
        show: show,
        hide: hide,
    }));

    const show = (data) => {
        setOpen(true);
    };
    const hide = () => {
        setOpen(false);
    };

    return (
        <Modal open={open} hide={hide} size="md">
            <ModalHeader
                title={"titlehere"}
                subtitle={`subtitle`}
                hide={hide}
            />
            <ModalBody className={`py-4`}></ModalBody>
            <ModalFooter
                className={`flex items-center justify-end`}
            ></ModalFooter>
        </Modal>
    );
};

export default forwardRef(ModalTemplate);
