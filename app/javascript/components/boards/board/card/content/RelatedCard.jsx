import React, {useState} from 'react';
import CardModal from "../CardModal";
import {Detail, Footer, MovableCardWrapper} from "react-trello/dist/styles/Base";
import UserCircle from "../../../../users/UserCircle";
import {removeRelation} from "../card_actions";

const RelatedCard = (props) => {
    const {
        relatedCard,
        cardId,
        editable
    } = props

    const [modalOpen, setModalOpen] = useState(false)

    const onClick = () => {
        setModalOpen(true)
    }

    const handleModalClose = () => {
        setModalOpen(false)
    }

    const removeRelatedTask = () => {
        removeRelation(cardId, relatedCard.id)
    }

    return (
        <>
            <div className="col-md-4 col-sm-6 mx-1">
                <MovableCardWrapper
                    style={{backgroundColor: '#f3f3f3', borderBottom: 0, cursor: 'auto', minWidth: 'auto'}}
                >
                    <Detail>
                        <div className="d-flex w-100 justify-content-between align-items-center">
                            <span className={'text-normal'}>{relatedCard.title}</span>
                            { editable && (
                                <i title={'Remove related task?'} onClick={removeRelatedTask} className="fas fa-md fa-trash-alt" style={{cursor: 'pointer'}} />
                            )}

                        </div>
                    </Detail>
                    <Footer>
                        <div className="w-100 d-flex justify-content-between align-items-end">
                            <div style={{cursor: 'pointer'}} className="text-small text-muted" onClick={onClick}>
                                Show details
                            </div>
                            <div className="d-flex">
                                { relatedCard.assignments.map((assignment) => <UserCircle key={assignment.id} size={30} user={assignment.user} className={'ms-1'} />) }
                            </div>
                        </div>

                    </Footer>
                </MovableCardWrapper>
            </div>
            <CardModal onDelete={props.onDelete} open={modalOpen} onClose={handleModalClose} id={relatedCard.id} />
        </>
    );
};

export default RelatedCard;
