import React from "react"
import PropTypes from "prop-types"
import {AppBar, Box, Button, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import UserCircle from "../users/UserCircle";

const Header = (props) => {
    return (
        (
            <header className={'header text-white py-1'}>
                <div className="flex-grow-1">
                    <Link className={'header-link'} to={'/'}>Home</Link>
                </div>
                <div className={"d-flex"}>
                    { props.isLoggedIn && <Button rel={"nofollow"} data-method={"DELETE"} href={'/users/sign_out'} color="inherit">Sign out</Button> }
                    { props.isLoggedIn && <UserCircle size={35} className={'mx-2'} user={props.user} withTooltip={false} /> }
                    { !props.isLoggedIn && <Button href={'/users/sign_in'} color="inherit">Sign in</Button> }
                    { !props.isLoggedIn && <Button href={'/users/sign_up'} color="inherit">Sign up</Button> }
                </div>
            </header>
        )
    )
}

Header.propTypes = {
    isLoggedIn: PropTypes.bool
};

export default Header
