import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  tableRowRoot: {
    '& th': {
      fontSize: 13,
      padding: 10,
      '&:first-child': {
        paddingLeft: 20,
      },
      '&:last-child': {
        paddingRight: 0,
      },
    },
  },
}));

const TableHeading = (props) => {
  const classes = useStyles(props);
  return (
    <TableRow className={classes.tableRowRoot}>
      <TableCell
        style={{
          width: 60,
        }}>
        Actions
      </TableCell>
      <TableCell
        style={{
          maxWidth: 1200,
        }}>
       Nama Barang
      </TableCell>
      <TableCell
        style={{
          maxWidth: 1200,
        }}>
       Harga
      </TableCell>
      <TableCell
        style={{
          maxWidth: 1200,
        }}>
        Qty
      </TableCell>
    </TableRow>
  );
};

export default TableHeading;
