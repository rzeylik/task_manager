import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Button, DatePicker, Popover} from "antd";
import {updateDescription, updateDueTo} from "../card_actions";

const CardActionsDate = (props) => {
    const {
        cardId
    } = props

    const [visible, setVisible] = useState(false)
    const [dueTo, setDueTo] = useState(props.dueTo || '')

    useEffect(() => {
        setDueTo(props.dueTo || '')
    }, [props.dueTo])

    const hide = () => {
        setVisible(false)
    };

    const handleVisibleChange = visible => {
        setVisible(visible)
    };

    const saveDueTo = () => {
        updateDueTo(cardId, dueTo)
        hide()
    }

    const removeDueTo = () => {
        setDueTo('')
        updateDueTo(cardId, null)
        hide()
    }

    const content = (
        <div style={{ width: '250px'}}>
            <div className="mb-2">
                <label htmlFor="{'due-to-date'}">Due to</label>
                <input id={'due-to-date'} type="datetime-local" value={dueTo} onChange={(e) => {setDueTo(e.currentTarget.value)}} className={'form-control w-100'}/>
            </div>
            <div className="">
                <button onClick={saveDueTo} className={'btn btn-sm btn-primary me-1'}>Save</button>
                <button onClick={removeDueTo} className={'btn btn-sm btn-secondary me-1'}>Remove</button>
            </div>
        </div>
    );

    return (
        <>
            <Popover
                content={content}
                title={"Dates"}
                trigger={"click"}
                visible={visible}
                onVisibleChange={handleVisibleChange}
                zIndex={1500}
            >
                <button className={'btn btn-sm btn-outline-secondary mb-1'}>Dates</button>
            </Popover>
        </>
    )

}

CardActionsDate.propTypes = {}

export default CardActionsDate
