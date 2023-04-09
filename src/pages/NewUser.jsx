import styled from 'styled-components'
import * as Yup from "yup"
import { createNewUser } from '../apiCalls'
import usePrivateRequest from '../hooks/usePrivateRequestInterceptors'
import FormikContainer from '../components/FormikContainer'
import FormikControl from '../components/FormikControl'

const Container = styled.div`
  flex: 4;
  -webkit-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  padding: 20px;
`
const Title = styled.h1`
  margin-bottom: 20px;
`

const initialValues = {
  firstname: "",
  lastname: "",
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
  mobile: "",
  address: "",
}
const onSubmit = async (values, onSubmitProps, privateRequest) => {
  console.log(values)
  await createNewUser(privateRequest, values)
  onSubmitProps.setSubmitting(false)
  onSubmitProps.resetForm()
}

const validationSchema = Yup.object({
  firstname: Yup.string().required("*Required"),
  lastname: Yup.string().required("*Required"),
  username: Yup.string().required("*Required").matches(/^[A-Za-z][A-Za-z0-9_]{3,16}$/, "Username should be 3-16 characters and shouldn;t include any special character"),
  password: Yup.string().required("*Required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/, "It should include at least one letter, one number and one special chracter"),
  confirmPassword: Yup.string().required("*Required").oneOf([Yup.ref("password")], 'Your passwords do not match.'),
  email: Yup.string().required("*Required").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Not Valid Email Address"),
  mobile: Yup.string().required("*Required").matches(/^[0][0-9]{10}$/, "Not Valid Mobile Number"),
  address: Yup.string().required("*Required")
})

const NewUser = () => {

  const privateRequest = usePrivateRequest()

  const inputs = [
    {
      label: "firstname",
      name: "firstname",
      type: "text",
      placeholder: "Your Firstname",
    },
    {
      label: "lastname",
      name: "lastname",
      type: "text",
      placeholder: "Your Lastname",
    },
    {
      label: "username",
      name: "username",
      type: "text",
      placeholder: "Choose a username",
    },
    {
      label: "password",
      name: "password",
      type: "password",
      placeholder: "Type a difficult password",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      label: "Mobile Number",
      name: "mobile",
      type: "tel",
      placeholder: "Mobile",
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      placeholder: "Address",
    },
  ]

  return (
    <Container>
      <Title>New User</Title>
      <FormikContainer initialValues={initialValues} validateSchema={validationSchema} onSubmit={(values, onSubmitProps) => onSubmit(values, onSubmitProps, privateRequest)} buttonAction={"Create"}>
        {
          inputs.map(input => (
            <FormikControl key={input.name} control="input" label={input.label} name={input.name} type={input.type} placeholder={input.placeholder} />
          ))
        }
      </FormikContainer>
    </Container>
  )
}

export default NewUser