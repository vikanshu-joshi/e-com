import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import {Search, SearchIconWrapper, StyledInputBase, CartIconWrapper} from './styledComponents'
import {Toolbar} from "@mui/material";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function stringAvatar(name) {
    return {
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [category, setCategory] = useState("")
    const isMenuOpen = Boolean(anchorEl);

    const handleClickListItem = (event, category) => {
        setCategory(category);
        setAnchorEl(null);    };
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const renderCategoryMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            MenuListProps={{
                role: 'listbox',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={(event)=>handleClickListItem(event,'Women')} >Women</MenuItem>
            <MenuItem onClick={(event)=>handleClickListItem(event,'Men')}>Men</MenuItem>
            <MenuItem onClick={(event)=>handleClickListItem(event,'Furniture')}>Furniture</MenuItem>
            <MenuItem onClick={(event)=>handleClickListItem(event,'Books')}>Books</MenuItem>
            <MenuItem onClick={(event)=>handleClickListItem(event,'Mobile')}>Mobile</MenuItem>

        </Menu>
    );


    return (

        <Box sx={{flexGrow: 1}}>
            <AppBar position='sticky' style={{backgroundColor: '#131A22', color: 'white'}}>
                <Toolbar>
                        <IconButton>
                            <Typography variant='subtitle' style={{color:'white'}}>
                            E-COMMERCE
                            </Typography>
                        </IconButton>
                    <Box sx={{flexGrow: 1}}/>
                    <Search>
                        <StyledInputBase placeholder='Search...'/>
                        <Button size='medium' style={{color: 'white'}} endIcon={<KeyboardArrowDownIcon/>}
                                onClick={handleMenuOpen}>{category?category:"All Categories"}</Button>
                        <SearchIconWrapper>
                            <IconButton color='inherit'>
                                <SearchIcon fontSize='large'/>
                            </IconButton>
                        </SearchIconWrapper>
                    </Search>

                    <Box sx={{flexGrow: 1}}/>
                    <Box component='div' sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: 'fit-content',
                        '& hr': {
                            mx: 1,
                        },
                    }}>
                        <Badge badgeContent={1} color='error' overlap="circular">
                            <CartIconWrapper>
                                <IconButton>
                                    <ShoppingCartRoundedIcon fontSize='medium' style={{color: '#131A22'}}/>
                                </IconButton>
                            </CartIconWrapper>
                        </Badge>
                        <Divider orientation="vertical"  flexItem/>
                        <Chip
                            avatar={<Avatar {...stringAvatar('SMRITI GARG')}/>}
                            label="SMRITI"
                            style={{color: 'white'}}
                            variant='outlined'
                            // onClick={handleProfileMenuOpen}
                        />
                    </Box>
                </Toolbar>
            </AppBar>
            {renderCategoryMenu}
        </Box>
    )
}

export default Navbar;
