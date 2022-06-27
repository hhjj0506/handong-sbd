import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./Firebase";
import { signOut } from "firebase/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Avatar, Grid, IconButton, Menu, Paper, MenuItem, Divider, CircularProgress, Button } from "@mui/material";
import Navbar from "./components/Navbar";

function Profile() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return <CircularProgress/>;
        if (!user) return navigate("/");
    }, [user, loading]);

    return (
        <body>
            <Container>
                <Navbar/>
                <Paper elevation={3}>
                    <Avatar />
                </Paper>
            </Container>
        </body>
    );
}

export default Profile;