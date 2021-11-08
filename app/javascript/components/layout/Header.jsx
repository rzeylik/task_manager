import React from "react"
import PropTypes from "prop-types"
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Header = (props) => {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Box sx={{flexGrow: 1}}>
                    <Typography variant="h6" color="white" component="div">
                        <Link className={'header-link'} to={'/'}>Home</Link>
                        <Link className={'header-link'} to={'/workspaces'}>Workspaces</Link>
                    </Typography>
                </Box>
                <Box>
                    { props.isLoggedIn && <Button rel={"nofollow"} data-method={"DELETE"} href={'/users/sign_out'} color="inherit">Sign out</Button> }
                    { !props.isLoggedIn && <Button href={'/users/sign_in'} color="inherit">Sign in</Button> }
                    { !props.isLoggedIn && <Button href={'/users/sign_up'} color="inherit">Sign up</Button> }
                </Box>
            </Toolbar>
        </AppBar>
    )
}

Header.propTypes = {
    isLoggedIn: PropTypes.bool
};

export default Header
