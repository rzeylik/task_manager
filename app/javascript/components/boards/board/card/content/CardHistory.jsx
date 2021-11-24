import React, {useState} from 'react'
import PropTypes from 'prop-types'
import CardContentTitle from "./CardContentTitle";

const CardHistory = (props) => {
    const {
        actions
    } = props

    return (
        <>
            <CardContentTitle>History</CardContentTitle>
            { actions.map(action => <div key={action.id}>{action.user_name} {action.action} ({action.time_ago} ago)</div>)}
        </>
    )

}

CardHistory.propTypes = {
    actions: PropTypes.array
}

export default CardHistory
