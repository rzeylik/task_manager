import React, {Component, useState} from 'react'
import PropTypes from 'prop-types'

import {
    MovableCardWrapper,
    CardHeader,
    CardRightContent,
    CardTitle,
    Detail,
    Footer
} from 'react-trello/dist/styles/Base'
import Tag from 'react-trello/dist/components/Card/Tag'
import CardModal from "./CardModal";
import UserCircle from "../../../users/UserCircle";

const BoardCard = (props) => {
    const {
        assignments,
        bg_color,
        showDeleteButton,
        style,
        tagStyle,
        // onClick,
        // onDelete,
        onChange,
        className,
        id,
        title,
        label,
        description,
        tags,
        cardDraggable,
        editable,
        t
    } = props

    const [modalOpen, setModalOpen] = useState(false)

    const onClick = () => {
        setModalOpen(true)
    }

    const handleModalClose = () => {
        setModalOpen(false)
    }

    const onDelete = e => {
        props.onDelete()
        e.stopPropagation()
    }

    return (
        <div>
            <MovableCardWrapper
                data-id={id}
                onClick={onClick}
                style={style}
                className={`${className} p-0`}
            >
                { bg_color && (<div style={{backgroundColor: bg_color }} className="py-3 rounded-top"></div>) }
                <div className="p-2">
                    <Detail>
                        {title}
                    </Detail>
                    {
                        assignments.length !== 0 &&
                        <Footer>
                            { assignments.map((assignment) => <UserCircle key={assignment.id} size={30} user={assignment.user} className={'ms-1'} />) }
                        </Footer>
                    }
                </div>
            </MovableCardWrapper>
            <CardModal editable={editable} onDelete={props.onDelete} open={modalOpen} onClose={handleModalClose} id={id} />
        </div>

    )

}

BoardCard.propTypes = {
    showDeleteButton: PropTypes.bool,
    onDelete: PropTypes.func,
    onClick: PropTypes.func,
    style: PropTypes.object,
    tagStyle: PropTypes.object,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    label: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.array,
}

BoardCard.defaultProps = {
    showDeleteButton: true,
    onDelete: () => {},
    onClick: () => {},
    style: {},
    tagStyle: {},
    title: 'no title',
    description: '',
    label: '',
    tags: [],
    className: '',
    assignments: []
}

export default BoardCard
