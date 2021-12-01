import React from 'react';
import {csrfToken} from "../../../../js/helper";
import {Button, Upload} from "antd";

const BoardSidebarBackground = (props) => {
    const {
        boardId,
        className
    } = props

    const onSubmit = (e) => {
        e.preventDefault()

        const headers = {'X-CSRF-TOKEN': csrfToken()}

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
        <div className={className}>
            <h5 className="">Set background</h5>
            <form onSubmit={onSubmit} method={'post'} className={'d-flex'}>
                {/*<Upload className={'me-2 w-100'} id={'boardImage'} accept={"image/png, image/gif, image/jpeg"} required={true}>*/}
                {/*    <Button className={'w-100'}>Click to Upload</Button>*/}
                {/*</Upload>*/}
                <input required={true} className={'form-control form-control-sm me-2'} name={'image'} type="file" id={'boardImage'} accept="image/png, image/gif, image/jpeg" />
                <button className={'btn btn-sm btn-primary'}>Update</button>

            </form>
        </div>
    );
};

export default BoardSidebarBackground;
