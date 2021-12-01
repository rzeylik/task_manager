import React from "react"
import PropTypes from "prop-types"
import {AppBar, Box, Button, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import UserCircle from "../users/UserCircle";

const Header = (props) => {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Box sx={{flexGrow: 1}}>
                    <Typography variant="body1" color="white" component="div">
                        <Link className={'header-link'} to={'/'}>Home</Link>
                    </Typography>
                </Box>
                <div className={'d-flex'}>
                    { props.isLoggedIn && <Button rel={"nofollow"} data-method={"DELETE"} href={'/users/sign_out'} color="inherit">Sign out</Button> }
                    { props.isLoggedIn && <UserCircle className={'mx-2'} user={props.user} withTooltip={false} /> }
                    { !props.isLoggedIn && <Button href={'/users/sign_in'} color="inherit">Sign in</Button> }
                    { !props.isLoggedIn && <Button href={'/users/sign_up'} color="inherit">Sign up</Button> }
                </div>
            </Toolbar>
        </AppBar>
    )
}

Header.propTypes = {
    isLoggedIn: PropTypes.bool
};

export default Header
