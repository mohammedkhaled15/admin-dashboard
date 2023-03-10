import styled from 'styled-components'

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
const NewUserForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
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
const GenderCollection = styled.div`
  
`
const GenderInput = styled.input`
  margin-top: 14px;
`
const GenderLabel = styled.label`
  margin: 10px;
  font-size: 18px;
  color: #555;
`
const SelectInput = styled.select`
  height: 40px;
  border-radius: 5px;
`
const Option = styled.option`
  
`
const SubmitButton = styled.button`
  width: 200px;
  border: none;
  background-color: darkblue;
  color: white;
  padding: 7px 10px;
  border-radius: 10px;
  margin-top: 30px;
  cursor: pointer;
  font-weight: 600;
`

const NewUser = () => {
  return (
    <Container>
      <Title>New User</Title>
      <NewUserForm>
        <NewUSerFormItem>
          <Label>Username</Label>
          <Input type={"text"} placeholder="Username" />
        </NewUSerFormItem>
        <NewUSerFormItem>
          <Label>Email</Label>
          <Input type={"text"} placeholder="Email" />
        </NewUSerFormItem>
        <NewUSerFormItem>
          <Label>Password</Label>
          <Input type={"password"} placeholder="Password" />
        </NewUSerFormItem>
        <NewUSerFormItem>
          <Label>Phone</Label>
          <Input type={"number"} placeholder="Phone" />
        </NewUSerFormItem>
        <NewUSerFormItem>
          <Label>Address</Label>
          <Input type={"text"} placeholder="Address" />
        </NewUSerFormItem>
        <NewUSerFormItem>
          <Label>Gender</Label>
          <GenderCollection>
            <GenderInput type={"radio"} name="gender" id='male' value={"male"} />
            <GenderLabel htmlFor='male'>Male</GenderLabel>
            <GenderInput type={"radio"} name="gender" id='female' value={"female"} />
            <GenderLabel htmlFor='female'>Female</GenderLabel>
          </GenderCollection>
        </NewUSerFormItem>
        <NewUSerFormItem>
          <Label>Active</Label>
          <SelectInput name='active' id="active">
            <Option value={"yes"}>Yes</Option>
            <Option value={"no"}>No</Option>
          </SelectInput>
        </NewUSerFormItem>
        <SubmitButton>Create</SubmitButton>
      </NewUserForm>
    </Container>
  )
}

export default NewUser