import React, {useState} from 'react';
import {Popover} from "antd";
import UserCircle from "../../../../users/UserCircle";
import {addUserToCard, removeUserFromCard} from "../card_actions";

const CardActionsMember = (props) => {
    const {
        cardId,
        user,
        remove,
        closePopup,
        editable
    } = props

    const [visible, setVisible] = useState(false)

    const handleVisibleChange = visible => {
        setVisible(visible)
    };

    const assignUser = () => {
        addUserToCard(cardId, user.id)

        setVisible(false)
    }

    const unassignUser = () => {
        removeUserFromCard(cardId, user.id)

        setVisible(false)
    }

    const content = (
        <div>
            <button onClick={remove ? unassignUser : assignUser} className={'btn btn-sm btn-outline-primary'}>{remove ? 'Remove from card' : 'Add to card'}</button>
        </div>
    );

    return (
        <Popover
            content={content}
            trigger={"click"}
            placement={'bottom'}
            visible={editable ? visible : false}
            onVisibleChange={handleVisibleChange}
            zIndex={1500}
        >
            <UserCircle onclick={() => setVisible(true)} user={user} className={'me-2'} />
        </Popover>
    );
};

CardActionsMember.defaultProps = {
    remove: false,
    closePopup: () => {}
}

export default CardActionsMember;
