import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { productsRows } from "../fakeData"
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Container = styled.div`
  flex: 4;
  height: 60vh;
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

export default function ProductList() {

  const [data, setData] = useState(productsRows)

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id))
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'product', headerName: 'Product', width: 130, renderCell: (params) => {
        return (
          <UserInfoContainer>
            <Image src={params.row.img} />
            {params.row.name}
          </UserInfoContainer>
        )
      }
    },
    { field: 'stock', headerName: 'Stock', width: 200, },
    { field: 'status', headerName: 'Status', width: 110, },
    { field: 'price', headerName: 'Price', width: 120, },
    {
      field: 'actions', headerName: 'Actions', width: 160, renderCell: (params) => {
        return (
          <Actions>
            <Link to={`/products/${params.row.id}`}>
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
        pageSize={6}
        rowsPerPageOptions={[5, 6]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Container>
  )
}
