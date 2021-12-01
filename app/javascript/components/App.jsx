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
import Pusher from "pusher-js";
import WorkspaceEdit from "./workspaces/WorkspaceEdit";

window.pusher = new Pusher('17df5d5417699077228b', {
    cluster: 'eu'
});



const App = (props) => {
    window.current_user = props.user;

    return (
        <BrowserRouter>
            <div className="site">
                <Header isLoggedIn={!!props.user} user={props.user} />
                    <Routes>
                        <Route path="/" element={<WorkspacesIndex />} />
                        <Route path="workspaces/:id/edit" element={<WorkspaceEdit />} />
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
