import {defaultHeaders, post} from "../../js/helper";

export const onCardAdd = (boardId, socketId = null) => {
    return (card, laneId) => {
        const data = {
            task: {
                name: card.title,
                card_id: card.id
            },
            socket_id: socketId,
            lane_id: laneId,
            board_id: boardId
        }
        post(`/api/tasks`, data)
    }
}

export const onCardDelete = (boardId, socketId = null) => {
    return (cardId, laneId) => {
        const data = {
            card_id: cardId,
            lane_id: laneId,
            board_id: boardId,
            socket_id: socketId
        }
        post(`/api/tasks/${cardId}`, data, defaultHeaders, 'DELETE')
    }
}

export const onLaneAdd = (boardId, socketId = null) => {
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

export const onLaneDelete = (boardId, socketId = null) => {
    return (laneId) => {
        const data = {
            lane_id: laneId,
            board_id: boardId
        }
        post(`/api/lists/${laneId}`, data, defaultHeaders, 'DELETE')
    }
}

export const handleLaneDragEnd = (boardId, socketId = null) => {
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

export const handleCardDragEnd = (boardId, socketId = null) => {
    return (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
        const data = {
            task_id: cardId,
            from_lane_id: sourceLaneId,
            to_lane_id: targetLaneId,
            position: position,
            board_id: boardId,
            socket_id: socketId,
        }
        post(`/api/tasks/change_position`, data)
    }
}

export const onLaneUpdate = (boardId, socketId) => {
    return (laneId, data) => {
        const newData = {
            board_id: boardId,
            name: data.title,
            socket_id: socketId,
        }
        post(`/api/lists/${laneId}`, newData, defaultHeaders, 'PUT')
    }
}

export const onDataChange = () => {
    return (newData) => {
    }
}

export const removeUserFromBoard = (boardId, userId) => {
    return post(`/api/boards/${boardId}/remove_user`, {user_id: userId})
}

export const destroyBoard = (boardId) => {
    return post(`/api/boards/${boardId}`, {}, defaultHeaders, 'DELETE')
}

