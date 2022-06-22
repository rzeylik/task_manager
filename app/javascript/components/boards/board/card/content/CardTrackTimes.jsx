import React, {useState} from 'react';
import CardContentTitle from "./CardContentTitle";
import CardTrackTime from "./CardTrackTime";

const CardTrackTimes = (props) => {
    const { trackTimes } = props

    return (
        <>
            <CardContentTitle>Tracked time</CardContentTitle>
            <div className={'d-flex'}>
                {trackTimes.map((trackTime) => <CardTrackTime key={trackTime.id} trackTime={trackTime} />)}
            </div>
        </>
    );
};

CardTrackTimes.defaultProps = {
    trackTimes: []
}

export default CardTrackTimes;
