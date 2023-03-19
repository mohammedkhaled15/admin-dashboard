import SideBar from "./components/SideBar"
import TobBar from "./components/TobBar"
import styled from "styled-components"
import Home from "./pages/Home"
import Users from "./pages/Users"
import { Routes, Route, Navigate } from "react-router-dom"
import UserPage from "./pages/UserPage"
import NewUser from "./pages/NewUser"
import ProductList from "./pages/ProductList"
import ProductPage from "./pages/ProductPage"
import NewProduct from "./pages/NewProduct"
import Login from "./pages/Login"
import { useSelector } from "react-redux"
import SharedLayout from "./pages/SharedLayout"

const Container = styled.div`
  display: flex;
`
const Components = styled.div`
  flex: 4;
  margin-top: 10px;
`
function App() {

  const currentUser = useSelector(state => state.user.currentUser)

  return (
    <div>
      <TobBar />
      <Container>
        <SideBar />
        <Components>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={currentUser ? <SharedLayout /> : <Navigate to={"/login"} replace={true} />}>
              <Route path="/home" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:userId" element={<UserPage />} />
              <Route path="/newUser" element={<NewUser />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:productId" element={<ProductPage />} />
              <Route path="/newProduct" element={<NewProduct />} />
            </Route>
          </Routes>
        </Components>
      </Container>
    </div>
  )
}

export default App
