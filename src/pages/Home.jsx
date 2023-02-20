import styled from "styled-components"
import FeaturedInfo from "../components/topbar/FeaturedInfo"

const Container = styled.div`
  display: flex;
`
const Home = () => {
  return (
    <Container>
      <FeaturedInfo />
    </Container>
  )
}

export default Home