import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"

const BoardsIndex = (props) => {
    const [boards, setBoards] = useState([])

    useEffect(() => {
        fetch('/api/boards').then(response => response.json()).then(data => { setBoards(data);})
    }, [])

    return (
        <div>
            { boards.map((w, index) => (
                <h2 key={index}>{w.name}</h2>
            ))}
        </div>
    )
}

BoardsIndex.propTypes = {

};
export default BoardsIndex
