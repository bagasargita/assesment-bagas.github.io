import React, {useEffect, useState} from 'react';
import * as yup from 'yup';
import Dialog from '@material-ui/core/Dialog';
import {makeStyles} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';
import { Button, Container, Grid, Paper, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
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

const Edit = (props) => {
    const { isOpen, close, type, refresh } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    const validationSchema = yup.object({
    nama: yup
        .string('Field nama hanya bisa di isi dengan huruf')
        .required('Field nama tidak boleh kosong'),
    harga: yup
        .number('Field harga hanya bisa di isi dengan angka')
        .min(3, 'Harga minimal ratusan')
        .required('Field harga tidak boleh kosong'),
    qty: yup
        .number('Field harga hanya bisa di isi dengan angka')
        .required('Field harga tidak boleh kosong'),
    });
    const idBarang = props.barang.id;
    const updateData = (nama, harga, qty ) => {
        const res = firebaseDB.put('/barangs/'+idBarang+'.json', {
            nama: nama,
            harga: harga,
            qty: qty,
        });
        res.then((result) => {
            console.log(result);
            toast("Data barang berhasil di Diedit")
            close();
            refresh();
        })
        res.catch((error) => {
            toast.error(error.message)
        })
    }

    const formik = useFormik({
        initialValues: {
        nama:  props.barang.nama
              ? props.barang.nama
              : '',
        harga: props.barang.harga
              ? props.barang.harga : '',
        qty: props.barang.qty
              ? props.barang.qty : '',
        },
        validationSchema: validationSchema,
        onSubmit: (data) => {
            setIsSubmit(true);
            if (type == 'update') {
              updateData(data.nama, data.harga, data.qty);
            } else {
              toast.error('Not Selected Type');
            }
        },
    });
    

  useEffect(() => {
  }, []);

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
         Update
        </Box>
      </Box>
        <Container>
            <Grid container style={{ justifyContent: "center" }}>
                <Grid item={true} xs={12} style={{  paddingBottom: "1%"}}>
            
                     <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="nama"
                            name="nama"
                            label="Nama Barang"
                            value={formik.values.nama}
                            onChange={formik.handleChange}
                            error={formik.touched.nama && Boolean(formik.errors.nama)}
                            helperText={formik.touched.nama && formik.errors.nama}
                        />
                        <TextField
                            fullWidth
                            id="harga"
                            name="harga"
                            label="Harga"
                            type="text"
                            value={formik.values.harga}
                            onChange={formik.handleChange}
                            error={formik.touched.harga && Boolean(formik.errors.harga)}
                            helperText={formik.touched.harga && formik.errors.harga}
                        />
                        <TextField
                            fullWidth
                            id="qty"
                            name="qty"
                            label="Qty"
                            type="text"
                            value={formik.values.qty}
                            onChange={formik.handleChange}
                            error={formik.touched.qty && Boolean(formik.errors.qty)}
                            helperText={formik.touched.qty && formik.errors.qty}
                        />
                        <Grid align="right" item={true} style={{paddingTop:"2%"}}>
                        <Button  disabled={isSubmit} type="submit" margin="dense" size="medium" variant="contained" color="primary">
                            Send
                            </Button>
                        <Button onClick={close} margin="dense" size="medium" variant="contained" color="secondary">
                            Cancel
                        </Button>
                        </Grid>
                        </form>
                
                </Grid>
            </Grid>
        </Container> 
    </Dialog>
  );
};

export default Edit;

Edit.defaultProps = {
  connection: null,
  data: {name: ''},
  barang: '',
};