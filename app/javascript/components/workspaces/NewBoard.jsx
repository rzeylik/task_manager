import React, {useState} from 'react';
import {addBoard} from "./workspace_actions";

const NewBoard = (props) => {
    const {
        setOwnWorkspaces,
        workspace
    } = props

    const [editMode, setEditMode] = useState(false)

    const addNewBoard = () => {
        const name = $('#boardName').val()
        if (name) {
            addBoard(workspace.id, name).then((res) => res.json()).then(data => {
                setOwnWorkspaces(data)
            })
            setEditMode(false)
        }
    }

    return (
        <div className="board-index-card flex-column justify-content-between">
            { !editMode &&
                <h5 className={'text-muted'} onClick={() => setEditMode(true)} style={{cursor: 'pointer'}}>Add new board</h5>
            }

            { editMode &&
                <div className={'w-100'}>
                    <input placeholder={'Input board name'} type="text" className={'form-control form-control-sm'} id={'boardName'}/>
                </div>
            }

            { editMode &&
                <div>
                    <div onClick={addNewBoard} className={'btn btn-sm btn-primary me-2'}>Save</div>
                    <div onClick={() => setEditMode(false)} className={'btn btn-sm btn-secondary'}>Cancel</div>
                </div>
            }

        </div>
    );
};

NewBoard.defaultProps = {
    setOwnWorkspaces: (e) => {}
}

export default NewBoard;
