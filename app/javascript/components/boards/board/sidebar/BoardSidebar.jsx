import React, {useState} from 'react';
import PropTypes from "prop-types"
import BoardSidebarBackground from "./BoardSidebarBackground";
import BoardSidebarUsers from "./BoardSidebarUsers";
import BoardSidebarAddUser from "./BoardSidebarAddUser";
import BoardSidebarFilter from "./BoardSidebarFilter";
import BoardDestroy from "./BoardDestroy";

const BoardSidebar = (props) => {
    const {
        boardId,
        users,
        permissions,
        lanes,
        setLanes
    } = props

    const [open, setOpen] = useState(false)

    const changeState = () => {
        setOpen(!open)
    }

    return (
        <div className={`board-sidebar ${open ? 'open' : 'closed'}`}>
            <div className={'d-flex mb-3'} style={{cursor: 'pointer'}} onClick={changeState}><i className={`fas fa-2x fa-angle-double-${open ? 'right' : 'left'}`} /></div>

            <div className={`${open ? '' : 'd-none'}`}>
                {/*{ permissions.is_admin && <BoardSidebarAddUser className={'mb-3'} boardId={boardId} /> }*/}
                <BoardSidebarFilter className={'mb-3'} users={users.all_users} lanes={lanes} setLanes={setLanes} />
                <BoardSidebarBackground className={'mb-4'} boardId={boardId} />
                { permissions.is_admin && <BoardDestroy boardId={boardId} /> }
            </div>
        </div>
    );
};


BoardSidebar.propTypes = {}

export default BoardSidebar;
