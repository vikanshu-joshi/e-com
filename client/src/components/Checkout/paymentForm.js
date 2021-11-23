import React, {useState} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {BpCheckedIcon, BpIcon} from './styledComponents'
import {Typography} from "@mui/material";

function BpRadio(props) {
    return (
        <Radio
            sx={{
                '&:hover': {
                    bgcolor: 'transparent',
                },
            }}
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon />}
            {...props}
        />
    );
}
function PaymentForm() {
    const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery');
    const handleChange=(event)=>{
        // ----------CHECK THIS----------
        console.log(paymentMethod)
        setPaymentMethod(event.target.value);
    }
    return(
        <FormControl component="fieldset">
            <Typography variant='subtitle'>Select Payment Method:</Typography>
            <RadioGroup defaultValue='Cash On Delivery' onChange={handleChange}>
                <FormControlLabel value="Cash On Delivery" control={<BpRadio />} label="Cash On Delivery" />
                <FormControlLabel value="Credit Card/Debit Card" control={<BpRadio />} label="Credit Card/Debit Card"/>
                <FormControlLabel value="UPI" control={<BpRadio />} label="UPI"/>
            </RadioGroup>
        </FormControl>
    )
}

export default PaymentForm;
