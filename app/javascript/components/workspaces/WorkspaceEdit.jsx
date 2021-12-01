import React, {useEffect, useState} from 'react';
import {Container} from "@mui/material";
import {useParams} from "react-router-dom";
import UserCircle from "../users/UserCircle";
import WorkspaceUser from "./WorkspaceUser";
import WorkspaceAddUser from "./WorkspaceAddUser";
import BoardIndexCard from "../boards/board/BoardIndexCard";
import NewBoard from "./NewBoard";

const WorkspaceEdit = () => {
    let { id } = useParams();

    const [workspace, setWorkspace] = useState({ users: [], boards: [] })

    useEffect(() => {
        fetch(`/api/workspaces/${id}/edit`).then(response => response.json()).then(data => { setWorkspace(data) })

        const channel = window.pusher.subscribe(`workspace-channel-${id}`);
        channel.bind('workspace-update', (workspace) => {
            setWorkspace(workspace)
        })

        return () => {
            window.pusher.unsubscribe(`workspace-channel-${id}`)
        }
    }, [])

    return (
        <Container sx={{paddingTop: '20px', paddingBottom: '20px', flexGrow: '1'}}>
            <h3>{workspace.name}</h3>

            <div className="mb-3">
                <h4>Boards</h4>
                <div className="d-flex flex-wrap">
                    {workspace?.boards?.map((board) => <BoardIndexCard key={board.id} board={board} />)}
                    <NewBoard workspace={workspace} />
                </div>
            </div>

            <div className="mb-3">
                <h4>Users</h4>

                <div className="d-flex mb-3">
                    { workspace.users.map((user) => <WorkspaceUser key={user.id} workspaceId={workspace.id} user={user} />) }
                </div>

                <div className="">
                    <WorkspaceAddUser workspaceId={workspace.id} />
                </div>

            </div>

        </Container>
    );
};

export default WorkspaceEdit;
