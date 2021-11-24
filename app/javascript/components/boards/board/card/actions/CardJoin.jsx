import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {joinToCard} from "../card_actions";

const CardJoin = (props) => {
    const {
        cardId
    } = props

    console.log(props)

    const joinCard = () => {
        joinToCard(cardId)
    }

    return (
        <button onClick={joinCard} className={'btn btn-sm btn-outline-secondary mb-2'}>Join</button>
    )

}

CardJoin.propTypes = {}

export default CardJoin
