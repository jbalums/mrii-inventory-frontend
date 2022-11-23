import axios from "@/libs/axios";
import useFormHelper from "@/src/helpers/useFormHelper";
import { toast } from "react-toastify";

const useInventory = () => {
    const { setErrors } = useFormHelper();
    const getLocations = () => {
        return axios.get("/management/users");
    };
    const saveProduct = ({ setLoading, setError, callback, id, ...formData }) => {
        setLoading(true);

        axios
            .post(`/management/products${id ? `/${id}`:""}`, { ...formData })
            .then((res) => {
                console.log("res", res);
                toast.success("New product created successfully!");
                callback ? callback(res.data.data) : "";
            })
            .catch((error) => {
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
    return { getLocations, saveProduct };
};

export default useInventory;
