import React from 'react';
import PropTypes from "prop-types"
import {csrfToken} from "../../../js/helper";

const BoardSidebar = (props) => {
    const {
        boardId
    } = props

    const onSubmit = (e) => {
        e.preventDefault()

        const headers = {
            'X-CSRF-TOKEN': csrfToken()
        }

        let formData = new FormData();

        formData.append('image', document.getElementById('boardImage').files[0])

        fetch(`/api/boards/${boardId}/add_image`, {
            headers: headers,
            method: 'post',
            body: formData
        }).then(() => {
            location.reload();
        })
    }

    return (
        <div className="board-sidebar">
            <form onSubmit={onSubmit} method={'post'}>
                <input required={true} name={'image'} type="file" id={'boardImage'} accept="image/png, image/gif, image/jpeg" />
                <button>
                    Save
                </button>
            </form>
        </div>
    );
};


BoardSidebar.propTypes = {}

export default BoardSidebar;
