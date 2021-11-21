import {defaultHeaders, post} from "../../../../js/helper";

export const updateDescription = (cardId, newDescription) => {
    const data = {
        task: {
            description: newDescription
        }
    }
    post(`/api/tasks/${cardId}`, data, defaultHeaders, 'PATCH')
}
