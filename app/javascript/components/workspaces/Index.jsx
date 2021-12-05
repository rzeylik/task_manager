import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {Container} from "@mui/material";
import WorkspaceCard from "./WorkspaceCard";
import BoardIndexCard from "../boards/board/BoardIndexCard";
import NewWorkspace from "./NewWorkspace";

const WorkspacesIndex = (props) => {
    const [ownWorkspaces, setOwnWorkspaces] = useState([])
    const [invitedWorkspaces, setInvitedWorkspaces] = useState([])
    const [boards, setBoards] = useState([])

    useEffect(() => {
        fetch('/api/workspaces').then(response => response.json()).then(data => { setOwnWorkspaces(data.own_workspaces); setInvitedWorkspaces(data.invited_workspaces); setBoards(data.boards)})
    }, [])

    return (
        <Container sx={{paddingTop: '20px', paddingBottom: '20px', flexGrow: '1'}}>
            { ownWorkspaces.length !== 0 &&
                <div className={'mb-3'}>
                    <h4>Your workspaces</h4>
                    { ownWorkspaces.map((w, index) => (
                        <WorkspaceCard key={index} workspace={w} owner={true} setOwnWorkspaces={setOwnWorkspaces} />
                    ))}
                </div>
            }

            { invitedWorkspaces.length !== 0 &&
                <div className={'mb-3'}>
                    <h4>Invited workspaces</h4>
                    { invitedWorkspaces.map((w, index) => (
                        <WorkspaceCard key={index} workspace={w} />
                    ))}
                </div>
            }

            { boards.length !== 0 &&
                <div className={'mb-3'}>
                    <h4>Invited boards</h4>
                    { boards.map((b, index) => (
                        <BoardIndexCard key={index} board={b} />
                    ))}
                </div>
            }

            <NewWorkspace setOwnWorkspaces={setOwnWorkspaces} />
        </Container>
    )
}

WorkspacesIndex.propTypes = {

};
export default WorkspacesIndex
