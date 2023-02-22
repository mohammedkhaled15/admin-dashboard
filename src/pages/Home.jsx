import styled from "styled-components"
import Chart from "../components/topbar/Chart"
import FeaturedInfo from "../components/topbar/FeaturedInfo"
import WidgetLarge from "../components/topbar/WidgetLarge"
import WidgetSmall from "../components/topbar/WidgetSmall"
import { userData } from "../fakeData"

const Container = styled.div`
  width: 100%;
`
const Widgets = styled.div`
  display: flex;
  margin: 20px;
`
const Home = () => {
  return (
    <Container>
      <FeaturedInfo />
      <Chart data={userData} title="Users Analytics" dataKey={"Active Users"} grid={true} />
      <Widgets>
        <WidgetSmall />
        <WidgetLarge />
      </Widgets>
    </Container>
  )
}

export default Home