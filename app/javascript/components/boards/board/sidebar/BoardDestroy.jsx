import React from 'react';
import {destroyBoard} from "../../board_actions";

const BoardDestroy = (props) => {
    const {
        boardId,
        className
    } = props

    const deleteBoard = () => {
        if (window.confirm('Are you sure?')) {
            destroyBoard(boardId).then(() => {
                location.href = '/'
            })
        }
    }

    return (
        <div className={className}>
            <button onClick={deleteBoard} className={'btn btn-sm btn-outline-danger w-100'}>Delete board</button>
        </div>
    );
};

export default BoardDestroy;
