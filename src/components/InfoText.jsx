const Infotext = ({ label, text }) => {
    return (
        <div className="flex flex-col">
            <label className="text-xs text-placeholder font-regular mb-1">
                {label}
            </label>
            <span className="text-sm text-dark font-bold">
                {text || <>&nbsp;</>}
            </span>
        </div>
    );
};

export default Infotext;
