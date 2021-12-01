import React from 'react';
import PropTypes from "prop-types"
import BoardIndexCard from "../boards/board/BoardIndexCard";
import NewBoard from "./NewBoard";

const WorkspaceCard = (props) => {
    const {
        setOwnWorkspaces,
        workspace,
        owner
    } = props

    return (
        <div className={'mb-4'}>
            <div className="d-flex justify-content-between align-items-center">
                <h5 className={'mb-0'}>{workspace.name}</h5>
                { owner && <a href={`/workspaces/${workspace.id}/edit`}><i style={{cursor: 'pointer'}} className="fas fa-lg fa-cog" /></a> }
            </div>
            <hr/>
            <div className="d-flex flex-wrap">
                {workspace?.boards?.map((board) => <BoardIndexCard key={board.id} board={board} />)}
                { owner &&
                    <NewBoard setOwnWorkspaces={setOwnWorkspaces} workspace={workspace} />
                }
            </div>

        </div>
    );
};


WorkspaceCard.propTypes = {
    board: PropTypes.object,
    owner: PropTypes.bool,
    setOwnWorkspaces: PropTypes.func
}

WorkspaceCard.defaultProps = {
    owner: false,
    setOwnWorkspaces: () => {}
}

export default WorkspaceCard;
