import React, {useState} from 'react'
import PropTypes from 'prop-types'
import CardContentTitle from "./CardContentTitle";
import BoardCard from "../BoardCard";

const CardAssignments = (props) => {
    const {
        assignments
    } = props

    return (
        <>
            <CardContentTitle>User assignments</CardContentTitle>
            { assignments.map(assignment => <div key={assignment.id}>{assignment.user_name}</div>)}
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
