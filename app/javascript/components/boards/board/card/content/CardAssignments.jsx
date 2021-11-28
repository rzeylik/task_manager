import React, {useState} from 'react'
import PropTypes from 'prop-types'
import CardContentTitle from "./CardContentTitle";
import BoardCard from "../BoardCard";
import UserCircle from "../../../../users/UserCircle";

const CardAssignments = (props) => {
    const {
        assignments
    } = props

    return (
        <>
            <CardContentTitle>User assignments</CardContentTitle>
            <div className="d-flex">
                { assignments.map(assignment => <UserCircle key={assignment.id} className={'me-2'} user={assignment.user} />)}
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
