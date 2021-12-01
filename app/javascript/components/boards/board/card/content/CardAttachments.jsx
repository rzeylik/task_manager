import React from 'react';
import CardContentTitle from "./CardContentTitle";
import CardActionsMember from "../actions/CardActionsMember";
import CardAttachment from "./CardAttachment";

const CardAttachments = (props) => {
    const {
        cardId,
        attachments
    } = props



    return (
        <>
            <CardContentTitle>Attachments</CardContentTitle>
            <div className="">
                { attachments.map(attachment => (<CardAttachment key={attachment.id} cardId={cardId} attachment={attachment} />)) }
            </div>
        </>
    );
};

CardAttachments.defaultProps = {
    attachments: []
}

export default CardAttachments;

