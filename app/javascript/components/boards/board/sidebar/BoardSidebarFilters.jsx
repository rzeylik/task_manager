import React, {useEffect, useState} from 'react';
import {Select} from "antd";
import moment from "moment";

const BoardSidebarFilters = (props) => {
    const {
        lanes,
        setLanes,
        users,
        className
    } = props

    const [assignmentFilters, setAssignmentFilters] = useState({ noOne: false, me: false, user: false})
    const [dueToFilters, setDueToFilters] = useState({ noDue: false, dueToday: false, })
    const [assignmentUserId, setAssignmentUserId] = useState(null)

    useEffect(() => {
        const newLanes = JSON.parse(JSON.stringify(lanes));

        newLanes.lanes.forEach(lane => {
            lane.cards.forEach(card => {
                const assignments = card.assignments
                const dueTo = moment(card.due_to)
                const today = moment(new Date())
                if (
                    (
                        (assignmentFilters.noOne && assignments.length === 0) ||
                        (assignmentFilters.me && assignments.filter(a => a.user.id === Number.parseInt(current_user.id)).length !== 0) ||
                        ((assignmentFilters.user && assignmentUserId) ? assignments.filter(a => a.user.id === Number.parseInt(assignmentUserId)).length !== 0 : false) ||
                        (!assignmentFilters.noOne && !assignmentFilters.me && !(assignmentFilters.user && assignmentUserId))
                    ) &&
                    (
                        (dueToFilters.noDue && dueTo.format("DD/MM/YYYY") === "Invalid date") ||
                        (dueToFilters.dueToday && dueTo.format("DD/MM/YYYY") === today.format("DD/MM/YYYY")) ||
                        (!dueToFilters.noDue && !dueToFilters.dueToday)
                    )
                ) {
                    card.style = {}
                } else {
                    card.style = { display: 'none' }
                }
            })
        })

        setLanes(newLanes)
    }, [assignmentFilters, dueToFilters])



    const onAssignmentUserChange = (value, _option) => {
        setAssignmentUserId(value || null)
        setAssignmentFilters({
            ...assignmentFilters,
            user: !!value
        })
    }

    return (
        <div className={className}>
            <h6 className={'text-muted'}>Filters</h6>
            <div className={"text-15 mb-1"}>Assignments</div>
            <div className="d-flex">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="noOneFilter" checked={assignmentFilters.noOne} onChange={(e) => { setAssignmentFilters({...assignmentFilters, noOne: e.currentTarget.checked})}} />
                    <label className="form-check-label" htmlFor="noOneFilter">
                        No Assignments
                    </label>
                </div>
            </div>
            <div className="d-flex">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="meFilter" checked={assignmentFilters.me} onChange={(e) => { setAssignmentFilters({...assignmentFilters, me: e.currentTarget.checked})}} />
                    <label className="form-check-label" htmlFor="meFilter">
                        Cards assigned to me
                    </label>
                </div>
            </div>
            <div className="d-flex align-items-center">
                <div className="form-check mb-0">
                    <input className="form-check-input" type="checkbox" id="userFilter" checked={assignmentFilters.user} onChange={(e) => { setAssignmentFilters({...assignmentFilters, user: e.currentTarget.checked})}} />
                </div>
                <div className="w-100">
                    <Select
                        showSearch
                        id={'userFilterId'}
                        className={''}
                        style={{ width: '100%' }}
                        allowClear={true}
                        placeholder="Select a user"
                        optionFilterProp="children"
                        onChange={onAssignmentUserChange}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        { users.filter(u => u.id !== current_user.id).map(user => <Select.Option key={user.id} value={user.id}>{user.last_name} {user.first_name}</Select.Option>)}
                    </Select>
                </div>
            </div>
            <hr/>
            <div className={"text-15 mb-1"}>Due date</div>
            <div className="d-flex">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="noDueFilter" checked={dueToFilters.noDue} onChange={(e) => { setDueToFilters({...dueToFilters, noDue: e.currentTarget.checked})}} />
                    <label className="form-check-label" htmlFor="noDueFilter">
                        Without due date
                    </label>
                </div>
            </div>
            <div className="d-flex">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="dueTodayFilter" checked={dueToFilters.dueToday} onChange={(e) => { setDueToFilters({...dueToFilters, dueToday: e.currentTarget.checked})}} />
                    <label className="form-check-label" htmlFor="dueTodayFilter">
                        Due to today
                    </label>
                </div>
            </div>
        </div>
    );
};

BoardSidebarFilters.defaultProps = {
    users: []
}

export default BoardSidebarFilters;
