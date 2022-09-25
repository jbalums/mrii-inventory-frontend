import axios from "@/libs/axios";
import { toast } from "react-toastify";
export const useBranchLocation = () => {
    /* 
         FIELDS
            name
        */
    const getBranches = () => {
        return axios.get("/management/branches");
    };
    const saveItemBranch = async ({
        setErrors,
        setLoading,
        callback,
        ...props
    }) => {
        if (props?.id) {
            axios
                .post(`/management/branches/${props?.id}`, {
                    ...props,
                    _method: "PATCH",
                })
                .then((res) => {
                    console.log("res", res);
                    toast.success("Item branch details updated successfully!");
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
                .post("/management/branches", { ...props })
                .then((res) => {
                    console.log("res", res);
                    toast.success("Item branch added successfully!");
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

    const deleteItemBranch = (id) => {
        return axios.post(`/management/branches/${id}`, {
            _method: "DELETE",
        });
    };
    return {
        getBranches,
        saveItemBranch,
        deleteItemBranch,
    };
};
