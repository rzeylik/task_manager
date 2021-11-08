import React from "react"
import PropTypes from "prop-types"
import NotFoundIcon from "../svg/NotFoundIcon";

const NotFound = (props) => {
    return (
        <div className="container" style={{paddingTop: '75px'}}>
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

        </div>
    )
}

NotFound.propTypes = {};
export default NotFound

//
// <div className="row">
//     <div className="col-md-6 align-self-center">
//
// </div>
// <div className="col-md-6 align-self-center">
//     <h1>404</h1>
//     <h2>UH OH! You're lost.</h2>
//     <p>The page you are looking for does not exist.
//         How you got here is a mystery. But you can click the button below
//         to go back to the homepage.
//     </p>
//     <button className="btn green">HOME</button>
// </div>
// </div>
