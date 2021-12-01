import React from 'react';
import {addWorkspace} from "./workspace_actions";

const NewWorkspace = (props) => {
    const {
        className,
        setOwnWorkspaces
    } = props

    const addNewWorkspace = (e) => {
        e.preventDefault()
        const name = $('#workspaceName').val()

        if (name) {
            addWorkspace(name).then((res) => res.json()).then((data) => {
                setOwnWorkspaces(data)
            })
        }
    }

    return (
        <div className={className}>
            <h5>Add new workspace</h5>
            <div className="form-inline">
                <div className="d-flex">
                    <input placeholder={'Input workspace name here'} type="text" className={'form-control form-control-sm me-2'} style={{maxWidth: '250px'}} id={'workspaceName'} />
                    <button onClick={addNewWorkspace} className={'btn btn-sm btn-primary'}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default NewWorkspace;
