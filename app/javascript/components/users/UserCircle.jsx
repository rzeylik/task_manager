import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Tooltip} from "antd";

const UserCircle = (props) => {
    const {
        user,
        className,
        withTooltip,
        onclick,
        size
    } = props

    return (
        <Tooltip title={withTooltip ? `${user?.last_name} ${user?.first_name}, ${user?.email}` : ''} zIndex={1500}>
            <div style={{'--size': `${size}px`}} onClick={() => {onclick()}} className={`user-circle ${className}`}>
                <span>{user?.last_name?.charAt(0)}{user?.first_name?.charAt(0)}</span>
            </div>
        </Tooltip>
    )

}

UserCircle.propTypes = {
    user: PropTypes.object,
    className: PropTypes.string,
    size: PropTypes.number,
    withTooltip: PropTypes.bool,
    onclick: PropTypes.func
}

UserCircle.defaultProps = {
    withTooltip: true,
    size: 30,
    onclick: () => {}
}

export default UserCircle
