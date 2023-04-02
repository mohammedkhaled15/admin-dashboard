import styled from "styled-components"
import { useState, useEffect } from "react"
import { clearError, login } from "../redux/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import LoaderSpinner from "../components/LoaderSpinner"

const Container = styled.div`
  width: 80%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
  border:1px solid teal;
  border-radius: 12px;
`
const LogOutButton = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 15px;
`

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { isFetching, error, currentUser } = useSelector(state => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  useEffect(() => {
    dispatch(clearError())
  }, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(navigate, from, dispatch, { username, password })
  }

  useEffect(() => {
    setPassword("")
    setUsername("")
  }, [currentUser])
  return (
    <Container>
      {isFetching && <LoaderSpinner />}

      <Form>
        {error && error?.message}
        <Input name="username" type={"text"} value={username} placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <Input name="password" type={"password"} value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <LogOutButton onClick={handleSubmit}>Login</LogOutButton>
      </Form>
    </Container>
  )
}

export default Login