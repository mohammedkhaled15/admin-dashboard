import styled from "styled-components"
import { useState } from "react"
import { login } from "../redux/userSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const Container = styled.div`
  width: 80%;
  margin: 40px auto ;
`
const Form = styled.form`
  width: 60%;
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Input = styled.input`
  &:focus{
    outline: none;
    border: none;
    border-bottom: 1px solid #ccc;
  }
  padding: 10px 5px;
  width: 100%;
`
const Button = styled.button`
  border: none;
  background-color: gray;
  font-size: 16px;
  padding: 20px;
  cursor: pointer;
`

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(dispatch, { username, password })
    navigate("/home", { replace: true })
  }
  return (
    <Container>
      <Form>
        <Input name="username" type={"text"} value={username} placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <Input name="password" type={"password"} value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <Button onClick={handleSubmit}>Login</Button>
      </Form>
    </Container>
  )
}

export default Login