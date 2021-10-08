import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import {makeStyles} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import firebaseDB from '../../config/firebase/firebaseDB';
import { Box } from '@mui/system';

const useStyles = makeStyles((theme) => ({
  dialogBox: {
    position: 'relative',
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 600,
      width: '100%',
    },
    '& .MuiTypography-h6': {
    },
  },
  formRoot: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 20,
    [theme.breakpoints.up('xl')]: {},
  },
  pointer: {
    cursor: 'pointer',
  },
  textareaAutosizeRoot: {
    width: '100%',
    border: '0 none',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  btnRoot: {
    paddingLeft: 32,
    paddingRight: 32,
  },
  scrollRoot: {
    height: 550,
  },
}));

const Delete = (props) => {
    const { isOpen, close, refresh } = props;
    const idBarang = props.barang.id;
    const deleteData = () => {
        const res = firebaseDB.delete('/barangs/'+idBarang+'.json');
        res.then((result) => {
            // console.log(result);
            toast("Data barang berhasil di dihapus")
            close();
            refresh();
        })
        res.catch((error) => {
            toast.error(error.message)
        })
    }
  const classes = useStyles(props);

  return (
    <Dialog
      open={isOpen}
      onClose={() => close()}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      className={classes.dialogBox}>
      <Box
        py={2}
        px={4}
        display='flex'
        flexDirection='row'
        alignItems='center'
        borderBottom={`1px solid ${grey[300]}`}>
        <Box component='h2' mb={0}>
         Delete
        </Box>
      </Box>
      <Container>
        <Typography style={{fontStyle:'italic'}}>
        Apa anda yakin akan menghapus data barang {props.barang.nama} dengan jumlah barang {props.barang.qty}pc ?
        </Typography>
        <Grid align="right" item={true} style={{paddingTop:"2%", paddingBottom:"4%"}}>
        <Button onClick={deleteData} margin="dense" size="medium" variant="contained" color="secondary">
            Delete
        </Button>
        <Button onClick={close} margin="dense" size="medium" variant="contained" color="inherit">
            Cancel
        </Button>
        </Grid>
      </Container>
    </Dialog>
  );
};

export default Delete;

Delete.defaultProps = {
  connection: null,
  data: {name: ''},
  barang: '',
};