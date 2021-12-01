import React, {useState} from 'react'
import PropTypes from 'prop-types'
import CardContentTitle from "./CardContentTitle";
import BoardCard from "../BoardCard";
import UserCircle from "../../../../users/UserCircle";
import CardActionsMember from "../actions/CardActionsMember";

const CardAssignments = (props) => {
    const {
        cardId,
        assignments
    } = props

    return (
        <>
            <CardContentTitle>User assignments</CardContentTitle>
            <div className="d-flex">
                { assignments.map(assignment => <CardActionsMember key={assignment.id} user={assignment.user} cardId={cardId} remove={true} />)}
            </div>
        </>
    )

}

CardAssignments.propTypes = {
    assignments: PropTypes.array
}

CardAssignments.defaultProps = {
    assignments: []
}

export default CardAssignments
