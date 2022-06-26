import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db } from "./Firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { signOut } from "firebase/auth";
import Button from '@mui/material/Button';
import { Container } from "@mui/system";
import { Avatar, Grid, IconButton, Menu, Paper, MenuItem, Divider } from "@mui/material";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
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

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  return (
    <body>
    <Container>
      <Grid container>
        <Grid item xs="11">
          <h2>강한동</h2>
        </Grid>
        <Grid item xs="1">
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
            <MenuItem onClick={navigate("/profile")}>프로필</MenuItem>
            <MenuItem onClick={logout}>로그아웃</MenuItem>
          </Menu>
        </Grid>
      </Grid>
      <Paper elevation={3}>
        <h4>랭킹</h4>
        <p>...........</p>
      </Paper>
      <Paper elevation={3}>
        <h4>인기글</h4>
        <p>...........</p>
      </Paper>
      <Paper elevation={3}>
        <h4>랭킹</h4>
        <p>...........</p>
      </Paper>
    </Container>
    </body>
  );
}

export default Dashboard;