import axios from "@/libs/axios";
import useFormHelper from "@/src/helpers/useFormHelper";
import { toast } from "react-toastify";

const useReceiving = () => {
    const { setErrors } = useFormHelper();
    const saveReceiving = ({ setLoading, setError, callback, ...formData }) => {
        setLoading(true);
        axios
            .post(`/inventory/receiving`, { ...formData })
            .then((res) => {
                console.log("res", res);
                toast.success("New received PO created successfully!");
                callback ? callback(res.data.data) : "";
            })
            .catch((error) => {
                console.log("errror", error);
                toast.error(
                    `Failed to submit the form. Please check your inputs!`
                );
                if (error.response.status !== 422) throw error;
                setErrors(error.response.data.errors, setError);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return { saveReceiving };
};

export default useReceiving;
