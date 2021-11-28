import React from 'react';
import PropTypes from "prop-types"

const WorkspaceCard = (props) => {
    const {
        board
    } = props

    return (
        <>
            <a href={`/boards/${board.id}`} className={'board-index-card'}>
                <h4>{board.name}</h4>
            </a>
        </>
    );
};


WorkspaceCard.propTypes = {
    board: PropTypes.object
}

export default WorkspaceCard;
