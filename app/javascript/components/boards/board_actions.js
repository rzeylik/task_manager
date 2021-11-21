import {defaultHeaders, post} from "../../js/helper";

export const onCardAdd = (boardId) => {
    return (card, laneId) => {
        const data = {
            task: {
                name: card.title,
                card_id: card.id
            },
            lane_id: laneId
        }
        post(`/api/tasks`, data)
    }
}

export const onCardDelete = (boardId) => {
    return (cardId, laneId) => {
        const data = {
            card_id: cardId
        }
        post(`/api/tasks/${cardId}`, data, defaultHeaders, 'DELETE')
    }
}

export const onLaneAdd = (boardId) => {
    return (lane) => {
        const data = {
            list: {
                name: lane.title,
                lane_id: lane.id
            },
            board_id: boardId
        }
        post(`/api/lists`, data)
    }
}

export const onLaneDelete = (boardId) => {
    return (laneId) => {
        const data = {
            lane_id: laneId
        }
        post(`/api/lists/${laneId}`, data, defaultHeaders, 'DELETE')
    }
}

export const handleLaneDragEnd = (boardId) => {
    return (from, to, params) => {
        const data = {
            from: from,
            to: to,
            lane_id: params.id,
            board_id: boardId
        }
        post(`/api/lists/change_position`, data)
    }
}

export const handleCardDragEnd = (boardId) => {
    return (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
        console.log(cardId)
        const data = {
            task_id: cardId,
            from_lane_id: sourceLaneId,
            to_lane_id: targetLaneId,
            position: position,
            board_id: boardId
        }
        post(`/api/tasks/change_position`, data)
    }
}

export const onDataChange = () => {
    return (newData) => {
        console.log(newData)
    }
}

