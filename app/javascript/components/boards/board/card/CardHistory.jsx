import React, {useState} from 'react'
import PropTypes from 'prop-types'
import CardSectionTitle from "./CardSectionTitle";

const CardHistory = (props) => {
    const {
        actions
    } = props

    return (
        <>
            <CardSectionTitle>History</CardSectionTitle>
            { actions.map(action => <div key={action.id}>{action.user_name} {action.action} ({action.time_ago} ago)</div>)}
        </>
    )

}

CardHistory.propTypes = {
    actions: PropTypes.array
}

export default CardHistory
