import styled from "styled-components"

const Input = styled.input`
  height: 20px;
  padding: 5px 10px;
  border: none;
  border-bottom: 1px solid gray;
  border-radius: 5px;
  font-size: 18px;
  &:focus{
    outline: none;
  }
`
const NewUSerFormItem = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-right: 20px;
`
const Label = styled.label`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #9b9b9b;
`
const FormInput = ({ label, onChange, id, ...inputProps }) => {
  return (
    <NewUSerFormItem>
      <Label>{label}</Label>
      <Input {...inputProps} onChange={onChange} />
    </NewUSerFormItem>
  )
}

export default FormInput