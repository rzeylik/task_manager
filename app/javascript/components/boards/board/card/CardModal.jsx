import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {Dialog} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CardContent from "./content/CardContent";
import CardActions from "./actions/CardActions";

const CardModal = ({editable, ...props}) => {
    const [data, setData] = useState({ title: 'loading', actions: [] })
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
            fullScreen={fullScreen}
        >
            <div className={'p-sm-4 ps-sm-5 p-3 ps-4'}>
                <div className="d-flex justify-content-between">
                    <div className="">
                        <h5 className={'mb-0'}>{ data.title }</h5>
                        <div className={'text-muted'}>In list <u>{ data.list_name }</u></div>
                    </div>
                    <div style={{cursor: 'pointer'}}><i className="fas fa-times fa-lg" onClick={props.onClose} /></div>
                </div>

                <div className="row pt-2">
                    <div className={`${editable ? 'col-sm-10 col-8' : 'col-12'} card-dialog-content`}>
                        <CardContent editable={editable} data={data} />
                    </div>
                    {
                        editable && (
                            <div className="col-sm-2 col-4 card-dialog-actions">
                                <CardActions editable={editable} data={data} onDelete={props.onDelete} />
                            </div>
                        )
                    }

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
