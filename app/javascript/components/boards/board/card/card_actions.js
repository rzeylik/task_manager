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

export const joinToCard = (cardId) => {
    post(`/api/tasks/${cardId}/join`, {})
}

export const leaveFromCard = (cardId) => {
    post(`/api/tasks/${cardId}/leave`, {})
}

export const getUsers = (cardId) => {
    post(`/api/tasks/${cardId}/users`, {})
}
