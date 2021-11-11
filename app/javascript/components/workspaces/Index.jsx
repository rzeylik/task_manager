import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {Container} from "@mui/material";

const WorkspacesIndex = (props) => {
    const [workspaces, setWorkspaces] = useState([])

    useEffect(() => {
        fetch('/api/workspaces').then(response => response.json()).then(data => { setWorkspaces(data); console.log(data)})
    }, [])

    return (
        <Container sx={{paddingTop: '20px', paddingBottom: '20px', flexGrow: '1'}}>
            { workspaces.map((w, index) => (
                <h2 key={index}>{w.name}</h2>
            ))}
        </Container>
    )
}

WorkspacesIndex.propTypes = {

};
export default WorkspacesIndex
