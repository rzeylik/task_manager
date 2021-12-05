import React, {useState} from 'react'
import PropTypes from 'prop-types'
import CardHistory from "./CardHistory";
import CardDescription from "./CardDescription";
import CardAssignments from "./CardAssignments";
import CardAttachments from "./CardAttachments";
import CardDueTo from "./CardDueTo";
import CardRelatedCards from "./CardRelatedCards";

const CardContent = (props) => {
    const {
        data
    } = props

    return (
        <>
            { data?.due_to &&
                <div className="mb-2">
                    <CardDueTo dueTo={data.due_to} />
                </div>
            }
            { data?.assignments?.length !== 0 &&
                <div className="mb-2">
                    <CardAssignments assignments={data.assignments} cardId={data.id} />
                </div>
            }
            <div className="mb-2">
                <CardDescription cardId={data.id} description={data.description} />
            </div>

            { data?.related_cards?.length !== 0 &&
                <div className={'mb-2'}>
                    <CardRelatedCards cardId={data.id} relatedCards={data.related_cards} />
                </div>
            }

            {
                data?.attachments?.length !== 0 &&
                <div className="mb-2">
                    <CardAttachments cardId={data.id} attachments={data.attachments} />
                </div>
            }
            <div className="mb-2">
                <CardHistory actions={data.actions} />
            </div>
        </>
    )

}

CardContent.propTypes = {
    data: PropTypes.object
}

export default CardContent
