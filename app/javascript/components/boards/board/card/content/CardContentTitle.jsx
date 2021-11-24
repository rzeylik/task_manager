import React, {useState} from 'react'
import PropTypes from 'prop-types'

const CardContentTitle = ({children}) => {
    return (
        <h5>
            { children }
        </h5>
    )

}

CardContentTitle.propTypes = {}

export default CardContentTitle
