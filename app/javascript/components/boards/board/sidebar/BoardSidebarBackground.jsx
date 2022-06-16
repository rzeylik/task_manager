import React, {useEffect, useState} from 'react';
import {csrfToken} from "../../../../js/helper";
import {Button, Select, Upload} from "antd";
import {updateImageMode} from "../../board_actions";

const BoardSidebarBackground = (props) => {
    const {
        boardId,
        className,
        image
    } = props

    const [imageMode, setImageMode] = useState(props.imageMode)

    useEffect(() => {
        setImageMode(props.imageMode)
    }, [props.imageMode])

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

    const onImageModeChange = (value) => {
        $('.site').css('background-size', value)
        setImageMode(value)
        updateImageMode(boardId, value)
    }

    return (
        <div className={className}>
            <h6 className="text-muted">Background</h6>
            <form onSubmit={onSubmit} method={'post'}>
                {/*<Upload*/}
                {/*    onChange={(info)  => console.log(info)}*/}
                {/*    defaultFileList={[{ uid: '1', name: imageName, status: 'done', url: image}]}*/}
                {/*    maxCount={1}*/}
                {/*    beforeUpload={() => false}*/}
                {/*    accept={'.png, .jpg, .gif'}*/}
                {/*>*/}
                {/*    <div className="btn btn-primary">Upload</div>*/}
                {/*</Upload>*/}
                <div className="d-flex mb-1">
                    <input defaultValue={image} required={true} className={'form-control form-control-sm me-2'} name={'image'} type="file" id={'boardImage'} accept="image/png, image/gif, image/jpeg" />
                    <button className={'btn btn-sm btn-primary'}>Update</button>
                </div>

                <div className="d-flex">
                    <Select
                        className={'w-100'}
                        onChange={onImageModeChange}
                        value={imageMode}
                    >
                        <Select.Option value={'auto'}>Auto</Select.Option>
                        <Select.Option value={'cover'}>Cover</Select.Option>
                        <Select.Option value={'contain'}>Contain</Select.Option>
                    </Select>
                </div>

            </form>
        </div>
    );
};

export default BoardSidebarBackground;
