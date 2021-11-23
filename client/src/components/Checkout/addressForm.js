import React, {useState} from 'react';
import {ListItem} from './styledComponents';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
    List,
    ListItemText,
    Typography
} from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Input from './input'

function AddressForm() {
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [open, setOpen] = useState(false);
    const addresses = [
        {
            id: 1,
            name: 'Watson',
            address: '221 Baker Street',
            pincode: '435296',
            landmark: 'Stop using my card Sherlock!',
            phone: '111111'
        },
        {
            id: 2,
            name: 'Sherlock',
            address: '221 Baker Street',
            pincode: '123567',
            landmark: 'Mrs. Hudson',
            phone: '00000'
        },
    ];
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    const addAddress = (

        <Dialog fullWidth maxWidth='md' open={open} onClose={handleClose}>
            <Box
                noValidate
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    width: 'fit-content',
                }}
                onSubmit=''
            >
                <DialogTitle sx={{textAlign: 'center', fontWeight: 'bold'}}>Add Address</DialogTitle>
                <Input label="Name" type='text'/>
                <Input label="Mobile Number" type='text'/>
                <Input label="Pincode" type='text'/>
                <Input label="Flat, House no., Building" type='text'/>
                <Input label="Area, Colony,Sector" type='text'/>
                <Input label="Landmark" type='text'/>
                <Input label="Town/City" type='text'/>
                <Input label="State" type='text'/>
                <DialogActions>
                    <Button size='large' onClick={handleClose}>Cancel</Button>
                    <Button type='submit' size='large' variant='contained' style={{backgroundColor: '#fc8c03'}}
                            onClick={handleClose}>Add</Button>
                </DialogActions>

            </Box>
        </Dialog>

    )


    return (
        <Box >
            <List>
                {addresses.map((address, index) => (
                    <ListItem
                        divider='true'
                        selected={selectedIndex === address.id}
                        onClick={(event) => handleListItemClick(event, address.id)}
                    >
                        <ListItemText
                            primary={address.name}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{display: 'block'}}
                                        component="span"
                                        variant="button"
                                        color="text.primary"
                                    >
                                        {address.address}

                                    </Typography>
                                    <Typography sx={{display: 'block'}}
                                                variant='overline'>Landmark: {address.landmark}</Typography>
                                    <Typography sx={{display: 'block'}}
                                                variant='overline'>Pincode: {address.pincode}</Typography>
                                    <Typography sx={{display: 'block'}}
                                                variant='overline'>Contact: {address.phone}</Typography>
                                </React.Fragment>
                            }
                        />

                    </ListItem>

                ))}
            </List>
            <IconButton style={{backgroundColor: '#131A22', color: 'white'}} onClick={handleOpen}>
                <AddRoundedIcon/>
            </IconButton>
            {addAddress}
        </Box>
    )
}

export default AddressForm;
