import React, {useState} from 'react';
import {Popover} from "antd";
import UserCircle from "../users/UserCircle";
import {removeUserFromWorkspace} from "./workspace_actions";

const WorkspaceUser = (props) => {
    const {
        user,
        workspaceId
    } = props

    const [visible, setVisible] = useState(false)

    const handleVisibleChange = visible => {
        setVisible(visible)
    };

    const removeUser = () => {
        removeUserFromWorkspace(workspaceId, user.id).then(() => {
            location.reload()
        })
    }

    const content = (
        <div>
            <button onClick={removeUser} className={'btn btn-sm btn-outline-primary'}>Remove from workspace</button>
        </div>
    )

    return (
        <Popover
            content={content}
            trigger={"click"}
            placement={'bottom'}
            visible={window.current_user.id !== user.id ? visible : false}
            onVisibleChange={handleVisibleChange}
            zIndex={1500}
        >
            <UserCircle onclick={() => {setVisible(true)}} key={user.id} className={'me-2'} user={user} />
        </Popover>
    );
};

export default WorkspaceUser;
