import React, {useState} from 'react'
import PropTypes from 'prop-types'
import CardHistory from "./CardHistory";
import CardDescription from "./CardDescription";

const CardContent = (props) => {
    const {
        data
    } = props

    return (
        <>
            <CardDescription cardId={data.id} description={data.description}  />
            <CardHistory actions={data.actions} />
        </>
    )

}

CardContent.propTypes = {
    data: PropTypes.object
}

export default CardContent
