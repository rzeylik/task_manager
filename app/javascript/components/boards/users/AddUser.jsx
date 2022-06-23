import React, {useState} from 'react';
import {post} from "../../../js/helper";

const AddUser = (props) => {
    const {
        boardId,
        className
    } = props

    const [message, setMessage] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        let data = { email: $('#userEmail').val() }

        post(`/api/boards/${boardId}/add_user`, data).then(response => response.json()).then(data => setMessage(data.message))
    }

    return (
        <div className={className}>
            <form onSubmit={onSubmit} method={'post'} className={'d-flex flex-column'}>
                <div className="d-flex mb-1">
                    <input placeholder={'Invite user by email'} required={true} className={'form-control form-control-sm me-2'} name={'email'} type="email" id={'userEmail'} style={{maxWidth: '200px'}} />
                    <button className={'btn btn-sm btn-primary'}>Invite</button>
                </div>
                <div className="mb-1">{ message }</div>

            </form>
        </div>
    );
};

export default AddUser;
