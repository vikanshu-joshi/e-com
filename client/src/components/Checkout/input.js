import React from 'react';
import {DialogContentText, TextField} from "@mui/material";

const Input = ({label, type}) => {
    return (
        <React.Fragment>
            <DialogContentText sx={{textAlign:'center'}}>
                {label}
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                type={type}
                fullWidth
                variant="outlined"
            />
            <br/>
        </React.Fragment>
    )
};

export default Input;
