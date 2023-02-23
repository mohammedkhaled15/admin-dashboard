import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { users } from "../fakeData"
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Container = styled.div`
    flex: 4;
    height: 70vh;
    -webkit-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
`
const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
`
const Image = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
`
const Actions = styled.div`
  
`
const EditButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 3px 5px;
  background-color: #3bbb77;
  color:white;
  cursor: pointer;
  margin-right: 20px;
`
const DeleteButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 3px 5px;
  background-color: #f88a8a;
  color:red;
  cursor: pointer;
  margin-right: 20px;
`



const Users = () => {

  const [data, setData] = useState(users)

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id))
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'user', headerName: 'Username', width: 130, renderCell: (params) => {
        return (
          <UserInfoContainer>
            <Image src={params.row.avatar} />
            {params.row.username}
          </UserInfoContainer>
        )
      }
    },
    { field: 'email', headerName: 'Email', width: 200, },
    { field: 'status', headerName: 'Status', width: 110, },
    { field: 'transactions', headerName: 'Transactions', width: 120, },
    {
      field: 'actions', headerName: 'Actions', width: 160, renderCell: (params) => {
        return (
          <Actions>
            <Link to={`/users/${params.row.id}`}>
              <EditButton><EditIcon /></EditButton>
            </Link>
            <Link>
              <DeleteButton onClick={() => handleDelete(params.row.id)}><DeleteIcon /></DeleteButton>
            </Link>
          </Actions>
        )
      }
    },
  ];

  return (
    <Container>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Container>
  )
}

export default Users