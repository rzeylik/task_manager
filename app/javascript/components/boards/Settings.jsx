import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import UsersTable from "./users/UsersTable";
import AddUser from "./users/AddUser";

const BoardSettings = () => {
    const { id } = useParams()
    const [board, setBoard] = useState({ users: { board_users: [], workspace_users: []}})

    useEffect(() => {
        fetch(`/api/boards/${id}/settings`).then(response => response.json()).then(data => setBoard(data))
    }, [])

    return (
        <div className={'container py-3 flex-grow-1'}>
            <h5 className="">
                <Link className={'cursor-pointer color-inherit'} to={`/boards/${board.id}`}>{board.name}</Link> - Settings
            </h5>

            <UsersTable boardId={id} users={board.users} />

            <AddUser boardId={id} />
        </div>
    );
};

export default BoardSettings;
