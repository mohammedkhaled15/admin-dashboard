import SideBar from "./components/topbar/SideBar"
import TobBar from "./components/topbar/TobBar"
import styled from "styled-components"
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
        <Components>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio voluptas quos alias corporis voluptatum molestiae, minus reprehenderit rerum! Dolorem animi repudiandae iusto. Odio enim eius dicta. Quidem cupiditate ullam ex.</Components>
      </Container>
    </div>
  )
}

export default App
