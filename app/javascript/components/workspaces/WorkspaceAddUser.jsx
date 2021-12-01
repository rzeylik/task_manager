import React, {useState} from 'react';
import {post} from "../../js/helper";

const WorkspaceAddUser = (props) => {
    const {
        workspaceId,
        className
    } = props

    const [message, setMessage] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        let data = {
            email: $('#userEmail').val()
        }

        post(`/api/workspaces/${workspaceId}/add_user`, data).then(response => response.json()).then(data => setMessage(data.message))
    }

    return (
        <div className={className}>
            <h5>Add user to workspace</h5>
            <form className={'form-inline'} onSubmit={onSubmit} method={'post'}>
                <div className="d-flex align-items-center mb-1">
                    <input style={{maxWidth: '200px'}} placeholder={'Invite user by email'} required={true} className={'form-control form-control-sm me-2'} name={'email'} type="email" id={'userEmail'} />
                    <button className={'btn btn-sm btn-primary'}>
                        Invite
                    </button>
                </div>
                <div className="mb-1">{ message }</div>
            </form>
        </div>
    );
};

export default WorkspaceAddUser;
