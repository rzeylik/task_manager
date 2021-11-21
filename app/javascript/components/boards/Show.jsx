import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import Board from 'react-trello'
import {useParams} from "react-router-dom";
import {csrfToken} from "../../js/helper";
import {handleCardDragEnd, handleLaneDragEnd, onCardAdd, onCardDelete, onDataChange, onLaneAdd, onLaneDelete} from "./board_actions";
import BoardCard from "./board/card/BoardCard";
import NewCardForm from "./board/card/NewCardForm";
import NewLaneForm from "./board/lane/NewLaneForm";

const BoardsShow = (props) => {
    const [data, setData] = useState({
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
        fetch(`/api/boards/${id}`).then(response => response.json()).then(lanes => {
            setData({
                lanes: lanes
            })
        })
    }, [])


    let eventBus = undefined

    const setEventBus = (handle) => {
        eventBus = handle
    }

    // eventBus.publish({})


    const components = {
        Card: BoardCard,
        NewCardForm: NewCardForm,
        NewLaneForm: NewLaneForm
    }

    return (
        <Board data={data}
               components={components}
               editable={true}
               canAddLanes={true}
               draggable={true}
               onCardAdd={onCardAdd(id)}
               onCardDelete={onCardDelete(id)}
               onLaneAdd={onLaneAdd(id)}
               onLaneDelete={onLaneDelete(id)}
               handleLaneDragEnd={handleLaneDragEnd(id)}
               handleDragEnd={handleCardDragEnd(id)}
               onDataChange={onDataChange()}

        />
    )
}

BoardsShow.propTypes = {

};
export default BoardsShow
