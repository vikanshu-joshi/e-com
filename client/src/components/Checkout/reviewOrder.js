import React from 'react';
import {IconButton, List, ListItem, ListItemText, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import {Link} from 'react-router-dom';

const ReviewOrder =()=>{
    const products = [
        {
            name: "Shuriken",
            quantity:'10'
        },
        {
            name:'Katana',
            quantity: '1'
        },
        {
            name:'Scrolls',
            quantity: '5'
        },
    ]
    return(
        <Box>
            <List>
                {products.map((product, index)=>(
                    <ListItem
                        id={index}
                        disableGutters
                        secondaryAction={
                            <IconButton
                                component={Link} to='/cart'
                                size='small'
                                variant='contained'
                                style={{backgroundColor:'#131A22', color:'white', marginRight:'10px'}}
                            >
                                <ModeEditSharpIcon/>
                            </IconButton>
                    }>
                        <ListItemText
                            primary={product.name}
                            secondary={
                                <React.Fragment>
                                    <Typography variant='overline'>QTY:{product.quantity}</Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    )
};
export default ReviewOrder;
