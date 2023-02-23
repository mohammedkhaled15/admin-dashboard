import SideBar from "./components/topbar/SideBar"
import TobBar from "./components/topbar/TobBar"
import styled from "styled-components"
import Home from "./pages/Home"
import Users from "./pages/Users"
import { Routes, Route } from "react-router-dom"
import UserPage from "./pages/UserPage"

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
          </Routes>
        </Components>
      </Container>
    </div>
  )
}

export default App
