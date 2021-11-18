import {csrfToken} from "../../js/helper";

const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': csrfToken()
}

const post = (url, data, headers = defaultHeaders) => {
    return fetch(url, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(data)
    })
}

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

