import SideBar from "./components/topbar/SideBar"
import TobBar from "./components/topbar/TobBar"
import styled from "styled-components"
import Home from "./pages/Home"
const Container = styled.div`
  display: flex;
`
const Components = styled.div`
  flex: 4;
`

function App() {
  return (
    <div>
      <TobBar />
      <Container>
        <SideBar />
        <Components>
          <Home />
        </Components>
      </Container>
    </div>
  )
}

export default App
