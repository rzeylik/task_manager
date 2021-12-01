import {post} from "../../js/helper";

export const addWorkspace = (name) => {
    return post(`/api/workspaces`, { name: name })
}

export const addBoard = (workspaceId, name) => {
    return post(`/api/workspaces/${workspaceId}/add_board`, { name: name })
}

export const removeUserFromWorkspace = (workspaceId, userId) => {
    return post(`/api/workspaces/${workspaceId}/remove_user`, { user_id: userId })
}
