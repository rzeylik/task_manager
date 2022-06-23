import React, {useEffect, useState} from 'react';
import BoardActivityItem from "./BoardActivityItem";
import {getActivity} from "../../board_actions";

const BoardSidebarActivity = ({ className, boardId }) => {
    const [activities, setActivities] = useState([])
    const [haveLastActivity, setHaveLastActivity] = useState(false)

    useEffect(() => {
        const channel = pusher.subscribe(`activity-channel-${boardId}`);
        channel.bind('add-activity', activity => {
            setActivities([activity, ...activities])
        });

        return () => {
            window.pusher.unsubscribe(`activity-channel-${boardId}`)
        }
    }, [activities])

    useEffect(() => {
        if (boardId) {
            getActivity(boardId).then(data => {
                setActivities(data.data.reverse())
                setHaveLastActivity(data.is_last)
            })
        }
    }, [boardId])

    const loadOlderActivity = () => {
        const lastActivityId = activities[activities.length - 1].id
        getActivity(boardId, lastActivityId).then(oldActivities => {
            setActivities([...activities, ...oldActivities.data.reverse()])
            setHaveLastActivity(oldActivities.is_last)
        })
    }

    return (
        <div className={className}>
            <h6 className={'text-muted'}>Activity</h6>
            <div className="">
                { activities.map(activity => (<BoardActivityItem key={activity.id} activity={activity} />)) }
                { !haveLastActivity && (
                    <div onClick={loadOlderActivity} className="text-center text-primary cursor-pointer">
                        See older activity?
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoardSidebarActivity;
