import React, {useState} from 'react'
import PropTypes from 'prop-types'
import CardActionsTitle from "./CardActionsTitle";
import CardActionsDate from "./CardActionsDate";
import {joinToCard} from "../card_actions";
import CardJoin from "./CardJoin";
import CardActionsMembers from "./CardActionsMembers";

const CardActions = (props) => {
    const {
        data
    } = props

    console.log(data)

    return (
        <>
            <CardJoin cardId={data.id} />
            <CardActionsTitle>Add to card</CardActionsTitle>
            <CardActionsMembers cardId={data.id} />
            <CardActionsDate cardId={data.id} dueTo={data.due_to} />
            <hr/>
            <CardActionsTitle>Actions</CardActionsTitle>
            <button className={'btn btn-sm btn-danger'} onClick={props.onDelete}>Delete card</button>
        </>
    )

}

CardActions.propTypes = {
    data: PropTypes.object,
    onDelete: PropTypes.func
}

export default CardActions
