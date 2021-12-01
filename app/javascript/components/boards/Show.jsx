import React, {createContext, useContext, useEffect, useState} from "react"
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

const BoardsShow = (props) => {
    let eventBus = undefined
    const setEventBus = (handle) => {
        eventBus = handle
    }

    const [socketId, setSocketId] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
    const [users, setUsers] = useState([])
    const [isOwner, setIsOwner] = useState(false)
    const [lanes, setLanes] = useState({
        lanes: [
            {
                id: 'lane1',
                title: 'Planned Tasks',
                label: '2/2',
                cards: [
                    {
                        id: '123',
                        title: 'Title'
                    }
                ]
            },
            {
                id: 'lane2',
                title: 'Completed',
                label: '0/0',
                cards: []
            }
        ]
    })
    let { id } = useParams();

    useEffect(() => {
        fetch(`/api/boards/${id}`).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                window.location.href = "/";
            }
        }).then(board => {
            setImageUrl(board.image)
            setLanes({lanes: board.lanes})
            setUsers(board.users)
            setIsOwner(board.owner_id === window.current_user.id)
        })

        const pusher = window.pusher

        pusher.connection.bind("connected", () => {
            setSocketId(pusher.connection.socket_id);
        });

        const channel = pusher.subscribe(`board-channel-${id}`);
        setSocketId(channel.socket_id)
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


    const components = {
        Card: BoardCard,
        NewCardForm: NewCardForm,
        NewLaneForm: NewLaneForm,
        LaneHeader: LaneHeaderComponent
    }

    return (
        <div className={'d-flex p-relative'}>
            <Board data={lanes}
                   eventBusHandle={setEventBus}
                   components={components}
                   editable={true}
                   editLaneTitle={true}
                   canAddLanes={true}
                   draggable={true}
                   onCardAdd={onCardAdd(id, socketId)}
                   onCardDelete={onCardDelete(id, socketId)}
                   onLaneAdd={onLaneAdd(id, socketId)}
                   onLaneDelete={onLaneDelete(id, socketId)}
                   onLaneUpdate={onLaneUpdate(id, socketId)}
                   handleLaneDragEnd={handleLaneDragEnd(id, socketId)}
                   handleDragEnd={handleCardDragEnd(id, socketId)}
                   onDataChange={onDataChange()}
                   style={{backgroundImage: `url('${imageUrl}')`}}

            />
            <BoardSidebar boardId={id} users={users} isOwner={isOwner} lanes={lanes} setLanes={setLanes} />
        </div>
    )
}

BoardsShow.propTypes = {

};
export default BoardsShow
