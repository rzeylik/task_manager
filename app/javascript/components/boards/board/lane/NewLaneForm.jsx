import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { LaneTitle, NewLaneButtons, Section } from 'react-trello/dist/styles/Base'
import { AddButton, CancelButton } from 'react-trello/dist/styles/Elements'
import NewLaneTitleEditor from 'react-trello/dist/widgets/NewLaneTitleEditor'
import { uuid } from 'uuidv4';

class NewLane extends Component {
    handleSubmit = () => {
        this.props.onAdd({
            id: uuid(),
            title: this.getValue()
        })
    }

    getValue = () => this.refInput.getValue()

    onClickOutside = (a,b,c) => {
        if (this.getValue().length > 0) {
            this.handleSubmit()
        } else {
            this.props.onCancel()
        }
    }

    render() {
        const { onCancel, t } = this.props
        return (
            <Section>
                <LaneTitle>
                    <NewLaneTitleEditor
                        ref={ref => (this.refInput = ref)}
                        placeholder={t('placeholder.title')}
                        onCancel={this.props.onCancel}
                        onSave={this.handleSubmit}
                        resize='vertical'
                        border
                        autoFocus
                    />
                </LaneTitle>
                <NewLaneButtons>
                    <AddButton className={'btn btn-success'} onClick={this.handleSubmit}>{t('button.Add lane')}</AddButton>
                    <CancelButton className={'btn btn-secondary'} onClick={onCancel}>{t('button.Cancel')}</CancelButton>
                </NewLaneButtons>
            </Section>
        )
    }
}

NewLane.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
}

NewLane.defaultProps = {}

export default NewLane
