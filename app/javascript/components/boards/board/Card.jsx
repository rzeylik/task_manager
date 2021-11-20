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
import InlineInput from 'react-trello/dist/widgets/InlineInput'
import Tag from 'react-trello/dist/components/Card/Tag'
import DeleteButton from 'react-trello/dist/widgets/DeleteButton'
import CardModal from "./CardModal";

const Card = (props) => {
    const {
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

    // const updateCard = (card) => {
    //     onChange({...card, id})
    // }

    return (
        <div>
            <MovableCardWrapper
                data-id={id}
                onClick={onClick}
                style={style}
                className={className}
            >
                <Detail>
                    {title}
                </Detail>
                {tags && tags.length> 0 && (
                    <Footer>
                        {tags.map(tag => (
                            <Tag key={tag.title} {...tag} tagStyle={tagStyle} />
                        ))}
                    </Footer>
                )}
            </MovableCardWrapper>
            <CardModal onDelete={props.onDelete} open={modalOpen} onClose={handleModalClose} id={id} />
        </div>

    )

}

Card.propTypes = {
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

Card.defaultProps = {
    showDeleteButton: true,
    onDelete: () => {},
    onClick: () => {},
    style: {},
    tagStyle: {},
    title: 'no title',
    description: '',
    label: '',
    tags: [],
    className: ''
}

export default Card
