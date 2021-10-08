import React, {  useState} from 'react'
import { Button, Container, Grid, Paper, TextField } from '@material-ui/core'
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Alert } from '@mui/material';
import { useHistory } from 'react-router';
import { firebaseAuth } from '../config/firebase/firebaseAuth';
import { toast } from 'react-toastify';

const Login = () => {    
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [isAlert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const history = useHistory();

    const handleChangeField = (e) => {
        if ([e.target.name] == "email") {
            setEmail(e.target.value);
        } else if ([e.target.name]== "password") {
            setPassword(e.target.value);
        }
    }

    

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                if (user.isAnonymous == false) {
                    toast.success("Login Successfully!!!");
                    history.push('/dashboard');
                } else {
                    setAlertContent("User is Anonymus!!");
                    setAlert(true);
                    firebaseAuth.signOut();
                }
            }).catch(error => { 
                setAlertContent(error.message);
                setAlert(true);
        })
    }

    return (
        <Container>
            <Grid container style={{ justifyContent: "center" }}>
                <Grid item={true} xs={4}style={{ paddingTop: "20%" }}>
                    <h2 align="center">
                    LOGIN
                    </h2>
                    {isAlert ? <Alert severity='error' onClose={() => {setAlert(false)}}>{alertContent}</Alert> : <></> }
                    <form onSubmit={handleSubmit}>
                        <Paper>
                        <TextField type="text" required fullWidth margin="dense" value={email} name="email" onChange={handleChangeField} size="medium" id="outlined-basic" label="Email" variant="outlined" />
                        <TextField type="password" required fullWidth margin="dense" name="password" value={password} onChange={handleChangeField} size="medium" id="outlined-basic" label="Password" variant="outlined" />
                        </Paper>
                        <Button type="submit" fullWidth margin="dense" size="medium" variant="contained" color="primary">
                            Login
                        </Button>
                    </form>
                </Grid>
            </Grid>
         </Container>    
        )
}

export default Login;
