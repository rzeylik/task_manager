import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"

const WorkspacesIndex = (props) => {
    const [workspaces, setWorkspaces] = useState([])

    useEffect(() => {
        fetch('/api/workspaces').then(response => response.json()).then(data => { setWorkspaces(data); console.log(data)})
    }, [])

    return (
        <div>
            { workspaces.map((w, index) => (
                <h2 key={index}>{w.name}</h2>
            ))}
        </div>
    )
}

WorkspacesIndex.propTypes = {

};
export default WorkspacesIndex
