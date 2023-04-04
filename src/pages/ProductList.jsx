import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import usePrivateRequest from "../hooks/usePrivateRequestInterceptors"
import { deleteProductsSuccess, failedProcess, getAllProductsSuccess, startProcess } from '../redux/productSlice';
import { useDispatch, useSelector } from "react-redux"

const Container = styled.div`
  flex: 4;
  height: 80vh;
`
const NewProdutcButton = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
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

  const privateRequest = usePrivateRequest()
  const dispatch = useDispatch()
  const products = useSelector(state => state.products.products)

  const getAllProducts = async () => {
    dispatch(startProcess());
    try {
      const res = await privateRequest.get("/products")
      dispatch(getAllProductsSuccess(res.data))
    } catch (error) {
      console.log(error)
      dispatch(failedProcess(error))
    }
  };

  useEffect(() => {
    getAllProducts()
  }, [])

  const deleteProduct = async (id) => {
    dispatch(startProcess())
    try {
      await privateRequest.delete(`products/${id}`)
      dispatch(deleteProductsSuccess(id))
    } catch (error) {
      dispatch(failedProcess(error))
    }
  }

  const handleDelete = (id) => {
    deleteProduct(id)
  }

  const columns = [
    { field: '_id', headerName: 'ID', width: 220 },
    {
      field: 'product', headerName: 'Product', width: 180, renderCell: (params) => {
        return (
          <UserInfoContainer>
            <Image src={params.row.img} />
            {params.row.title}
          </UserInfoContainer>
        )
      }
    },
    { field: 'inStock', headerName: 'Stock', width: 200, },
    { field: 'price', headerName: 'Price', width: 120, },
    {
      field: 'actions', headerName: 'Actions', width: 160, renderCell: (params) => {
        return (
          <Actions>
            <Link to={`/products/${params.row._id}`}>
              <EditButton><EditIcon /></EditButton>
            </Link>
            <Link>
              <DeleteButton onClick={() => handleDelete(params.row._id)}><DeleteIcon /></DeleteButton>
            </Link>
          </Actions>
        )
      }
    },
  ];

  return (
    <Container>
      <Link to={"/newProduct"}>
        <NewProdutcButton>Create</NewProdutcButton>
      </Link>
      <DataGrid
        rows={products}
        getRowId={row => row._id}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[9, 10]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Container>
  )
}
