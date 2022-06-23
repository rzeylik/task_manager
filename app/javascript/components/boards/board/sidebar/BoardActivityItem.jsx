import React from 'react';

const BoardActivityItem = ({ activity }) => {
    return (
        <div className={'activity-item mb-1'}>
            <div className="">
                <span className={'text-underline me-1'}>{activity.user.last_name} {activity.user.first_name}</span>
                <span>{activity.action}</span>
            </div>
            <div className="text-right text-muted activity-item-time">
                {activity.created_at}
            </div>

        </div>
    );
};

export default BoardActivityItem;
