import React from 'react';
import PropTypes from "prop-types"

const BoardIndexCard = (props) => {
    const {
        board
    } = props

    return (
        <>
            <a href={`/boards/${board.id}`} className={'board-index-card'} style={{backgroundImage: `url('${board.image}')`}}>
                <h4>{board.name}</h4>
            </a>
        </>
    );
};


BoardIndexCard.propTypes = {
    board: PropTypes.object
}

export default BoardIndexCard;
