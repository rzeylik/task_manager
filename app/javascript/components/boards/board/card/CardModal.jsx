import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {Dialog} from "@mui/material";
import CardContent from "./content/CardContent";
import CardActions from "./actions/CardActions";

const CardModal = (props) => {
    const [data, setData] = useState({ title: 'loading', actions: [] })

    useEffect(() => {
        if(props.open === true) {
            fetch(`/api/tasks/${props.id}`).then(response => response.json()).then(data => { setData(data);})
            const channel = window.pusher.subscribe(`task-channel-${props.id}`);
            channel.bind('task-update', (data) => {
                setData(data);
            })
        } else {
            window.pusher.unsubscribe(`task-channel-${props.id}`)
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
            <div className={'p-4 ps-5'}>
                <div className="d-flex justify-content-between">
                    <div className="">
                        <h5 className={'mb-0'}>{ data.title }</h5>
                        <div className={'text-muted'}>In list <u>{ data.list_name }</u></div>
                    </div>
                    <div style={{cursor: 'pointer'}}><i className="fas fa-times fa-lg" onClick={props.onClose} /></div>
                </div>

                <div className="row pt-2">
                    <div className="col-10 card-dialog-content">
                        <CardContent data={data} />
                    </div>
                    <div className="col-2 card-dialog-actions">
                        <CardActions data={data} onDelete={props.onDelete} />
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
