import React, {useState} from 'react'
import PropTypes from 'prop-types'
import CardContentTitle from "./CardContentTitle";
import UserCircle from "../../../../users/UserCircle";
import CardHistoryItem from "./CardHistoryItem";

const CardHistory = (props) => {
    const {
        actions
    } = props

    return (
        <>
            <CardContentTitle>History</CardContentTitle>
            { actions.map(action => <CardHistoryItem key={action.id} action={action} />) }
        </>
    )

}

CardHistory.propTypes = {
    actions: PropTypes.array
}

export default CardHistory
