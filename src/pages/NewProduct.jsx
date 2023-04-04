import styled from 'styled-components'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebaseConfig"
import { useDispatch } from "react-redux"
import { createProductsuccess, failedProcess, startProcess } from '../redux/productSlice';
import usePrivateRequest from '../hooks/usePrivateRequestInterceptors';

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
  cursor: pointer;
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
  letter-spacing: 6px;
`

const NewProduct = () => {

  //Inputs
  const [newProductInputs, setNewProductInputs] = useState({})
  const [cat, setCat] = useState([])
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])
  const [imgFile, setImgFile] = useState("")
  //image link after upload success
  const [imageLink, setImageLink] = useState("")

  const dispatch = useDispatch()
  const privateRequest = usePrivateRequest()

  const handleChange = (e) => {
    setNewProductInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCategoriesChange = (e) => {
    setCat(e.target.value.split(","))
  }
  const handleColorsChange = (e) => {
    setColors(e.target.value.split(","))
  }
  const handleSizesChange = (e) => {
    setSizes(e.target.value.split(","))
  }

  console.log(colors, sizes)

  const addNewProduct = async (product) => {
    dispatch(startProcess())
    try {
      const res = await privateRequest.post("products", product)
      dispatch(createProductsuccess(res.data))
    } catch (error) {
      dispatch(failedProcess(error))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const fileName = new Date().getTime() + imgFile.name
    const storage = getStorage(app); // Create a root reference
    const storageRef = ref(storage, 'images/' + fileName);
    const uploadTask = uploadBytesResumable(storageRef, imgFile);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log(error)
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at', downloadURL);
          setImageLink(downloadURL)
          const newProductToAdd = { ...newProductInputs, categories: cat, colors, sizes, img: downloadURL }
          addNewProduct(newProductToAdd)
        });
      }
    );
  }

  return (
    <Container>
      <Title>New Product</Title>
      <ProductForm>
        <ProductFormLeft>
          <ProductLabel>Product Name</ProductLabel>
          <ProductInput onChange={(e) => handleChange(e)} name='title' type={"text"} placeholder="Apple Airpod" />

          <ProductLabel>Product Description</ProductLabel>
          <ProductInput onChange={(e) => handleChange(e)} name='desc' type={"text"} placeholder="long long description" />

          <ProductLabel>Product Categories</ProductLabel>
          <ProductInput onChange={(e) => handleCategoriesChange(e)} name='categories' type={"text"} placeholder="jeans,bags" />

          <ProductLabel>Product Colors</ProductLabel>
          <ProductInput onChange={(e) => handleColorsChange(e)} name='colors' type={"text"} placeholder="red,blue" />

          <ProductLabel>Product Sizes</ProductLabel>
          <ProductInput onChange={(e) => handleSizesChange(e)} name='sizes' type={"text"} placeholder="42,43,44" />

          <ProductLabel>Product Price</ProductLabel>
          <ProductInput onChange={(e) => handleChange(e)} name='price' type={"number"} placeholder="$100" />

          <ProductLabel>In stock</ProductLabel>
          <InstockSelect onChange={(e) => handleChange(e)} name="inStock" id="inStock">
            <InstockOption value={"yes"}>Yes</InstockOption>
            <InstockOption value={"no"}>No</InstockOption>
          </InstockSelect>

        </ProductFormLeft>
        <ProductFormRight>
          <ProductUpdateImage>
            <ProductUpdatedImg src={imageLink || "https://firebasestorage.googleapis.com/v0/b/ecommerce-images-pr.appspot.com/o/images%2Fdefault-product.png?alt=media&token=303d08ae-ada8-401a-bb99-1bc1e82ec7f0"} />
            <UploadLabel htmlFor='file'>
              <FileUploadIcon />
            </UploadLabel>
            <UploadInput name='img' onChange={e => setImgFile(e.target.files[0])} type={"file"} id="file" />
            <h5>{imgFile.name}</h5>
          </ProductUpdateImage>
        </ProductFormRight>
        <SubmitButton onClick={(e) => handleSubmit(e)}>Create</SubmitButton>
      </ProductForm>
    </Container>
  )
}

export default NewProduct