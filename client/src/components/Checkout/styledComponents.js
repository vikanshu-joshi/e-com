import { styled, alpha } from '@mui/material/styles';
import {ListItemButton} from "@mui/material";

export const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor:theme.palette.common.white,
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
    },
}));

export const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#131A22',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    'input:hover ~ &': {
        backgroundColor: '#131A22',
    },
});

export const ListItem= styled(ListItemButton)(({ theme }) =>({
    backgroundColor:theme.palette.common.white,
    '&.Mui-selected ':{
        border: '2px dotted #fc8c03',
        backgroundColor: alpha('#fc8c03',0.2),
    }
}));
