import React, {useEffect, useState} from 'react';
import {Popover, Select} from "antd";
import {Option} from "antd/es/mentions";
import {addRelation, getRelatedCardsOptions} from "../card_actions";

const CardActionsRelatedCards = (props) => {
    const {
        cardId
    } = props

    const [visible, setVisible] = useState(false)
    const [cardsOptions, setCardsOptions] = useState([])

    let relatedCardId = ''

    const changeRelatedCardId = (value, _option) => {
        relatedCardId = value
    }

    useEffect(() => {
        if (visible) {
            getRelatedCardsOptions(cardId).then(res => res.json()).then(data => {
                setCardsOptions(data)
            })
        }
    }, [visible])

    const handleVisibleChange = visible => {
        setVisible(visible)
    };

    const addRelatedCard = () => {
        if (relatedCardId) {
            addRelation(cardId, relatedCardId)
            setVisible(false)
        }
    }

    const close = () => {
        setVisible(false)
    }

    const content = (
        <div style={{width: '250px'}}>
            <Select
                showSearch
                id={'relatedTaskId'}
                className={'mb-2'}
                style={{ width: '100%' }}
                allowClear={true}
                placeholder="Select a card"
                optionFilterProp="children"
                onChange={changeRelatedCardId}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                getPopupContainer={node => node.parentNode}
            >
                { cardsOptions.map(option => <Select.Option key={option.id} value={option.id}>{option.title} ({option.list_name}))</Select.Option>)}
            </Select>
            <div onClick={addRelatedCard} className="btn btn-sm btn-primary me-1">Add</div>
            <div onClick={close} className="btn btn-sm btn-secondary">Cancel</div>
        </div>
    );

    return (
        <Popover
            content={content}
            title={"Related cards"}
            trigger={"click"}
            visible={visible}
            onVisibleChange={handleVisibleChange}
            zIndex={1500}
        >
            <button className={'btn btn-sm btn-outline-secondary mb-1'}>Related cards</button>
        </Popover>
    );
};

export default CardActionsRelatedCards;
