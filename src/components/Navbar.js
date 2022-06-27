import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { Avatar, Grid, IconButton, Menu, MenuItem, Button, Paper } from "@mui/material";
import "./Navbar.css"

function Navbar() {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function logout() {
        signOut(auth).then(() => {
            navigate("/");
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Paper elevation={3} className="navbar">
        <Grid container>
            <Grid item xs={2}>
            <Button onClick={() => navigate("/dashboard")}><h2>강한동</h2></Button>
            </Grid>
            <Grid item xs={9}>
                <Button onClick={() => navigate("/ranking")}><h4>랭킹</h4></Button>
                <Button onClick={() => navigate("/post")}><h4>게시판</h4></Button>
            </Grid>
            <Grid item xs={1}>
            <IconButton
                onClick={handleClick}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar alt="profile picture" src={user.photoURL}/>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => navigate("/profile")}>프로필</MenuItem>
                <MenuItem onClick={logout}>로그아웃</MenuItem>
            </Menu>
            </Grid>
        </Grid>
        </Paper>
    );
}

export default Navbar;