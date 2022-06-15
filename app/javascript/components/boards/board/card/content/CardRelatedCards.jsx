import React, {useState} from 'react';
import RelatedCard from "./RelatedCard";
import CardContentTitle from "./CardContentTitle";

const CardRelatedCards = (props) => {
    const {
        relatedCards,
        cardId,
        editable
    } = props

    return (
        <>
            <CardContentTitle>Related tasks</CardContentTitle>
            <div className={'row'}>
                {relatedCards.map((relatedCard) => <RelatedCard key={relatedCard.id} editable={editable} relatedCard={relatedCard} cardId={cardId} />)}
            </div>
        </>
    );
};

CardRelatedCards.defaultProps = {
    relatedCards: [],
    editable: false
}

export default CardRelatedCards;
