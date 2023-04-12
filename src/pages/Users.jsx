import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllUsers } from "../apiCalls"
import { useDispatch, useSelector } from "react-redux"
import usePrivateRequest from "../hooks/usePrivateRequestInterceptors"
import "./users.css"
import { deleteUserSuccess, failedProcess, startProcess } from '../redux/usersDataSlice';

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
const AddNewUser = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  background-color: teal;
  color: white;
  font-size: 16px;
`
const Actions = styled.div``
const Image = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
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

  const dispatch = useDispatch()
  const privateRequest = usePrivateRequest()
  const users = useSelector(state => state.usersData.usersData)
  const navigate = useNavigate()
  const usersLocation = useLocation()

  useEffect(() => {
    getAllUsers(navigate, usersLocation, dispatch, privateRequest)
  }, [])


  const handleDelete = async (params) => {
    const id = params.id
    console.log(id)
    dispatch(startProcess)
    try {
      await privateRequest.delete(`/users/${id}`)
      dispatch(deleteUserSuccess(id))
    } catch (error) {
      dispatch(failedProcess(error))
    }
  }

  const columns = [
    { field: '_id', headerName: 'ID', width: 200, },
    {
      field: 'username', headerName: 'Username', width: 180, renderCell: (params) => {
        return (
          <UserInfoContainer>
            <Image src={params.row.img || "https://firebasestorage.googleapis.com/v0/b/ecommerce-images-pr.appspot.com/o/profileImgs%2FdefaultUser.png?alt=media&token=9387917b-a5a8-490d-968c-b8da0e1c9b1f"} />
            {params.row.username}
          </UserInfoContainer>
        )
      }
    },
    { field: 'email', headerName: 'Email', width: 200, },
    {
      field: 'isAdmin', headerName: 'Admin', width: 110, renderCell: (params) => {
        return (
          <span>
            {params.row.isAdmin ? "YES" : "NO"}
          </span>
        )
      }
    },
    {
      field: 'transactions', headerName: 'Transactions', width: 120,
    },
    {
      field: 'actions', cellClassName: "hello", headerName: 'Actions', width: 160, renderCell: (params) => {
        return (
          <Actions>
            <Link to={`/users/${params.row._id}`}>
              <EditButton><EditIcon /></EditButton>
            </Link>
            <Link>
              <DeleteButton onClick={() => handleDelete(params)}><DeleteIcon /></DeleteButton>
            </Link>
          </Actions>
        )
      }
    },
  ];

  return (
    <Container>
      <Link to={"/newUser"}>
        <AddNewUser>Create</AddNewUser>
      </Link>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={10}
        getRowId={row => row._id}
        rowsPerPageOptions={[5, 10]}
        checkboxSelection
        disableSelectionOnClick
        style={{ outline: "none" }}
      />
    </Container>
  )
}

export default Users