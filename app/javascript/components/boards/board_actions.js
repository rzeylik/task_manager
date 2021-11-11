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
    }).then((response) => (response.json()))
}

export const onCardAdd = (boardId) => {
    return async (card, listId) => {
        const data = {
            task: {
                name: card.title
            },
            list_id: listId
        }
        const id = await post(`/api/tasks`, data)
        setNewIdToCard(card.id, id)
        card.id = id
        return card
    }
}

export const onLaneAdd = (boardId) => {
    return (lane) => {
        const data = {
            list: {
                name: lane.title
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
            from_list_id: sourceLaneId,
            to_list_id: targetLaneId,
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

export const setNewIdToCard = (previousId, newId) => {
    // debugger
    $(`[data-id=${previousId}]`).attr('data-id', newId)

}
