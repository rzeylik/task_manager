import React, {useState} from 'react';
import {Popover} from "antd";
import CardActionsMember from "./CardActionsMember";
import {csrfToken} from "../../../../../js/helper";

const CardActionsFiles = (props) => {
    const {
        cardId
    } = props

    const [visible, setVisible] = useState(false)

    const handleVisibleChange = visible => {
        setVisible(visible)
    };

    const onSubmit = (e) => {
        e.preventDefault()

        const headers = {'X-CSRF-TOKEN': csrfToken()}
        let formData = new FormData();
        formData.append('file', document.getElementById('attachment').files[0])
        fetch(`/api/tasks/${cardId}/attach_file`, {
            headers: headers,
            method: 'post',
            body: formData
        })

        setVisible(false)
    }

    const content = (
        <div>
            <div className="mb-2">
                <div className="mb-2">Attach file: </div>
                <form onSubmit={onSubmit}>
                    <input required={true} type="file" id={'attachment'} className={'form-control form-control-sm mb-2'}/>
                    <button className={'btn btn-sm btn-primary'}>Attach</button>
                </form>
            </div>
        </div>
    );

    return (
        <Popover
            content={content}
            title={"Files"}
            trigger={"click"}
            visible={visible}
            onVisibleChange={handleVisibleChange}
            zIndex={1500}
        >
            <button className={'btn btn-sm btn-outline-secondary mb-1'}>Files</button>
        </Popover>
    );
};

export default CardActionsFiles;
