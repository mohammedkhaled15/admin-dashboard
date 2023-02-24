import SideBar from "./components/topbar/SideBar"
import TobBar from "./components/topbar/TobBar"
import styled from "styled-components"
import Home from "./pages/Home"
import Users from "./pages/Users"
import { Routes, Route } from "react-router-dom"
import UserPage from "./pages/UserPage"
import NewUser from "./pages/NewUser"
import ProductList from "./pages/ProductList"
import ProductPage from "./pages/ProductPage"
import NewProduct from "./pages/NewProduct"

const Container = styled.div`
  display: flex;
`
const Components = styled.div`
  flex: 4;
  margin-top: 10px;
`

function App() {
  return (
    <div>
      <TobBar />
      <Container>
        <SideBar />
        <Components>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:userId" element={<UserPage />} />
            <Route path="/newUser" element={<NewUser />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:productId" element={<ProductPage />} />
            <Route path="/newProduct" element={<NewProduct />} />
          </Routes>
        </Components>
      </Container>
    </div>
  )
}

export default App
