import React from 'react';
import UserCircle from "../../../users/UserCircle";

const ToolbarUsers = ({users}) => {
    return (
        <div className={'d-flex align-items-center'}>
            { users?.all_users?.map(user => <UserCircle size={26} key={user.id} className={'me-1 toolbar-color-reverse toolbar-bg-half-opacity'} user={user} />) }
        </div>
    );
};

export default ToolbarUsers;
