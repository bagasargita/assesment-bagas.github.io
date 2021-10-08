import React, { useEffect, useState } from 'react'
import { Container, Grid, Paper, Button } from '@material-ui/core';
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from '../config/firebase/firebaseAuth';
import Navbar from './layout/Navbar';
import Read from './crud/Read';
import { useHistory } from 'react-router';
import Add from './crud/Add'
import firebaseDB from '../config/firebase/firebaseDB';


const Dashboard = () => {
    const history = useHistory();
    const [hideButton, setHideButton] = useState(true)
    const [isOpenAdd, setOpenAdd] = useState(false)
    const [isData, setData] = useState([])

    const getData = () => {
        const res = firebaseDB.get("/barangs.json");
        res.then((results) => {
            const fetchedResults = [];
            for (let key in results.data) {
                fetchedResults.unshift({
                    ...results.data[key],
                    id: key,
                    selected: key,
                })
            }
            const arr = []
            Object.keys(fetchedResults).map((t) => {
                arr.push({
                    id: fetchedResults[t].id,
                    nama: fetchedResults[t].nama,
                    harga: fetchedResults[t].harga,
                    qty: fetchedResults[t].qty,
                    selected: t
                })
            })
            setData(arr)
        })
    }
    const handleCloseAdd = () => {
        setOpenAdd(false);
        setHideButton(true)
    };
    const handleOpenAdd = () => {
        setOpenAdd(true);
        setHideButton(false)
    };
    
    const isAdmin = () => {
        onAuthStateChanged(firebaseAuth, (user) => {
        if (!user) {
        history.push('/')
        }});
    }
   
    useEffect(() => { getData(); isAdmin(); },[]);
    return (
        <Container>
            <Paper style={{backgroundColor:"#1b211d"}} align="center">
                <Navbar style={{fontFamily: 'Raleway, Arial'}}></Navbar>
            </Paper>
            <Grid align="right" style={{ paddingTop: 4, paddingBottom: 4 }}>
                { hideButton ? <Button id="button-add" onClick={() => {
                    handleOpenAdd();
                  }} margin="dense" size="medium" variant="contained" color="primary">
                        New Data
                </Button> : null }
                
                {isOpenAdd ? (
                <Add
                isOpen={
                    isOpenAdd === true 
                        }
                        refresh={getData()}
                close={handleCloseAdd}
                type='create'
                />
                ) : null}
            </Grid>
            <Grid>
                <Read
                refresh={getData}
                dataArr={isData}
                />
            </Grid>
        </Container>
    )   
}
export default Dashboard;