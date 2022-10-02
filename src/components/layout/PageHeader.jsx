const PageHeader = (props) => {
    const { title, children } = props;
    return (
        <div className="flex min-h-[76px] items-start justify-center lg:justify-start lg:items-center gap-y-2 lg:gap-y-0 border-b px-4 pb-4 lg:pb-0 lg:px-6 bg-foreground flex-col lg:flex-row">
            {title ? <h1 className="text-xl font-bold">{title}</h1> : ""}
            {children ? children : ""}
        </div>
    );
};

export default PageHeader;
