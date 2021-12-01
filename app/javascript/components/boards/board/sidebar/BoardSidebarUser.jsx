import React, {useState} from 'react';
import UserCircle from "../../../users/UserCircle";
import {Popover} from "antd";
import {removeUserFromBoard} from "../../board_actions";

const BoardSidebarUser = (props) => {
    const {
        user,
        isOwner,
        boardId
    } = props

    const [visible, setVisible] = useState(false)

    const handleVisibleChange = visible => {
        setVisible(visible)
    };

    const removeUser = () => {
        removeUserFromBoard(boardId, user.id).then(() => {
            location.reload()
        })
    }

    const content = (
        <div>
            <button onClick={removeUser} className={'btn btn-sm btn-outline-primary'}>Remove from board</button>
        </div>
    )

    return (
        <Popover
            content={content}
            trigger={"click"}
            placement={'bottom'}
            visible={isOwner && window.current_user.id !== user.id ? visible : false}
            onVisibleChange={handleVisibleChange}
            zIndex={1500}
        >
            <UserCircle onclick={() => {setVisible(true)}} key={user.id} className={'me-2'} user={user} />
        </Popover>
    );
};

export default BoardSidebarUser;
