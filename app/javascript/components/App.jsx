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

const App = (props) => {
    window.current_user = props.user;
    window.pusher = new Pusher(props.pusher_key, {
        cluster: 'eu'
    });

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
    user: PropTypes.object,
    pusher_key: PropTypes.string
};
export default App
