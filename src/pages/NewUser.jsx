import styled from 'styled-components'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { createNewUser } from '../apiCalls'
import usePrivateRequest from '../hooks/usePrivateRequestInterceptors'

const Container = styled.div`
  flex: 4;
  -webkit-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  padding: 20px;
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
  // console.log(values)
  await createNewUser(privateRequest, values)
  // console.log(onSubmitProps)
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

  const Inputs = [
    {
      name: "firstname",
      type: "text",
      placeholder: "Firstname",
    },
    {
      name: "lastname",
      type: "text",
      placeholder: "Lastname",
    },
    {
      name: "username",
      type: "text",
      placeholder: "Username",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      name: "mobile",
      type: "tel",
      placeholder: "Mobile",
    },
    {
      name: "address",
      type: "text",
      placeholder: "Address",
    },
  ]

  return (
    <Container>
      <Title>New User</Title>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values, onSubmitProps) => onSubmit(values, onSubmitProps, privateRequest)} validateOnChange>
        {
          formik => {
            // console.log(formik)
            return (
              <Form style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                {Inputs.map((input, index) => {
                  return (
                    <FormControl key={index}>
                      <Label htmlFor={input.name}>{input.name.toUpperCase()}</Label>
                      {/* <Field type={input.type} name={input.name} id={input.name} /> */}
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
                })}
                <button type='submit' disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>Create</button>
              </Form>
            )
          }
        }
      </Formik>
    </Container>
  )
}

export default NewUser