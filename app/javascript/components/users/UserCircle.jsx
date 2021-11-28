import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Tooltip} from "antd";

const UserCircle = (props) => {
    const {
        user,
        className,
        withTooltip,
        onclick
    } = props

    return (
        <Tooltip title={withTooltip ? `${user?.last_name} ${user?.first_name}, ${user?.email}` : ''} zIndex={1500}>
            <div onClick={() => {onclick()}} className={`user-circle ${className}`}>
                {user?.last_name?.charAt(0)}{user?.first_name?.charAt(0)}
            </div>
        </Tooltip>
    )

}

UserCircle.propTypes = {
    user: PropTypes.object,
    className: PropTypes.string,
    withTooltip: PropTypes.bool,
    onclick: PropTypes.func
}

UserCircle.defaultProps = {
    withTooltip: true,
    onclick: () => {}
}

export default UserCircle
