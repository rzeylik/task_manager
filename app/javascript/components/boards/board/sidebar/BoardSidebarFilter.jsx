import React from 'react';
import {Option} from "antd/es/mentions";
import {Select} from "antd";

const BoardSidebarFilter = (props) => {
    const {
        lanes,
        setLanes,
        users,
        className
    } = props

    const filter = (value, _option) => {
        const newLanes = JSON.parse(JSON.stringify(lanes));
        const userId = value

        newLanes.lanes.forEach(lane => {
            lane.cards.forEach(card => {
                const assignments = card.assignments.filter(assignment => assignment.user.id === Number.parseInt(userId))
                if (assignments.length === 0 && userId) {
                    card.style = {
                        display: 'none'
                    }
                } else {
                    card.style = {}
                }
            })
        })

        setLanes(newLanes)
    }

    return (
        <div className={className}>
            <h5>Filter cards by user</h5>
            <Select
                showSearch
                id={'userFilterId'}
                className={'mb-2'}
                style={{ width: '100%' }}
                allowClear={true}
                placeholder="Select a user"
                optionFilterProp="children"
                onChange={filter}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                { users.map(user => <Select.Option key={user.id} value={user.id}>{user.last_name} {user.first_name}</Select.Option>)}
            </Select>
        </div>
    );
};

BoardSidebarFilter.defaultProps = {
    users: []
}

export default BoardSidebarFilter;
