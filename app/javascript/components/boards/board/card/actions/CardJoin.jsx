import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {joinToCard, leaveFromCard} from "../card_actions";

const CardJoin = (props) => {
    const {
        cardId,
        isAssigned
    } = props

    const joinCard = () => {
        joinToCard(cardId)
    }

    const leaveCard = () => {
        leaveFromCard(cardId)
    }

    return (
        <button onClick={isAssigned ? leaveCard : joinCard} className={'btn btn-sm btn-outline-secondary mb-2'}>{isAssigned ? 'Leave' : 'Join'}</button>
    )

}

CardJoin.propTypes = {}

export default CardJoin
