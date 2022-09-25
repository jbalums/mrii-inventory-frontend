import FlatIcon from "../FlatIcon";

const PageHeader = (props) => {
    const { title, children } = props;
    return (
        <div className="flex min-h-[76px] items-start lg:items-center gap-y-2 lg:gap-y-0 border-b p-4 lg:p-6 bg-foreground flex-col lg:flex-row">
            {title ? (
                <div className="flex items-center">
                    <div className="bg-background h-[46px] w-[46px] rounded-full flex items-center justify-center">
                        <FlatIcon icon="rr-arrow-left" />
                    </div>
                    <h1 className="text-xl font-bold">{title}</h1>
                </div>
            ) : (
                ""
            )}
            {children}
        </div>
    );
};

export default PageHeader;
