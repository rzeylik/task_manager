import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import Board from 'react-trello'
import {useParams} from "react-router-dom";

const BoardsShow = (props) => {
    let { id } = useParams();

    const data = {
        lanes: [
            {
                id: 'lane1',
                title: 'Planned Tasks',
                label: '2/2',
                cards: [
                    {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: false},
                    {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}},
                    {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}},
                    {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}},
                    {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}},
                    {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}},
                    {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}},
                    {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}},
                ]
            },
            {
                id: 'lane2',
                title: 'Completed',
                label: '0/0',
                cards: []
            }
        ]
    }

    return (
        <Board data={data} editable={true} canAddLanes={true} draggable={true}/>
    )
}

BoardsShow.propTypes = {

};
export default BoardsShow
