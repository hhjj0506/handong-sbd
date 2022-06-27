import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./Firebase";
import { Container } from "@mui/system";
import { CircularProgress } from "@mui/material";
import Navbar from "./components/Navbar";

function Ranking() {
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
            </Container>
        </body>
    );
}

export default Ranking;