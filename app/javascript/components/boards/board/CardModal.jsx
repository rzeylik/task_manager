import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {Dialog} from "@mui/material";

const CardModal = (props) => {
    const [data, setData] = useState({ title: 'loading', actions: [] })

    useEffect(() => {
        if(props.open === true) {
            fetch(`/api/tasks/${props.id}`).then(response => response.json()).then(data => { setData(data); console.log(data)})

        }
    }, [props.open])

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            maxWidth={'md'}
            fullWidth={true}
            sx={{marginBottom: '100px'}}
        >
            <div className={'p-4'}>
                <div className="d-flex justify-content-between">
                    <div className="">
                        <h5 className={'mb-0'}>{ data.title }</h5>
                        <div className={'text-muted'}>In list <u>{ data.list_name }</u></div>
                    </div>
                    <div style={{cursor: 'pointer'}}><i className="fas fa-times fa-lg" onClick={props.onClose} /></div>
                </div>

                <div className="row pt-2">
                    <div className="col-10 card-dialog-content">
                        <h5>History</h5>
                        { data.actions.map(action => <div key={action.id}>{action.user_name} {action.action} ({action.time_ago} ago)</div>)}
                    </div>
                    <div className="col-2 card-dialog-actions">
                        <h6>Add to card</h6>
                        <button className={'btn btn-sm btn-outline-secondary'}>Members</button>
                        <hr/>
                        <h6>Actions</h6>
                        <button className={'btn btn-sm btn-danger'} onClick={props.onDelete}>Delete card</button>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

CardModal.propTypes = {
    open: PropTypes.bool,
    id: PropTypes.string
};
export default CardModal
