import React, {useState} from 'react'
import PropTypes from 'prop-types'

const CardContentTitle = ({children}) => {
    return (
        <h6>
            { children }
        </h6>
    )

}

CardContentTitle.propTypes = {}

export default CardContentTitle
