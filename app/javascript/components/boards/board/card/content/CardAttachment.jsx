import React from 'react';
import {removeAttachment} from "../card_actions";

const CardAttachment = (props) => {
    const {
        attachment,
        cardId,
        editable
    } = props

    const isImage = attachment.type === 'image/png' || attachment.type === 'image/jpeg' || attachment.type === 'image/jpg' || attachment.type === 'image/gif'

    const deleteFile = () => {
        removeAttachment(cardId, attachment.id)
    }

    return (
        <div key={attachment.id} className={'card-attachment'}>
            <div className="d-flex justify-content-between align-items-center">
                <a href={attachment.url} target={'_blank'} download>{attachment.name}</a>
                {editable && <i onClick={deleteFile} className="far fa-trash-alt" />}
            </div>
            { isImage && (
                <a href={attachment.url} className={'mt-2'}>
                    <img src={attachment.url} alt={attachment.name} />
                </a>
            )}

        </div>
    );
};

export default CardAttachment;
