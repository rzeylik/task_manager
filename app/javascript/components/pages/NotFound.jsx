import React from "react"
import PropTypes from "prop-types"
import NotFoundIcon from "../svg/NotFoundIcon";
import {Container} from "@mui/material";

const NotFound = (props) => {
    return (
        <Container sx={{paddingTop: '20px', paddingBottom: '20px', flexGrow: '1'}}>
            <div className="row">
                <div className="col-md-6 align-self-center">
                    <NotFoundIcon />
                </div>
                <div className="col-md-6 align-self-center">
                    <h1>404</h1>
                    <h2>UH OH! You're lost.</h2>
                    <p>The page you are looking for does not exist.
                        How you got here is a mystery. But you can click the button below
                        to go back to the homepage.
                    </p>
                    <a className="btn btn-outline-success" href={'/'}>HOME</a>
                </div>
            </div>

        </Container>
    )
}

NotFound.propTypes = {};
export default NotFound
