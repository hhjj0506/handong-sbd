import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./Firebase";
import { signOut, updateProfile } from "firebase/auth";
import { query, collection, getDocs, where, doc, setDoc, orderBy, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { Avatar, Grid, IconButton, Menu, Paper, MenuItem, Divider, CircularProgress, Button } from "@mui/material";
import Navbar from "./components/Navbar";

function Profile() {
    const [user, loading, error] = useAuthState(auth);
    const [userInfo, setUserInfo] = useState([]);
    const navigate = useNavigate();
    
    const updateUserInfo = async (e) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, "users", user.uid), {
                desc: desc,
                
            })
            updateProfile(user, {
                displayName: name,
                photoURL: 
            }).then(() => {
                console.log("good");
            })
        }
    }

    useEffect(() => {
        if (loading) return <CircularProgress/>;
        if (!user) return navigate("/");
        const q = query(collection(db, "users"));
        onSnapshot(q, (querySnapshot) => {
            setUserInfo(querySnapshot.docs.map(doc => ({
                data: doc.data()
            })))
        })
    }, [user, loading]);

    return (
        <body>
            <Container>
                <Navbar/>
                <Paper elevation={3}>
                    <Avatar src={user?.photoURL} />
                </Paper>
            </Container>
        </body>
    );
}

export default Profile;