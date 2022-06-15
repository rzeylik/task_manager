import React from 'react';
import BoardChat from "./BoardChat";
import ToolbarUsers from "./ToolbarUsers";
import {Link} from "react-router-dom";

const BoardToolbar = ({workspace, board, users, permissions, color, ...props}) => {
    return (
        <div className={`board-toolbar py-1 px-3 d-flex ${color === '#fff' ? 'board-toolbar-white' : 'board-toolbar-black'}`}>
            <div className="flex-grow-1 d-flex align-items-center">
                <div className="">{workspace.name}</div>
                <div className="splitter mx-2">
                    <i className="fas fa-angle-right"></i>
                </div>
                <div className="">{board.name}</div>
                <div className="splitter mx-2">|</div>
                <ToolbarUsers users={users} permissions={permissions} />
                { permissions.is_admin && (
                    <Link className={'text-20 ms-1 d-flex align-items-center color-inherit'} to={'./settings'}>
                        <i title={'Configure users'} className={'fa fa-cog text-20 toolbar'}></i>
                    </Link>
                )}
            </div>
            <div className="">
                <BoardChat color={color} />
            </div>
        </div>
    );
};

export default BoardToolbar;
