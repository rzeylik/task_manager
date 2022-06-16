import React, {useEffect, useState} from 'react';
import {Popover} from "antd";
import {updateColor, updateDueTo} from "../card_actions";

const CardActionsColor = (props) => {
    const {
        cardId
    } = props

    const [visible, setVisible] = useState(false)
    const [color, setColor] = useState(props.color || '#000')

    useEffect(() => {
        setColor(props.color)
    }, [props.color])

    const hide = () => {
        setVisible(false)
    };

    const handleVisibleChange = visible => {
        setVisible(visible)
    };

    const saveColor = () => {
        updateColor(cardId, color)
        hide()
    }

    const removeColor = () => {
        setColor('#000')
        updateColor(cardId, null)
        hide()
    }

    const onColorChange = (e) => {
        setColor(e.currentTarget.value)
    }

    const content = (
        <div style={{ width: '250px'}}>
            <input id={`card-color-picker-${cardId}`} type="color" className="form-control form-control-color outline-none p-0 w-100 mb-2" color={color} title="Choose your color" onChange={onColorChange} />
            <div className="">
                <button onClick={saveColor} className={'btn btn-sm btn-primary me-1'}>Save</button>
                <button onClick={removeColor} className={'btn btn-sm btn-secondary me-1'}>Remove</button>
            </div>
        </div>
    );

    return (
        <>
            <Popover
                content={content}
                title={"Background"}
                trigger={"click"}
                visible={visible}
                onVisibleChange={handleVisibleChange}
                zIndex={1500}
            >
                <button className={'btn btn-sm btn-outline-secondary mb-1'}>Background</button>
            </Popover>
        </>
    )
};

export default CardActionsColor;
