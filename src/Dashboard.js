import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db } from "./Firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { Container } from "@mui/system";
import { Avatar, Grid, IconButton, Menu, Paper, MenuItem, Divider, CircularProgress, Button } from "@mui/material";
import Navbar from "./components/Navbar";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
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