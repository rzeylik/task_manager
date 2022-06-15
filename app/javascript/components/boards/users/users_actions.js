import {defaultHeaders, post} from "../../../js/helper";

export const updatePermission = (rightId, permissionName, value) => {
    const body = { board_right: { [permissionName]: value } }
    return post(`/api/board_rights/${rightId}`, body, defaultHeaders, 'PATCH').then(res => res.json())
}
