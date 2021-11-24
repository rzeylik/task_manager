import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {Container} from "@mui/material";
import BoardIndexCard from "./board/BoardIndexCard";

const BoardsIndex = (props) => {
    const [boards, setBoards] = useState([])

    useEffect(() => {
        fetch('/api/boards').then(response => response.json()).then(data => { setBoards(data);})
    }, [])

    return (
        <Container sx={{paddingTop: '20px', paddingBottom: '20px', flexGrow: '1'}}>
            <div className={'d-flex flex-wrap'}>
                { boards.map((board, index) => (
                    <BoardIndexCard key={index} board={board} />
                ))}
            </div>
        </Container>
    )
}

BoardsIndex.propTypes = {

};
export default BoardsIndex
