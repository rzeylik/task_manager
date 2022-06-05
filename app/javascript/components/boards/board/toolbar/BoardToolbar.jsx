import React from 'react';
import BoardChat from "./BoardChat";

const BoardToolbar = ({color, ...props}) => {
    return (
        <div className={`board-toolbar py-1 px-3 d-flex ${color === '#fff' ? 'board-toolbar-white' : 'board-toolbar-black'}`}>
            <div className="flex-grow-1">
                Toolbar here
            </div>
            <div className="">
                <BoardChat color={color} />
            </div>
        </div>
    );
};

export default BoardToolbar;
