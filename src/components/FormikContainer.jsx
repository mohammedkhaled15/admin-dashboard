import styled from "styled-components"
import { Formik, Form } from "formik"
import { withFormikDevtools } from 'formik-devtools-extension';

const Button = styled.button`
  width: 70%;
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
`

const FormikContainer = ({ initialValues, validateSchema, onSubmit, buttonAction, children }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateSchema}
      onSubmit={onSubmit}
      validateOnChange
    >
      {
        formik => {
          withFormikDevtools(formik);
          return (
            <Form style={{ flex: "4", display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", boxShadow: "0px 0px 16px -7px rgba(0,0,0,0.75)", padding: "20px", borderRadius: "10px" }}>
              {children}
              <Button
                type='submit'
                disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>{buttonAction}
              </Button>
            </Form>
          )
        }
      }
    </Formik >
  )
}

export default FormikContainer