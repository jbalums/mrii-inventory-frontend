import axios from "@/libs/axios";
import { toast } from "react-toastify";
export const useSuppliersHook = () => {
    /* 
         FIELDS
            name
        */
    const getSuppliers = () => {
        return axios.get("/management/suppliers");
    };
    const saveSupplier = async ({
        setErrors,
        setLoading,
        callback,
        ...props
    }) => {
        if (props?.id) {
            axios
                .post(`/management/suppliers/${props?.id}`, {
                    ...props,
                    _method: "PATCH",
                })
                .then((res) => {
                    console.log("res", res);
                    toast.success("Supplier details updated successfully!");
                    callback ? callback(res.data.data) : "";
                })
                .catch((error) => {
                    toast.error(
                        `Failed to submit the form. Please check your inputs!`
                    );
                    if (error.response.status !== 422) throw error;
                    setErrors(error.response.data.errors);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            axios
                .post("/management/suppliers", { ...props })
                .then((res) => {
                    console.log("res", res);
                    toast.success("Supplier added successfully!");
                    callback ? callback(res.data.data) : "";
                })
                .catch((error) => {
                    toast.error(
                        `Failed to submit the form. Please check your inputs!`
                    );
                    if (error.response.status !== 422) throw error;
                    setErrors(error.response.data.errors);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const deleteSupplier = (id) => {
        return axios.post(`/management/suppliers/${id}`, {
            _method: "DELETE",
        });
    };
    return {
        getSuppliers,
        saveSupplier,
        deleteSupplier,
    };
};
