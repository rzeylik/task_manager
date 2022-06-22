import React, {useState} from 'react';
import RelatedCard from "./RelatedCard";
import CardContentTitle from "./CardContentTitle";
import UserCircle from "../../../../users/UserCircle";

const CardTrackTime = (props) => {
    const { trackTime } = props

    return (
        <div className={'d-flex align-items-center me-2'}>
            <UserCircle user={trackTime.user} />
            <span className={'mx-2'}>-</span>
            <div>{trackTime.duration}</div>
        </div>
    );
};

CardTrackTime.defaultProps = {
    trackTime: {}
}

export default CardTrackTime;
