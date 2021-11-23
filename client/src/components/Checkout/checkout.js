import React, {useState} from 'react';
import './checkout.css';
import {Container, Paper, Typography, Stepper, Step, StepLabel, StepContent, Button} from "@mui/material";
import PaymentForm from './paymentForm';
import AddressForm from './addressForm';
import ReviewOrder from './reviewOrder'
import Box from "@mui/material/Box";
import Truck from '../../truck-delivery.gif';

function Checkout(){
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const steps = [
        {
            label: "Address",
            description: <AddressForm/>,
        },
        {
            label: "Payment",
            description: <PaymentForm/>,

        },
        {
           label: "Review Order",
           description: <ReviewOrder/>,
        }
    ]
    const Confirmation = (
        <Box component='div'>
            <Typography variant='h5' >Thank you for your purchase!</Typography>
            <Typography variant='body1' >We are getting ready you products.</Typography>
            <img src={Truck} alt='Delivery Truck' />
        </Box>
    )
    return(
        <Container component='main' maxWidth='xs' style={{marginTop:'20px'}}>
            <Paper elevation={3} >
                <Typography variant="h4" align='center' style={{paddingTop:'10px', fontFamily:'monospace'}}>CHECKOUT</Typography>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel

                                optional={
                                    index === 2 ? (
                                        <Typography variant="caption">Last step</Typography>
                                    ) : null
                                }
                            >
                                {step.label}
                            </StepLabel>
                            <StepContent>
                                <Typography>{step.description}</Typography>
                                <Box component='div' sx={{ mb: 2 }}>

                                        <Button
                                            disabled={index === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                        </Button>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {/* ----------CHECK THIS---------- */}
                {activeStep===steps.length&&<Confirmation/>}
            </Paper>
        </Container>
    )
}

export default Checkout
