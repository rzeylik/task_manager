import React, {createContext, useContext, useEffect, useLayoutEffect, useState} from "react"
import PropTypes from "prop-types"
import Board from 'react-trello'
import {useParams} from "react-router-dom";
import {
    handleCardDragEnd,
    handleLaneDragEnd,
    onCardAdd,
    onCardDelete,
    onDataChange,
    onLaneAdd,
    onLaneDelete,
    onLaneUpdate
} from "./board_actions";
import BoardCard from "./board/card/BoardCard";
import NewCardForm from "./board/card/NewCardForm";
import NewLaneForm from "./board/lane/NewLaneForm";
import BoardSidebar from "./board/sidebar/BoardSidebar";
import LaneHeaderComponent from "./board/lane/LaneHeader";
import FastAverageColor from "fast-average-color";
import BoardToolbar from "./board/toolbar/BoardToolbar";

const fac = new FastAverageColor()

const BoardsShow = (props) => {
    let eventBus = undefined
    const setEventBus = (handle) => { eventBus = handle }

    const [socketId, setSocketId] = useState(null)
    const [users, setUsers] = useState([])
    const [toolbarColor, setToolbarColor] = useState('#000')
    const [workspace, setWorkspace] = useState({ id: null, name: ''})
    const [board, setBoard] = useState({ id: null, name: '', image: null, image_mode: 'auto', owner_id: null })
    const [lanes, setLanes] = useState({lanes: []})
    const [permissions, setPermissions] = useState({ can_edit_tasks: false, can_edit_lists: false, can_move_tasks: false, can_move_lists: false, is_admin: false})
    let { id } = useParams();

    useEffect(() => {
        fetch(`/api/boards/${id}`).then(response => {
            if (response.ok) { return response.json();
            } else { window.location.href = "/"; }
        }).then(board => {
            setBoard({ id: board.id, name: board.name, image: board.image, image_mode: board.image_mode, owner_id: board.owner_id })
            setLanes({lanes: board.lanes})
            setWorkspace(board.workspace)
            setUsers(board.users)
        })

        fetch(`/api/boards/${id}/permissions`).then(response => {
            if (response.ok) { return response.json();
            } else { window.location.href = "/"; }
        }).then(permissions => { setPermissions(permissions) })

        const pusher = window.pusher

        pusher.connection.bind("connected", () => {
            setSocketId(pusher.connection.socket_id);
        });

        const channel = pusher.subscribe(`board-channel-${id}`);
        channel.bind('create-card-event', (event) => {
            eventBus.publish({type: 'ADD_CARD', laneId: event.lane_id, card: {id: event.id, title: event.title}})
        });
        channel.bind('move-event', (event) => {
            eventBus.publish({type: 'MOVE_CARD', fromLaneId: event.from_lane_id, toLaneId: event.to_lane_id, cardId: event.card_id, index: event.index})
        });
        channel.bind('delete-card-event', (event) => {
            eventBus.publish({type: 'REMOVE_CARD', laneId: event.lane_id, cardId: event.card_id})
        });
        channel.bind('lanes-event', (event) => {
            setLanes({ lanes: event })
        })

        return () => {
            window.pusher.unsubscribe(`board-channel-${id}`)
        }
    }, [])

    useEffect(() => {
        $('.site').css('background-image', `url('${board.image}')`).css('background-size', board.image_mode)
        if (board.image) {
            fac.getColorAsync(board.image).then(color => {
                setToolbarColor(color.isDark ? '#fff': '#000')
            })
        }
    }, [board])

    useEffect(() => {
        return () => { $('.site').css('background-image', '').css('background-size', '') };
    }, []);

    const components = {
        Card: BoardCard,
        NewCardForm: NewCardForm,
        NewLaneForm: NewLaneForm,
        LaneHeader: LaneHeaderComponent
    }

    return (
        <div className={'d-flex position-relative overflow-x-hidden'}>
            <div className="board-container d-flex flex-column flex-grow-1 overflow-x-auto">
                <BoardToolbar workspace={workspace} board={board} users={users} color={toolbarColor} permissions={permissions} />
                <Board data={lanes}
                       eventBusHandle={setEventBus}
                       components={components}
                       editable={permissions.can_edit_tasks}
                       canAddLanes={permissions.can_edit_lists}
                       editLaneTitle={permissions.can_edit_lists}
                       draggable={true}
                       laneDraggable={permissions.can_move_lists}
                       cardDraggable={permissions.can_move_tasks}
                       onCardAdd={onCardAdd(id, socketId)}
                       onCardDelete={onCardDelete(id, socketId)}
                       onLaneAdd={onLaneAdd(id, socketId)}
                       onLaneDelete={onLaneDelete(id, socketId)}
                       onLaneUpdate={onLaneUpdate(id, socketId)}
                       handleLaneDragEnd={handleLaneDragEnd(id, socketId)}
                       handleDragEnd={handleCardDragEnd(id, socketId)}
                       onDataChange={onDataChange()}

                />
            </div>
            <BoardSidebar board={board} users={users} permissions={permissions} lanes={lanes} setLanes={setLanes} />
        </div>
    )
}

BoardsShow.propTypes = {

};
export default BoardsShow
