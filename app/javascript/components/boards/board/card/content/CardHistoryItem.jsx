import React, {useState} from 'react'
import PropTypes from 'prop-types'
import UserCircle from "../../../../users/UserCircle";

const CardHistoryItem = (props) => {
    const {
        action
    } = props

    return (
        <div className={'d-flex mb-2'}>
            <UserCircle className={'me-2'} user={action.user} />
            <div className="">
                <div className=""><b>{action.user.last_name} {action.user.first_name}</b> {action.action}</div>
                <div className="text-muted text-small">{action.time_ago} ago</div>
            </div>
        </div>
    )

}

CardHistoryItem.propTypes = {
    action: PropTypes.object
}

export default CardHistoryItem
