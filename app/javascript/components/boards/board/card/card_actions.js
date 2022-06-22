import {defaultHeaders, post} from "../../../../js/helper";

export const updateDescription = (cardId, newDescription) => {
    const data = {
        task: {
            description: newDescription
        }
    }
    post(`/api/tasks/${cardId}`, data, defaultHeaders, 'PATCH')
}

export const updateDueTo = (cardId, dueTo) => {
    const data = {
        task: {
            due_to: dueTo
        }
    }
    post(`/api/tasks/${cardId}`, data, defaultHeaders, 'PATCH')
}

export const updateColor = (cardId, color) => {
    const data = {
        task: {
            bg_color: color
        }
    }
    post(`/api/tasks/${cardId}`, data, defaultHeaders, 'PATCH')
}

export const updateTime = (cardId, time) => {
    const data = { time: time }
    post(`/api/tasks/${cardId}/add_time`, data)
}

export const removeTime = (cardId) => {
    post(`/api/tasks/${cardId}/remove_time`)
}

export const joinToCard = (cardId) => {
    post(`/api/tasks/${cardId}/join`, {})
}

export const leaveFromCard = (cardId) => {
    post(`/api/tasks/${cardId}/leave`, {})
}

export const addUserToCard = (cardId, userId) => {
    post(`/api/tasks/${cardId}/assign_user`, { user_id: userId })
}

export const removeUserFromCard = (cardId, userId) => {
    post(`/api/tasks/${cardId}/unassign_user`, { user_id: userId })
}

export const removeAttachment = (cardId, attachmentId) => {
    post(`/api/tasks/${cardId}/remove_file`, { attachment_id: attachmentId })
}

export const getUsers = (cardId) => {
    post(`/api/tasks/${cardId}/users`, {})
}

export const addRelation = (parentId, childId) => {
    post(`/api/task_relations/add_relation`, {parent_id: parentId, child_id: childId})
}

export const removeRelation = (parentId, childId) => {
    post(`/api/task_relations/remove_relation`, {parent_id: parentId, child_id: childId})
}

export const getRelatedCardsOptions = (cardId) => {
    return post(`/api/task_relations/cards_options`, { card_id: cardId })
}
