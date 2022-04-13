import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import api from '../api'
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

const AuthContext = createContext();
// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    GUEST_USER: "GUEST_USER"
}

function AuthContextProvider(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        guest: false
    });
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleOpen = () =>{
        setOpen(true);
    }
    const handleClose = () => {
      setOpen(false);
    };

   

    useEffect(() => {
       
        auth.getLoggedIn();
        
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    guest: false
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    guest: false
                })
            }
            case AuthActionType.LOGIN_USER:{
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    guest: false
                })
            }
            case AuthActionType.LOGOUT_USER:{
                return setAuth({
                    user: payload,
                    loggedIn: false,
                    guest: false
                })
            }
            case AuthActionType.GUEST_USER:{
                return setAuth({
                    user: null,
                    loggedIn: false,
                    guest: true
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        try{
            const response = await api.getLoggedIn();
            console.log(response);
            if (response.status === 200) {
                console.log("true");
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                });
            }
            else{
                console.log("not logged in");
            }
            setIsLoading(false);
        }
        catch(err){
            setIsLoading(false);
        }
        
    }
    auth.loginstatus = function () {
        return auth.loggedIn;
    }
    auth.logoutUser = function (){
        authReducer({
            type: AuthActionType.LOGOUT_USER,
            payload: {}
        })
        navigate("/");
        window.location.reload();
    }
    auth.loginUser = async function(userData, store){
        console.log(userData);
        const response = await api.loginUser(userData);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: response.data.user
                }
            })
            navigate("/dashboard");
        }
        else {
            setMessage(response.data.errorMessage);
            handleOpen();
        }
    }
    auth.guestview = function(){
        authReducer({
            type: AuthActionType.GUEST_USER
        })
    }
    auth.registerUser = async function(userData, store) {
        console.log(userData)
        const response = await api.registerUser(userData);      
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: response.data.user
                }
            })
            navigate("/login");
            store.loadIdNamePairs();
        }
        else {
            setMessage(response.data.errorMessage);
            handleOpen();
        }
    }

    return (
        <AuthContext.Provider value={{
            auth,
            isLoading: isLoading
        }}>
            {props.children}
            <Dialog
                id = "signin-modal"
                maxWidth='sm'
                open= {open}
                onClose={handleClose}
                >
                <DialogTitle>
                    {message}
                    <DialogActions>
                        <Button onClick={handleClose}>Okay</Button>
                    </DialogActions>
                </DialogTitle>
            </Dialog>
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };