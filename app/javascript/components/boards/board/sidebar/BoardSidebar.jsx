import React, {useState} from 'react';
import PropTypes from "prop-types"
import BoardSidebarBackground from "./BoardSidebarBackground";
import BoardSidebarFilters from "./BoardSidebarFilters";

const BoardSidebar = (props) => {
    const {
        board,
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
                <BoardSidebarBackground className={'mb-3'} boardId={board.id} image={board.image} imageMode={board.image_mode} />
                <BoardSidebarFilters className={'mb-3'} users={users.all_users} lanes={lanes} setLanes={setLanes} />
                {/*{ permissions.is_admin && <BoardDestroy boardId={boardId} /> }*/}
            </div>
        </div>
    );
};


BoardSidebar.propTypes = {}

export default BoardSidebar;
