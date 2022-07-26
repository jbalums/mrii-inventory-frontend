import React from 'react';

const AppLayout = (props) => {
    return (
        <div className={`antialiased`}>
            { props.children}
        </div>
    );
};

export default AppLayout;