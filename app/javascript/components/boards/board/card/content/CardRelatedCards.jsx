import React, {useState} from 'react';
import RelatedCard from "./RelatedCard";
import CardContentTitle from "./CardContentTitle";

const CardRelatedCards = (props) => {
    const {
        relatedCards,
        cardId
    } = props

    return (
        <>
            <CardContentTitle>Related tasks</CardContentTitle>
            <div className={'d-flex flex-wrap'}>
                {relatedCards.map((relatedCard) => <RelatedCard key={relatedCard.id} relatedCard={relatedCard} cardId={cardId} />)}
            </div>
        </>
    );
};

CardRelatedCards.defaultProps = {
    relatedCards: []
}

export default CardRelatedCards;
