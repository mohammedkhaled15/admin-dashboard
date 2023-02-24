import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Chart from '../components/topbar/Chart'
import { productData } from "../fakeData"
import FileUploadIcon from '@mui/icons-material/FileUpload';

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
  width: 150px;
  display: flex;
  justify-content: space-between ;
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
  margin-bottom: 10px;
  color: gray;
`
const ProductInput = styled.input`
  margin-bottom: 10px;
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
          <Chart data={productData} dataKey={"Sales"} title="Sales Performance" />
        </ProductTopLeft>
        <ProductTopRight>
          <ProductInfoUpper>
            <ProductImage src='../../public/assits/user2.jpg' />
            <ProductName>Apple airpods</ProductName>
          </ProductInfoUpper>
          <ProductInfoLower>
            <ProductInfoItem>
              <ProductInfoKey>sales:</ProductInfoKey>
              <ProductInfoValue>5123</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <ProductInfoKey>active:</ProductInfoKey>
              <ProductInfoValue>123</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <ProductInfoKey>in Stock:</ProductInfoKey>
              <ProductInfoValue>no</ProductInfoValue>
            </ProductInfoItem>
          </ProductInfoLower>
        </ProductTopRight>
      </ProductTop>
      <ProductBottom>
        <ProductForm>
          <ProductFormLeft>
            <ProductLabel>Product Name</ProductLabel>
            <ProductInput type={"text"} placeholder="Apple Airpod" />
            <ProductLabel>In stock</ProductLabel>
            <InstockSelect name="inStock" id="inStock">
              <InstockOption value={"yes"}>Yes</InstockOption>
              <InstockOption value={"no"}>No</InstockOption>
            </InstockSelect>
            <ProductLabel>Active</ProductLabel>
            <InstockSelect name="active" id="active">
              <InstockOption value={"yes"}>Yes</InstockOption>
              <InstockOption value={"no"}>No</InstockOption>
            </InstockSelect>
          </ProductFormLeft>
          <ProductFormRight>
            <ProductUpdateImage>
              <ProductUpdatedImg src='../../public/assits/user1.jpg' />
              <UploadLabel htmlFor='file'>
                <FileUploadIcon />
              </UploadLabel>
              <UploadInput type={"file"} id="file" />
            </ProductUpdateImage>
            <SubmitButton>Update</SubmitButton>
          </ProductFormRight>
        </ProductForm>
      </ProductBottom>
    </Container>
  )
}

export default ProductPage