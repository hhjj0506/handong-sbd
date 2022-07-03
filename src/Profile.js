import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "./Firebase";
import { signOut, updateProfile } from "firebase/auth";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { query, collection, getDocs, where, doc, setDoc, orderBy, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { Avatar, Grid, IconButton, Menu, Paper, MenuItem, Divider, CircularProgress, Button } from "@mui/material";
import Navbar from "./components/Navbar";

function Profile() {
    const [user, loading, error] = useAuthState(auth);
    const [userInfo, setUserInfo] = useState([]);
    const [name, setName] = useState("");
    const [openUserModal, setOpenUserModal] = useState(false);
    const [desc, setDesc] = useState("");
    const [imgURL, setImgURL] = useState("");
    const navigate = useNavigate();
    
    // 이름과 사진을 제외한 프로필의 모든 정보
    const updateProfileInfo = async (e) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, "users", user.uid), {
                desc: desc,
                
            })
        } catch (err) {
            alert(err)
        }
    }

    // 사진과 이름 바꾸기
    // 사진은 storage 저장 후 링크를 photoURL로 설정, 이름은 displayName으로 설정
    const updateUserInfo = (e) => {
        e.preventDefault();
        const file = e.target[0]?.files[0];
        if (!file) return;
        const storageRef = ref(storage, 'profile/${user?.photoURL}');
        const upload = uploadBytesResumable(storageRef, file);

        upload.on("state_changed",
            (error) => { alert(error); },
            () => {
                getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
                    setImgURL(downloadURL);
                });
            }
        );

        updateProfile(user, {
            displayName: name,
            photoURL: imgURL,
        }).then(() => {
            console.log("good");
        })
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
                    <Button onClick={() => setOpenUserModal(true)}>유저정보 수정</Button>
                    <p>{user?.displayName}</p>
                    <h3>소개</h3>
                    <p>{}</p>
                    <h3>경력</h3>
                </Paper>
            </Container>
        </body>
    );
}

export default Profile;