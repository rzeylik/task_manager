import React from "react"
import PropTypes from "prop-types"
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Header from "./layout/Header";
import {Container} from "@mui/material";
import WorkspacesIndex from "./workspaces/Index";
import HomeIndex from "./home/Index";
import NotFound from "./pages/NotFound";
import Footer from "./layout/Footer";
import BoardsIndex from "./boards/Index";
import BoardsShow from "./boards/Show";

const App = (props) => {
    return (
        <BrowserRouter>
            <div className="site">
                <Header isLoggedIn={!!props.user} />
                    <Routes>
                        <Route path="/" element={<HomeIndex />} />
                        <Route path="workspaces" element={<WorkspacesIndex />} />
                        <Route path="boards" element={<BoardsIndex />} />
                        <Route path="boards/:id" element={<BoardsShow />} />
                        <Route path={"*"} element={<NotFound />} />
                    </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

App.propTypes = {
    user: PropTypes.object
};
export default App
