import React from 'react';
import {updatePermission} from "./users_actions";
import {removeUserFromBoard} from "../board_actions";

const UsersTable = ({boardId, users}) => {
    const onSwitchChange = (id, permissionName, value) => {
        updatePermission(id, permissionName, value)
    }

    const removeUser = (id) => {
        removeUserFromBoard(boardId, id).then(() => location.reload())
    }

    return (
        <div className={'table-responsive'}>
            <table className="table">
                <thead className="table-light">
                    <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Edit cards</th>
                        <th>Edit lanes</th>
                        <th>Drag cards</th>
                        <th>Drag lanes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.workspace_users.map(user => (
                        <tr key={user.id}>
                            <td>{user.last_name} {user.first_name} (Workspace user)</td>
                            <td>{user.email}</td>
                            <td>
                                <label className="switch">
                                    <input type="checkbox" className="primary" defaultChecked={true} disabled={true} />
                                    <span className="slider round"></span>
                                </label>
                            </td>
                            <td>
                                <label className="switch">
                                    <input type="checkbox" className="primary" defaultChecked={true} disabled={true} />
                                    <span className="slider round"></span>
                                </label>
                            </td>
                            <td>
                                <label className="switch">
                                    <input type="checkbox" className="primary" defaultChecked={true} disabled={true} />
                                    <span className="slider round"></span>
                                </label>
                            </td>
                            <td>
                                <label className="switch">
                                    <input type="checkbox" className="primary" defaultChecked={true} disabled={true} />
                                    <span className="slider round"></span>
                                </label>
                            </td>
                            <td></td>
                        </tr>
                    ))}
                    {users.board_users.map(right => (
                        <tr key={right.user.id}>
                            <td>{right.user.last_name} {right.user.first_name}</td>
                            <td>{right.user.email}</td>
                            <td>
                                <label className="switch">
                                    <input type="checkbox" className="primary" onChange={(e) => {onSwitchChange(right.id, 'can_edit_tasks', e.currentTarget.checked)}} defaultChecked={right.can_edit_tasks} />
                                    <span className="slider round"></span>
                                </label>
                            </td>
                            <td>
                                <label className="switch">
                                    <input type="checkbox" className="primary" onChange={(e) => {onSwitchChange(right.id, 'can_edit_lists', e.currentTarget.checked)}} defaultChecked={right.can_edit_lists} />
                                    <span className="slider round"></span>
                                </label>
                            </td>
                            <td>
                                <label className="switch">
                                    <input type="checkbox" className="primary" onChange={(e) => {onSwitchChange(right.id, 'can_move_tasks', e.currentTarget.checked)}} defaultChecked={right.can_move_tasks} />
                                    <span className="slider round"></span>
                                </label>
                            </td>
                            <td>
                                <label className="switch">
                                    <input type="checkbox" className="primary" onChange={(e) => {onSwitchChange(right.id, 'can_move_lists', e.currentTarget.checked)}} defaultChecked={right.can_move_lists} />
                                    <span className="slider round"></span>
                                </label>
                            </td>
                            <td>
                                <div className="text-danger">
                                    <i onClick={() => {removeUser(right.user.id)}} className={'fa fa-trash cursor-pointer'}></i>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
