import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {Container, Dialog, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const CardModal = (props) => {
    const [data, setData] = useState({ title: 'loading' })

    useEffect(() => {
        if(props.open === true) {
            fetch(`/api/tasks/${props.id}`).then(response => response.json()).then(data => { setData(data);})
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
            <DialogTitle>
                { data.title }
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {/*{data.toString()}*/}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

CardModal.propTypes = {
    open: PropTypes.bool,
    id: PropTypes.string
};
export default CardModal
