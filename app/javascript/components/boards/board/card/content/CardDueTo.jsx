import React from 'react';
import moment from "moment";

const CardDueTo = (props) => {
    const {
        dueTo
    } = props

    const formattedDate = () => {
        const date = new Date(dueTo)
        const dateWrapper = moment(date)
        return dateWrapper.format('DD/MM/YYYY HH:mm')
    }

    return (
        <div>
            <span className={'text-muted'}>due to { moment(dueTo).format('DD/MM/YYYY HH:mm') }</span>
        </div>
    );
};

export default CardDueTo;
