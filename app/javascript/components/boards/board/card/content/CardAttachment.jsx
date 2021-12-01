import React from 'react';
import {removeAttachment} from "../card_actions";

const CardAttachment = (props) => {
    const {
        attachment,
        cardId
    } = props

    const deleteFile = () => {
        removeAttachment(cardId, attachment.id)
    }

    return (
        <div key={attachment.id} className={'card-attachment'}>
            <a href={attachment.url} target={'_blank'}>{attachment.name}</a>
            <i onClick={deleteFile} className="far fa-trash-alt" />
        </div>
    );
};

export default CardAttachment;
