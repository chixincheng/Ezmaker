import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SortIcon from '@mui/icons-material/Sort';
import { IconButton } from '@mui/material'
import images from '../Images';


const SortButton = ()=>{

    const { store } = useContext(GlobalStoreContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);


    function handleSortByNewestDate(){
        store.sortByNewest();
        setAnchorEl(null);
    }

    function handleSortByOldestDate(){
        store.sortByOldest();
        setAnchorEl(null);
    }

    function handleSortByViews(){
        store.sortByViews();
        setAnchorEl(null);
    }

    function handleSortByLikes(){
        store.sortByLikes();
        setAnchorEl(null);
    }

    function handleSortByDislikes(){
        store.sortByDislikes();
        setAnchorEl(null);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const menulist = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id="primary-search-account-menu"
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
                <MenuItem onClick={handleSortByNewestDate}>Publish Date (Newest)</MenuItem>
                <MenuItem onClick={handleSortByOldestDate}>Publish Date (Oldest)</MenuItem>
                <MenuItem onClick={handleSortByViews}>Views</MenuItem>
                <MenuItem onClick={handleSortByLikes}>Likes</MenuItem>
                <MenuItem onClick={handleSortByDislikes}>Dislikes</MenuItem>
        </Menu>
    );
//<SortIcon/>
    return (
        <div style={{background: "rgba(250, 241, 194, 1)", float:"right", marginTop: "15px", marginRight: "15px"}}>
            <IconButton
                    color="inherit" 
                    aria-label="sortby"
                    id="sortby-list-button"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    size = "large"
                    onClick={handleProfileMenuOpen}
                >
                    Sort <img style={{width:"50px", height:"auto"}} src={images.sort}></img>
            </IconButton>
            {menulist}
        </div>
    )
}

export default SortButton;