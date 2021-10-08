import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableHeading from './table/TableHeading';
import TableItem from './table/TableItem';
import { TableHead } from '@material-ui/core';
import Edit from './Edit';
import Delete from './Delete';

const Read = ({dataArr, refresh}) => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [selectedId, setSelectedId] = useState();

    const closeUpdate = () => {
        setIsUpdate(false);
    };
    const openUpdate = (id) => {
        setSelectedData(dataArr[id]);
        setSelectedId(id);
        setIsUpdate(true);
    };
    const closeDelete = () => {
        setIsDelete(false);
    };
    const openDelete = (id) => {
        setSelectedData(dataArr[id]);
        setSelectedId(id);
        setIsDelete(true);
    };
    useEffect(() => {
    // console.log(selectedData);
  }, [selectedId]);
    return (
    <>
    <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableHeading/>
              </TableHead>
              <TableBody>
                  {dataArr.map((data) => (
                      <TableItem
                          
                        key={data.id}
                        data={data}
                        openUpdate={openUpdate}
                        openDelete={openDelete}
                      />
                    ))}
        </TableBody>
      </Table>
    </TableContainer>
    {isUpdate ? (
        <Edit
        isOpen={
            isUpdate === true 
                }
        close={closeUpdate}
        barang={selectedData}
        refresh={refresh}
        type='update'
        />
        ) : null}
    {isDelete ? (
        <Delete
        isOpen={
            isDelete === true 
                }
        close={closeDelete}
        barang={selectedData}
        refresh={refresh}
        type='delete'
        />
        ) : null}
    </>
  );
}

export default Read;
