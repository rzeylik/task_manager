import React from "react"
import PropTypes from "prop-types"
import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Footer = (props) => {
    return (
        <AppBar position="static" color="primary">
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography variant="body1" color="inherit">
                        © 2021 Softer
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

Footer.propTypes = {
    isLoggedIn: PropTypes.bool
};

export default Footer
