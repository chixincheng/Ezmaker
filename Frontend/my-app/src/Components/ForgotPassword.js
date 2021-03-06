import { useContext } from 'react';
import AuthContext from '../auth';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import api from '../api';
import images from '../Images';


const ForgotPassword = ()=>{
    const {auth} = useContext(AuthContext);

    const handleOnSubmit = async (event)=>{
        var newPassword = Date.now();
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const    response =  await api.resetPassword({
                email: formData.get('email'),
                subject: "Password Reset",
                newPassword: newPassword,
                text:'Your new password is '+newPassword
        });
        
        if(  response.status === 200 ){
            alert( response.data.message );
        }
        else{
            
            alert(response.data.errorMessage);
        }
    }

    return( <Container component="main" maxWidth="xxl" style={{ background: "rgba(209, 247, 255, 1)", height: "100vh"}}>
    <CssBaseline />
    <Box
        sx={{
            paddingTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
    >
        <Avatar variant='square' src={images.easyToUse}/>
        
        <Typography component="h1" variant="h5">
            Forgot Password
        </Typography>
        <Box component="form" noValidate onSubmit={handleOnSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                
               
                <Grid item xs={12}>
                    <TextField
                        style={{background:"white"}}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                </Grid>
              
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Send Email
            </Button>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="/login" variant="body2">
                        Already have an account? Sign in
                    </Link>
                </Grid>
            </Grid>
        </Box>
    </Box>
</Container>);
};


export default ForgotPassword;