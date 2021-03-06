import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import CardContentTitle from "./CardContentTitle";
import TextArea from "antd/es/input/TextArea";
import {updateDescription} from "../card_actions";

const CardDescription = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [description, setDescription] = useState(props.description)

    useEffect(() => {
        setDescription(props.description)
    }, [props.description])

    const {
        cardId,
        editable
    } = props

    const enableEditMode = () => {
        if (!editable) { return false }
        setEditMode(true)
        document.getElementById('card-description-edit').focus()
    }

    const disableEditMode = () => {
        setEditMode(false)
        setDescription(props.description)
    }

    const saveDescription = (e) => {
        updateDescription(cardId, description)
        setDescription(description)
        setEditMode(false)
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }

    return (
        <>
            <CardContentTitle>Description</CardContentTitle>
            <div onClick={enableEditMode} className={`${editMode ? 'd-none' : ''}`}>
                {
                    description ||
                    <div className={'fake-textarea'}>
                        { editable ? "Add some description here..." : "There's no description yet" }
                    </div>
                }
            </div>
            <div className={`${editMode ? '' : 'd-none'}`}>
                <TextArea autoFocus id={'card-description-edit'} value={description} onChange={onDescriptionChange} placeholder={'Add some description here...'} rows={3} className={'w-100 p-2 mb-2    '} />
                <div>
                    <button onClick={saveDescription} className={'btn btn-sm btn-primary me-1'}>Save</button>
                    <button onClick={disableEditMode} className={'btn btn-sm btn-secondary'}>Cancel</button>
                </div>

            </div>
        </>
    )

}

CardDescription.propTypes = {
    cardId: PropTypes.string,
    description: PropTypes.string,
    editable: PropTypes.bool
}

export default CardDescription
