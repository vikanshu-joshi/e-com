import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export const Search = styled('div')(({theme}) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    borderRadius:'9px 9px 9px 9px',
    backgroundColor: alpha("#232F3E", 1),
    border:'1px solid #37475A',
    '&:hover': {
        backgroundColor: alpha("#232F3E", 0.9),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

export const SearchIconWrapper = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: '0px 9px 9px 0px',
    backgroundColor: alpha('#fc8c03',1),
    '&:hover': {
        backgroundColor: alpha('#fc8c03',0.9),
    },
    height: '40px',
    width: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    marginLeft: '10px',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingRight: `calc(1em )`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export const CartIconWrapper = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha('#fc8c03',1),
    '&:hover': {
        backgroundColor: alpha('#fc8c03',0.9),
    },
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))
