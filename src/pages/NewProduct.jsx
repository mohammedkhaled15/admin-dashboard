import styled from 'styled-components'
import FileUploadIcon from '@mui/icons-material/FileUpload';

const Container = styled.div`
  flex: 4;
  -webkit-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  padding: 20px;
  margin: 15px;
`
const Title = styled.h1`
  margin-bottom: 20px;
`
const ProductForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 400px;
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
  margin-bottom: 25px;
  border: none;
  padding: 5px;
  border-bottom: 1px solid gray;
  &:focus{
    outline: none;
  }
`
const InstockSelect = styled.select`
  margin-bottom: 10px;
  width: 100px;
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
  
`
const UploadInput = styled.input`
  display: none;
`
const SubmitButton = styled.button`
  border: none;
  padding: 10px;
  border-radius: 5px;
  background-color: teal;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin: 20px;
`

const NewProduct = () => {
  return (
    <Container>
      <Title>New Product</Title>
      <ProductForm>
        <ProductFormLeft>
          <ProductLabel>Product Name</ProductLabel>
          <ProductInput type={"text"} placeholder="Apple Airpod" />
          <ProductLabel>Product Description</ProductLabel>
          <ProductInput type={"text"} placeholder="long long description" />
          <ProductLabel>Product Price</ProductLabel>
          <ProductInput type={"number"} placeholder="$100" />
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
        </ProductFormRight>
        <SubmitButton>Create</SubmitButton>
      </ProductForm>
    </Container>
  )
}

export default NewProduct