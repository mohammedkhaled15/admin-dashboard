import styled from "styled-components"
import { Field, ErrorMessage } from "formik"

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
  ::placeholder{
    color:"red"
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

const FormikControl = ({ control, label, name, ...rest }) => {
  switch (control) {
    case "input": return (
      <FormControl>
        <Label htmlFor={name}>{label.toUpperCase()}</Label>
        <Field id={name} name={name}>
          {
            ({ field, form, meta }) => {
              return (
                <input {...rest} {...field} style={(meta.error && meta.touched) ? { border: "solid red 1px" } : null} />
              )
            }
          }
        </Field>
        <ErrorMessage name={name}>
          {error => <ErrorMsg>{error}</ErrorMsg>}
        </ErrorMessage>
      </FormControl>
    )
    case "textarea":
    case "select":
    case "radio":
    case "checkbox":
    case "date":
    default: return null
  }

}

export default FormikControl