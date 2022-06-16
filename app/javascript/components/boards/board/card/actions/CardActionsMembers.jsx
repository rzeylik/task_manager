import React, {useEffect, useState} from 'react';
import {updateDueTo} from "../card_actions";
import {Popover} from "antd";
import CardActionsMember from "./CardActionsMember";

const CardActionsMembers = (props) => {
    const {
        cardId,
        editable
    } = props

    const [visible, setVisible] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        if (visible === true) {
            fetch(`/api/tasks/${cardId}/users_to_assign`).then(response => response.json()).then(data => { setData(data);})
        }
    }, [visible])


    const handleVisibleChange = visible => {
        setVisible(visible)
    };

    const closePopup = () => {
        setVisible(false)
    }

    const content = (
        <div style={{ width: '250px'}}>
            <div className="mb-2">
                <div className="mb-2">Assign user: </div>
                <div className="d-flex flex-wrap">
                    { data.map((member) => (
                        <CardActionsMember key={member.id} editable={editable} closePopup={closePopup} user={member} cardId={cardId} />
                    )) }
                </div>
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
