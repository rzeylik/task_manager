import React from "react"
import PropTypes from "prop-types"
import {AppBar, Box, Button, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Header = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Box sx={{flexGrow: 1}}>
                    <Typography variant="body1" color="white" component="div">
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
