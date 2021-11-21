import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    CardForm,
    CardHeader,
    CardRightContent,
    CardTitle,
    CardWrapper,
    Detail
} from 'react-trello/dist/styles/Base'
import {AddButton, CancelButton} from 'react-trello/dist/styles/Elements'
import EditableLabel from 'react-trello/dist/widgets/EditableLabel'

class NewCardForm extends Component {
    updateField = (field, value) => {
        this.setState({[field]: value})
    }

    handleAdd = () => {
        this.props.onAdd(this.state)
    }

    render() {
        const {onCancel, t} = this.props
        return (
            <CardForm>
                <CardWrapper>
                    <div className={'newCardTitleInputWrapper'}>
                        <EditableLabel className={'newCardTitleInput'} placeholder={t('placeholder.title')} onChange={val => this.updateField('title', val)} autoFocus />
                    </div>
                </CardWrapper>
                <AddButton className={'btn btn-success'} onClick={this.handleAdd}>{t('button.Add card')}</AddButton>
                <CancelButton className={'btn btn-secondary'} onClick={onCancel}>{t('button.Cancel')}</CancelButton>
            </CardForm>
        )
    }
}

NewCardForm.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
}

NewCardForm.defaultProps = {
}

export default NewCardForm
