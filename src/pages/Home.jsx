import { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import Chart from "../components/Chart"
import FeaturedInfo from "../components/FeaturedInfo"
import WidgetLarge from "../components/WidgetLarge"
import WidgetSmall from "../components/WidgetSmall"
import usePrivateRequest from "../hooks/usePrivateRequestInterceptors"

const Container = styled.div`
  width: 100%;
`
const Widgets = styled.div`
  display: flex;
  margin: 20px;
`
const Home = () => {

  const [usersStats, setUsersStats] = useState([])
  const privateRequest = usePrivateRequest()

  const Months = useMemo(() => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ], [])

  useEffect(() => {
    const getUsersStats = async () => {
      try {
        const res = await privateRequest.get("/users/stats")
        res.data.map(item => {
          setUsersStats(prev => [...prev, { name: Months[item._id - 1], "Active Users": item.total }])
        })
      } catch (error) {
        console.log(error)
      }
    }
    getUsersStats()
  }, [Months])

  return (
    <Container>
      <FeaturedInfo />
      <Chart data={usersStats} title="Users Analytics" dataKey={"Active Users"} grid={true} />
      <Widgets>
        <WidgetSmall />
        <WidgetLarge />
      </Widgets>
    </Container>
  )
}

export default Home