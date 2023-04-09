import styled from 'styled-components'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import * as Yup from "yup"
import FormikContainer from '../components/FormikContainer';
import FormikControl from '../components/FormikControl';
import usePrivateRequest from '../hooks/usePrivateRequestInterceptors';

const Container = styled.div`
  flex: 4;
  padding: 20px;
  margin: 15px;
`
const Title = styled.h1`
  margin-bottom: 20px;
`
const initialValues = {
  title: "",
  dec: "",
  categories: "",
  colors: "",
  size: "",
  price: "",
  inStock: "",
  img: ""
}
const onSubmit = async (values, { resetForm }) => {
  try {
    const res = await privateRequest.post("/products", {
      categories: values.categories.split(","),
      colors: values.colors.split(","),
      size: values.size.split(","),
      ...values
    })
    console.log(res)
    console.log("initialValues: ", values)
    resetForm()
  } catch (error) {
    console.log(error)
  }
}

const validationSchema = Yup.object({
  title: Yup.string().required("*Required"),
  desc: Yup.string().required("*Required"),
  categories: Yup.string().required("*Required"),
  colors: Yup.string().required("*Required"),
  size: Yup.string().required("*Required"),
  price: Yup.number().required("*Required"),
  inStock: Yup.boolean().required("*Required"),
  img: Yup.string().required("*Required"),
})

const inputs = [
  {
    name: "title",
    label: "Product Name",
    type: "text",
    placeholder: "Product Name",
  },
  {
    name: "desc",
    label: "Product Description",
    type: "text",
    placeholder: "Product Description",
  },
  {
    name: "categories",
    label: "Product Category",
    type: "text",
    placeholder: "Product Categories (jeans,dresses)",
  },
  {
    name: "colors",
    label: "Product Colors",
    type: "text",
    placeholder: "Product Colors (red, yellow)",
  },
  {
    name: "size",
    label: "Product Sizes",
    type: "password",
    placeholder: "Product Sizes (XL, M) OR (42,43)",
  },
  {
    name: "price",
    label: "Product Price",
    type: "number",
    placeholder: "Product Price",
  },
  {
    name: "inStock",
    label: "In Stock",
    control: "select",
    type: "select",
    inStockOptions: [{ key: "Select Option", value: "" }, { key: "Yes", value: true }, { key: "No", value: false }]
  },
  {
    name: "img",
    control: "imgUpload",
    label: <FileUploadIcon />,
    type: "file",
  },
]

const NewProduct = () => {

  const privateRequest = usePrivateRequest()

  const onSubmit = async (values, { resetForm }) => {
    try {
      const res = await privateRequest.post("/products", {
        categories: values.categories.split(","),
        colors: values.colors.split(","),
        size: values.size.split(","),
        ...values
      })
      console.log(res)
      console.log("initialValues: ", values)
      resetForm()
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <Container>
      <Title>New Product</Title>
      <FormikContainer initialValues={initialValues} validateSchema={validationSchema} onSubmit={onSubmit} buttonAction={"Create"}>
        {
          inputs.map(input => (
            <FormikControl key={input.name} control={input.control} label={input.label} name={input.name} type={input.type} placeholder={input.placeholder} options={input.inStockOptions} />
          ))
        }
      </FormikContainer>
    </Container>
  )
}

export default NewProduct