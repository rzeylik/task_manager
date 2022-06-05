import {post} from "../../js/helper";

export const addMessage = (text, boardId, socketId = null) => {
    return post(`/api/boards/${boardId}/messages`, { text: text, board_id: boardId, socket_id: socketId }).then(res => res.json())
}

export const getMessages = (boardId, last_message_id = '') => {
    return fetch(`/api/boards/${boardId}/messages?last_message_id=${last_message_id}`).then(res => res.json())
}
