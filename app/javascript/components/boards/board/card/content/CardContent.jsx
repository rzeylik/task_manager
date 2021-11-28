import React, {useState} from 'react'
import PropTypes from 'prop-types'
import CardHistory from "./CardHistory";
import CardDescription from "./CardDescription";
import CardAssignments from "./CardAssignments";
import BoardCard from "../BoardCard";

const CardContent = (props) => {
    const {
        data
    } = props

    return (
        <>
            { data?.assignments?.length !== 0 &&
                <div className="mb-2">
                    <CardAssignments assignments={data.assignments} />
                </div>
            }
            <div className="mb-2">
                <CardDescription cardId={data.id} description={data.description} />
            </div>
            <div className="mb-2">
                <CardHistory actions={data.actions} />
            </div>
        </>
    )

}

CardContent.propTypes = {
    data: PropTypes.object
}

export default CardContent
