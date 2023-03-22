import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Chart from '../components/Chart'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState, useMemo } from "react"
import usePrivateRequest from '../hooks/usePrivateRequestInterceptors';
import months from '../fakeData';
import { useDispatch } from "react-redux"
import { editProductsSuccess, failedProcess, startProcess } from '../redux/productSlice';

const Container = styled.div`
  flex:4;
  padding: 20px;
`
const ProductTitleCntainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ProductTitle = styled.h2`
  
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
const ProductTop = styled.div`
  display: flex;
`
const ProductTopRight = styled.div`
  flex: 1;
  padding: 20px;
  margin: 20px;
  -webkit-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
`
const ProductTopLeft = styled.div`
  flex: 1;
`
const ProductInfoUpper = styled.div`
  display: flex;
  align-items: center;
  `
const ProductImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
  `
const ProductName = styled.span`
  font-weight: 600;
  `
const ProductInfoLower = styled.div`
  margin-top: 10px;
  `
const ProductInfoItem = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between ;
  gap: 40px;
  margin-bottom: 5px;
  `
const ProductInfoKey = styled.div`
  `
const ProductInfoValue = styled.div`
  font-weight: 300;
  `
const ProductBottom = styled.div`
  flex: 1;
  padding: 20px;
  margin: 20px;
  -webkit-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  `
const ProductForm = styled.form`
  display: flex;
  justify-content: space-between;
`
const ProductFormLeft = styled.div`
  display: flex;
  flex-direction: column;
`
const ProductLabel = styled.label`
  margin-bottom: 5px;
  color: gray;
`
const ProductInput = styled.input`
  margin-bottom: 20px;
  border: none;
  padding: 5px;
  border-bottom: 1px solid gray;
  &:focus{
    outline: none;
  }
`
const InstockSelect = styled.select`
  margin-bottom: 10px;
`
const InstockOption = styled.option`
  
`
const ProductFormRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const ProductUpdateImage = styled.div`
  display: flex;
  align-items: center;
`
const ProductUpdatedImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`
const UploadLabel = styled.label`
  cursor: pointer;
`
const UploadInput = styled.input`
  display: none;
`
const SubmitButton = styled.button`
  border: none;
  padding: 5px;
  border-radius: 5px;
  background-color: darkblue;
  color: white;
  font-weight: bold;
  cursor: pointer;
`

const ProductPage = () => {

  const Months = useMemo(() => months, [])

  const [stats, setStats] = useState([])

  const dispatch = useDispatch()
  const privateRequest = usePrivateRequest()

  const productId = useLocation().pathname.split("/")[2]

  const product = useSelector(state => state.products.products.find(product => product._id === productId))

  const [dataToUpdate, setDataToUpdate] = useState({})

  const handleChange = (e) => {
    setDataToUpdate(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    const getstats = async () => {
      try {
        const res = await privateRequest.get(`orders/income?${productId}`)
        const dataList = res.data.sort((a, b) => a._id - b._id) // sorting months according to its id
        dataList.map(item => { setStats(prev => [...prev, { name: Months[item._id], sales: item.total }]) })
      } catch (error) {
        console.log(error)
      }
    }
    getstats()
  }, [])

  const handleUpdate = async (e) => {
    e.preventDefault()
    console.log(productId)
    dispatch(startProcess())
    try {
      const res = await privateRequest.put(`products/${productId}`, { ...dataToUpdate })
      dispatch(editProductsSuccess({ id: productId, data: { ...dataToUpdate } }))
      console.log(res.data)
    } catch (error) {
      dispatch(failedProcess)
    }
  }

  return (
    <Container>
      <ProductTitleCntainer>
        <ProductTitle>Edit Product</ProductTitle>
        <Link to={"/newProduct"}>
          <NewProdutcButton>Create</NewProdutcButton>
        </Link>
      </ProductTitleCntainer>
      <ProductTop>
        <ProductTopLeft>
          <Chart data={stats} dataKey={"sales"} title="Sales Performance" />
        </ProductTopLeft>
        <ProductTopRight>
          <ProductInfoUpper>
            <ProductImage src={product?.img} />
            <ProductName>{product?.title.toUpperCase()}</ProductName>
          </ProductInfoUpper>
          <ProductInfoLower>
            <ProductInfoItem>
              <ProductInfoKey>Id:</ProductInfoKey>
              <ProductInfoValue>{product?._id}</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <ProductInfoKey>Price:</ProductInfoKey>
              <ProductInfoValue>{product?.price}</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <ProductInfoKey>Sales:</ProductInfoKey>
              <ProductInfoValue>5123</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <ProductInfoKey>In Stock:</ProductInfoKey>
              <ProductInfoValue>{product?.inStock ? "Yes" : "No"}</ProductInfoValue>
            </ProductInfoItem>
          </ProductInfoLower>
        </ProductTopRight>
      </ProductTop>
      <ProductBottom>
        <ProductForm>
          <ProductFormLeft>
            <ProductLabel>Product Name</ProductLabel>
            <ProductInput onChange={(e) => handleChange(e)} name='title' type={"text"} placeholder={product?.title} />
            <ProductLabel>Product Desc</ProductLabel>
            <ProductInput onChange={(e) => handleChange(e)} name='desc' type={"text"} placeholder={product?.desc} />
            <ProductLabel>Product Price</ProductLabel>
            <ProductInput onChange={(e) => handleChange(e)} name='price' type={"number"} placeholder={product?.price} />
            <ProductLabel>In Stock</ProductLabel>
            <InstockSelect onChange={(e) => handleChange(e)} name="inStock" id="inStock"  >
              <InstockOption value={"true"}>Yes</InstockOption>
              <InstockOption value={"false"}>No</InstockOption>
            </InstockSelect>
          </ProductFormLeft>
          <ProductFormRight>
            <ProductUpdateImage>
              <ProductUpdatedImg src={product?.img} />
              <UploadLabel htmlFor='file'>
                <FileUploadIcon />
              </UploadLabel>
              <UploadInput type={"file"} id="file" />
            </ProductUpdateImage>
            <SubmitButton onClick={(e) => handleUpdate(e)}>Update</SubmitButton>
          </ProductFormRight>
        </ProductForm>
      </ProductBottom>
    </Container>
  )
}

export default ProductPage