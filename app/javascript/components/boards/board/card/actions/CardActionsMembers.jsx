import React, {useEffect, useState} from 'react';
import {updateDueTo} from "../card_actions";
import {Popover} from "antd";

const CardActionsMembers = (props) => {
    const {
        cardId
    } = props

    const [visible, setVisible] = useState(false)
    const [data, setData] = useState([])
    // const [dueTo, setDueTo] = useState(props.dueTo || '')

    useEffect(() => {
        if (visible === true) {
            fetch(`/api/tasks/${cardId}/users_to_assign`).then(response => response.json()).then(data => { setData(data);})
        }
    }, [visible])

    // useEffect(() => {
    //     setDueTo(props.dueTo || '')
    // }, [props.dueTo])

    const hide = () => {
        setVisible(false)
    };

    const handleVisibleChange = visible => {
        setVisible(visible)
    };

    const saveDueTo = () => {
        // updateDueTo(cardId, dueTo)
        hide()
    }

    const removeDueTo = () => {
        // setDueTo('')
        // updateDueTo(cardId, null)
        hide()
    }

    const content = (
        <div style={{ width: '250px'}}>
            <div className="mb-2">
                Possible members:
                { data.map((member) => (
                    <div key={member.id}>{member.email}</div>
                )) }

                {/*<label htmlFor="{'due-to-date'}">Due to</label>*/}
                {/*<input id={'due-to-date'} type="datetime-local" value={dueTo} onChange={(e) => {setDueTo(e.currentTarget.value)}} className={'form-control w-100'}/>*/}
            </div>
            <div className="">
                {/*<button onClick={saveDueTo} className={'btn btn-sm btn-primary me-1'}>Save</button>*/}
                {/*<button onClick={removeDueTo} className={'btn btn-sm btn-secondary me-1'}>Remove</button>*/}
            </div>
        </div>
    );

    return (
        <>
            <Popover
                content={content}
                title={"Members"}
                trigger={"click"}
                visible={visible}
                onVisibleChange={handleVisibleChange}
                zIndex={1500}
            >
                <button className={'btn btn-sm btn-outline-secondary mb-1'}>Members</button>
            </Popover>
        </>
    )
};

export default CardActionsMembers;
