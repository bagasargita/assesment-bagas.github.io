import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import useStyles from './TableItem.style';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

const TableItem = ({data , openUpdate, openDelete}) => {
  const classes = useStyles();

  return (
    <TableRow
        key={data.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell>
        <Stack direction="row" spacing={1}>
            <IconButton aria-label="delete" onClick={() => {
                    openDelete(data.selected)
                }}>
                <DeleteIcon />
            </IconButton>
            <IconButton aria-label="edit" onClick={() => {
                    openUpdate(data.selected)
                }}>
                <ModeEditOutlineIcon />
            </IconButton>
        </Stack>
        </TableCell>
        <TableCell align="left">{data.nama}</TableCell>
        <TableCell align="left">{data.harga}</TableCell>
        <TableCell align="left">{data.qty}</TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
};
