import React, {useCallback, useState} from 'react'
import PropTypes from 'prop-types'
import CardActionsTitle from "./CardActionsTitle";
import CardActionsDate from "./CardActionsDate";
import {joinToCard} from "../card_actions";
import CardJoin from "./CardJoin";
import CardActionsMembers from "./CardActionsMembers";
import CardActionsFiles from "./CardActionsFiles";
import CardActionsRelatedCards from "./CardActionsRelatedCards";
import CardActionsColor from "./CardActionsColor";
import CardActionsTime from "./CardActionsTime";
import cardActionsColor from "./CardActionsColor";

const CardActions = (props) => {
    const {
        data,
        editable
    } = props

    return (
        <>
            <CardJoin cardId={data.id} isAssigned={data?.assignments?.find(assignment => assignment.user.email === window.current_user.email)} />
            <CardActionsTitle>Add to card</CardActionsTitle>
            <CardActionsMembers editable={editable} cardId={data.id} />
            <CardActionsDate cardId={data.id} dueTo={data.due_to} />
            <CardActionsTime cardId={data.id} time={data.track_times?.find(tt => tt.user.id === current_user.id)?.duration} />
            <CardActionsFiles cardId={data.id} />
            <CardActionsRelatedCards cardId={data.id} />
            <CardActionsColor cardId={data.id} color={data.bg_color} />
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
