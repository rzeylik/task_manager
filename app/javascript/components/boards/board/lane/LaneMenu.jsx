import React from 'react'
import PropTypes from 'prop-types'

import { Popover } from 'react-popopo'

import { CustomPopoverContent, CustomPopoverContainer } from 'react-trello/dist/styles/Base'

import {
    LaneMenuTitle,
    LaneMenuHeader,
    LaneMenuContent,
    DeleteWrapper,
    LaneMenuItem,
    GenDelButton,
    MenuButton,
} from 'react-trello/dist/styles/Elements'

const TEST= PropTypes.elementType;

const LaneMenu = ({t, onDelete}) => (
    <Popover position="bottom" PopoverContainer={CustomPopoverContainer} PopoverContent={CustomPopoverContent} trigger={<MenuButton>⋮</MenuButton>}>
        <div className="">
            <button onClick={onDelete} className={'btn btn-sm btn-outline-primary '}>Delete lane</button>
        </div>
    </Popover>
)

export default LaneMenu;
