import styled from 'styled-components'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebaseConfig"
import { useDispatch } from "react-redux"
import { createProductsuccess, failedProcess, startProcess } from '../redux/productSlice';
import usePrivateRequest from '../hooks/usePrivateRequestInterceptors';
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"


const Container = styled.div`
  flex: 4;
  -webkit-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  padding: 20px;
  margin: 15px;
  button{
    width: 40%;
    height: 40px;
    border: none;
    background-color: darkblue;
    color: white;
    cursor: pointer;
    padding: 7px 10px;
    border-radius: 10px;
    margin-top: 30px;
    font-weight: 600;
    &:disabled{
      background-color: gray;
      color: darkgray;
      cursor: default;
    }
  }
`
const Title = styled.h1`
  margin-bottom: 20px;
`
const FormControl = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  margin:20px 0;
  input{
    height: 25px;
    padding: 5px 10px;
    border: none;
    border-bottom: 1px solid gray;
    border-radius: 2px;
    font-size: 18px;
    background-color: none;
    &:focus{
    outline: none;
    }
    &:invalid{
      border:solid 2px red;
    }
  }
`
const Label = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 600;
  color: #9b9b9b;
`
const ErrorMsg = styled.label`
  font-size: 12px;
  padding: 3px;
  color: red;
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

const initialValues = {
  prodName: "",
  prodDesc: "",
  prodCat: "",
  prodColors: "",
  prodSizes: "",
  prodPrice: "",
  inStock: "",
  prodImg: ""
}
const onSubmit = (values) => {
  console.log(values)
}

const validationSchema = Yup.object({
  prodName: Yup.string().required("*Required"),
  prodDesc: Yup.string().required("*Required"),
  prodCat: Yup.string().required("*Required"),
  prodColors: Yup.string().required("*Required"),
  prodSizes: Yup.string().required("*Required"),
  prodPrice: Yup.number().required("*Required"),
  inStock: Yup.boolean().required("*Required"),
  prodImg: Yup.string().required("*Required")
})

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

  const Inputs = [
    {
      name: "prodName",
      type: "text",
      placeholder: "Product Name",
    },
    {
      name: "prodDesc",
      type: "text",
      placeholder: "Product Description",
    },
    {
      name: "prodCat",
      type: "text",
      placeholder: "Product Categories (jeans,dresses)",
    },
    {
      name: "prodColors",
      type: "text",
      placeholder: "Product Colors (red, yellow)",
    },
    {
      name: "prodSizes",
      type: "password",
      placeholder: "Product Sizes (XL, M) OR (42,43)",
    },
    {
      name: "prodPrice",
      type: "number",
      placeholder: "Product Price",
    },
    {
      name: "inStock",
      control: "select",
      type: "select",
      placeholder: "Mobile",
    },
    {
      name: "img",
      type: "text",
      placeholder: "Image",
    },
  ]

  return (
    <Container>
      <Title>New Product</Title>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values, onSubmitProps) => onSubmit(values, onSubmitProps, privateRequest)} validateOnChange>
        {
          formik => {
            return (
              <Form style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                {Inputs.map((input, index) => {
                  switch (input.control) {
                    case ("select"): return (
                      <FormControl key={index}>
                        <Label htmlFor={input.name}>{input.name.toUpperCase()}</Label>
                        <Field name={input.name} as={input.control}>
                          {
                            ["Yes", "No"].map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))
                          }
                        </Field>
                        <ErrorMessage name={input.name}>
                          {error => <ErrorMsg>{error}</ErrorMsg>}
                        </ErrorMessage>
                      </FormControl>
                    )
                    default: return (
                      <FormControl key={index}>
                        <Label htmlFor={input.name}>{input.name.toUpperCase()}</Label>
                        <Field name={input.name} >
                          {
                            props => {
                              const { field, form, meta } = props
                              return (
                                <input id={input.name} type={input.type} {...field} style={(meta.error && meta.touched) ? { border: "solid red 1px" } : null} />
                              )
                            }
                          }
                        </Field>
                        <ErrorMessage name={input.name}>
                          {error => <ErrorMsg>{error}</ErrorMsg>}
                        </ErrorMessage>
                      </FormControl>
                    )
                  }
                })}
                <button type='submit' disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>Create</button>
              </Form>
            )
          }
        }
      </Formik>
      {/* <ProductForm>
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
      </ProductForm> */}
    </Container>
  )
}

export default NewProduct