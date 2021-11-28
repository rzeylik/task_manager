import React, {createContext, useContext, useEffect, useState} from "react"
import PropTypes from "prop-types"
import Board from 'react-trello'
import {useParams} from "react-router-dom";
import {handleCardDragEnd, handleLaneDragEnd, onCardAdd, onCardDelete, onDataChange, onLaneAdd, onLaneDelete} from "./board_actions";
import BoardCard from "./board/card/BoardCard";
import NewCardForm from "./board/card/NewCardForm";
import NewLaneForm from "./board/lane/NewLaneForm";
import BoardSidebar from "./board/BoardSidebar";

const BoardsShow = (props) => {
    let eventBus = undefined
    const setEventBus = (handle) => {
        eventBus = handle
    }

    const [socketId, setSocketId] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
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
            console.log(board)
            setImageUrl(board.image)
            setLanes({
                lanes: board.lanes
            })
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
    }, [])


    const components = {
        Card: BoardCard,
        NewCardForm: NewCardForm,
        NewLaneForm: NewLaneForm
    }

    return (
        <div className={'d-flex'}>
            <Board data={lanes}
                   eventBusHandle={setEventBus}
                   components={components}
                   editable={true}
                   canAddLanes={true}
                   draggable={true}
                   onCardAdd={onCardAdd(id, socketId)}
                   onCardDelete={onCardDelete(id, socketId)}
                   onLaneAdd={onLaneAdd(id, socketId)}
                   onLaneDelete={onLaneDelete(id, socketId)}
                   handleLaneDragEnd={handleLaneDragEnd(id, socketId)}
                   handleDragEnd={handleCardDragEnd(id, socketId)}
                   onDataChange={onDataChange()}
                   style={{backgroundImage: `url('${imageUrl}')`}}

            />
            <BoardSidebar boardId={id} />
        </div>
    )
}

BoardsShow.propTypes = {

};
export default BoardsShow
