import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {Container} from "@mui/material";

const BoardsIndex = (props) => {
    const [boards, setBoards] = useState([])

    useEffect(() => {
        fetch('/api/boards').then(response => response.json()).then(data => { setBoards(data);})
    }, [])

    return (
        <Container sx={{paddingTop: '20px', paddingBottom: '20px', flexGrow: '1'}}>
            { boards.map((w, index) => (
                <h2 key={index}>{w.name}</h2>
            ))}
        </Container>
    )
}

BoardsIndex.propTypes = {

};
export default BoardsIndex
