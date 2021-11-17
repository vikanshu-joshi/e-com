import React from 'react';
import {Button, Container, Paper, Typography} from "@mui/material";

const ForgotPassword=()=>{
    return(
        <Container>
            <Paper elevation={3}>
                <form>
                    <Typography variant='h5' gutterBottom>FORGOT PASSWORD?</Typography>
                    <Button variant='contained' color='primary'>Submit</Button>
                </form>

            </Paper>
        </Container>
    )
}
export default ForgotPassword
