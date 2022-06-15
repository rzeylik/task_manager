import React from 'react';
import CardContentTitle from "./CardContentTitle";
import CardActionsMember from "../actions/CardActionsMember";
import CardAttachment from "./CardAttachment";

const CardAttachments = (props) => {
    const {
        cardId,
        attachments,
        editable
    } = props



    return (
        <>
            <CardContentTitle>Attachments</CardContentTitle>
            <div className="">
                { attachments.map(attachment => (<CardAttachment key={attachment.id} editable={editable} cardId={cardId} attachment={attachment} />)) }
            </div>
        </>
    );
};

CardAttachments.defaultProps = {
    attachments: [],
    editable: false
}

export default CardAttachments;

