import React from "react"
import PropTypes from "prop-types"
import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Footer = (props) => {
    return (
        <footer className={'footer w-100 text-white py-2 px-2'}>
            © 2022 Softer
        </footer>
    )
}

Footer.propTypes = {
    isLoggedIn: PropTypes.bool
};

export default Footer
