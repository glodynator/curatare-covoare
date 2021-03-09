import React from 'react';

const AdminLayout = (props) => {
    return (
        <div>
            <div>Admin</div>
            {props.children}
        </div>
    );
};

export default AdminLayout;