export const getErrors = (errors, setError) => {
    if (
        (errors !== undefined) &&
        errors === Object(errors)
    ) {
        for (let key in errors) {
            if (errors.hasOwnProperty(key)) {
                setError(key, {
                    type: "manual",
                    message: errors[key],
                });
                console.log(key, errors[key]);
            }
        }
    }
}