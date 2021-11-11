import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import Board from 'react-trello'
import {useParams} from "react-router-dom";
import {csrfToken} from "../../js/helper";
import {handleCardDragEnd, handleLaneDragEnd, onCardAdd, onDataChange, onLaneAdd} from "./board_actions";

const BoardsShow = (props) => {
    const [data, setData] = useState({
        lanes: [
            {
                id: 'lane1',
                title: 'Planned Tasks',
                label: '2/2',
                cards: []
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



    return (
        <Board data={data}
               editable={true}
               canAddLanes={true}
               draggable={true}
               onCardAdd={onCardAdd(id)}
               onLaneAdd={onLaneAdd(id)}
               handleLaneDragEnd={handleLaneDragEnd(id)}
               handleDragEnd={handleCardDragEnd(id)}
               onDataChange={onDataChange()}
        />
    )
}

BoardsShow.propTypes = {

};
export default BoardsShow
