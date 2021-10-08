import { Button, Container, Grid, Paper, TextField } from '@material-ui/core';
import React,{useState} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import firebaseDB from '../../config/firebase/firebaseDB';
import { toast } from 'react-toastify';

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

const Add = (props) => {
    const { close, type } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    const updateData = (nama, harga, qty ) => {
        const res = firebaseDB.post("/barangs.json", {
            id : props.id,
            nama: nama,
            harga: harga,
            qty: qty,
        });
        res.then((result) => {
            toast("Data barang berhasil di tambahkan")
            close();
        })
        res.catch((error) => {
            toast.error(error.message)
        })
    }
    const saveData = (nama, harga, qty ) => {
        const res = firebaseDB.post("/barangs.json", {
            nama: nama,
            harga: harga,
            qty: qty,
        });
        res.then((result) => {
            toast("Data barang berhasil di tambahkan")
            close();
        })
        res.catch((error) => {
            toast.error(error.message)
        })
    }

    const formik = useFormik({
        initialValues: {
        nama: '',
        harga: '',
        qty: '',
        },
        validationSchema: validationSchema,
        onSubmit: (data) => {
            setIsSubmit(true);
            if (type == 'create') {
              saveData(data.nama, data.harga, data.qty);
            } else if (type == 'update') {
              updateData(data.nama, data.harga, data.qty);
            } else {
              toast.error('Not Selected Type');
            }
        },
    });
    
    return (
       <Container>
            <Grid container style={{ justifyContent: "right" }}>
                <Grid item={true} xs={4} style={{  paddingBottom: "1%"}}>
                    <Paper>
                    <h2 align="center">
                    New Data
                    </h2>
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
                </Paper>
                </Grid>
            </Grid>
         </Container>   
    )
}

export default Add;

Add.defaultProps = {
  connection: null,
  data: {name: ''},
  barangs: '',
};
