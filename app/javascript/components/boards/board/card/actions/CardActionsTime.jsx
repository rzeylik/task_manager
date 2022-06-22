import React, {useEffect, useState} from 'react';
import {removeTime, updateColor, updateTime} from "../card_actions";
import {Popover, TimePicker} from "antd";
import moment from "moment";

const CardActionsTime = (props) => {
    const {
        cardId,
    } = props

    const [visible, setVisible] = useState(false)
    const [time, setTime] = useState(null)

    useEffect(() => {
        setTime(props.time ? moment(props.time, 'HH:mm:ss') : null)
    }, [props.time])

    const hide = () => { setVisible(false) };

    const handleVisibleChange = visible => { setVisible(visible) };

    const saveTime = () => {
        updateTime(cardId, time.format("HH:mm:ss"))
        hide()
    }

    const clearTime = () => {
        setTime(null)
        removeTime(cardId)
        hide()
    }

    const onTimeChange = (time) => { setTime(time) }

    const content = (
        <div style={{ width: '250px'}}>
            <TimePicker className={'w-100 mb-2'} onChange={onTimeChange} value={time} showNow={false} popupStyle={{zIndex: 2000}} />
            <div className="">
                <button onClick={saveTime} className={'btn btn-sm btn-primary me-1'}>Save</button>
                <button onClick={clearTime} className={'btn btn-sm btn-secondary me-1'}>Remove</button>
            </div>
        </div>
    );

    return (
        <>
            <Popover
                content={content}
                title={"Time"}
                trigger={"click"}
                visible={visible}
                onVisibleChange={handleVisibleChange}
                zIndex={1500}
            >
                <button className={'btn btn-sm btn-outline-secondary mb-1'}>Time</button>
            </Popover>
        </>
    )
};

export default CardActionsTime;
