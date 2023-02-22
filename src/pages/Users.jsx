import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid';

const Container = styled.div`
    flex: 4;
    height: 400px;
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

`
const DeleteButton = styled.button`
  
`

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
          <EditButton></EditButton>
          <DeleteButton></DeleteButton>
        </Actions>
      )
    }
  },
];

const rows = [
  { id: 1, username: 'Snow', avatar: '../../public/assits/user1.jpg', email: "username@blblb.com", status: "active", transactions: "$1200.00" },
  { id: 2, username: 'Snow', avatar: '../../public/assits/user4.jpg', email: "username@blblb.com", status: "active", transactions: "$1200.00" },
  { id: 3, username: 'Snow', avatar: '../../public/assits/user2.jpg', email: "username@blblb.com", status: "active", transactions: "$1200.00" },
  { id: 4, username: 'Snow', avatar: '../../public/assits/user3.jpg', email: "username@blblb.com", status: "active", transactions: "$1200.00" },
  { id: 5, username: 'Snow', avatar: '../../public/assits/user4.jpg', email: "username@blblb.com", status: "active", transactions: "$1200.00" },
  { id: 6, username: 'Snow', avatar: '../../public/assits/user3.jpg', email: "username@blblb.com", status: "active", transactions: "$1200.00" },
  { id: 7, username: 'Snow', avatar: '../../public/assits/user2.jpg', email: "username@blblb.com", status: "active", transactions: "$1200.00" },
];



const Users = () => {
  return (
    <Container>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Container>
  )
}

export default Users