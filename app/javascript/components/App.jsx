import React from "react"
import PropTypes from "prop-types"
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Header from "./layout/Header";
import {Container} from "@mui/material";
import WorkspacesIndex from "./workspaces/Index";
import HomeIndex from "./home/Index";
import NotFound from "./pages/NotFound";
import Footer from "./layout/Footer";

const App = (props) => {
    return (
        <BrowserRouter>
            <div className="site">
                <Header isLoggedIn={!!props.user} />
                <Container sx={{paddingTop: '20px', paddingBottom: '20px', flexGrow: '1'}}>
                    <Routes>
                        <Route path="/" element={<HomeIndex />} />
                        <Route path="workspaces" element={<WorkspacesIndex />} />
                        <Route path={"*"} element={<NotFound />} />
                    </Routes>
                </Container>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

App.propTypes = {
    user: PropTypes.object
};
export default App
