import styled from "styled-components"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useEffect, useState } from "react";
import usePrivateRequest from "../hooks/usePrivateRequestInterceptors";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const FeatureItem = styled.div`
  flex: 1;
  margin: 0px 20px;
  border-radius: 10px;
  padding: 30px;
  cursor: pointer;
  -webkit-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
`
const Title = styled.h2`
  font-size: 20px;
`
const FeatureContainer = styled.div`
  margin: 10px 0px;
  display: flex;
  align-items: center;
`
const Money = styled.div`
  font-size: 30px;
  font-weight: bold;
`
const Rate = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`
const IconContainer = styled.div`
  font-size: 14px;
  margin-left: 5px;
  color: ${props => props.status === "negative" ? "red" : "green"};
`
const FeaturedSubTitle = styled.h4`
  font-size: 15px;
  color: gray;
`

const FeaturedInfo = () => {

  const [ordersIncome, setOrdersIncome] = useState([])
  const [rate, setRate] = useState(0)
  const privateRequest = usePrivateRequest()

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await privateRequest.get("/orders/income")
        setOrdersIncome(res.data)
        setRate((((res.data[1]?.total * 100) / (res.data[0]?.total || 1)) - 100).toFixed(2))
      } catch (error) {
        console.log(error)
      }
    }
    getIncome()
  }, [])

  return (
    <Container>
      <FeatureItem>
        <Title>Revanue</Title>
        <FeatureContainer>
          <Money>${ordersIncome[1]?.total / 100}</Money>
          <Rate>
            {rate}%
            <IconContainer status={rate > 0 ? "positive" : "negative"}>
              {rate > 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
            </IconContainer>
          </Rate>
        </FeatureContainer>
        <FeaturedSubTitle>Compared To last Month</FeaturedSubTitle>
      </FeatureItem>
      <FeatureItem>
        <Title>Sales</Title>
        <FeatureContainer>
          <Money>$2,145</Money>
          <Rate>
            -11.4
            <IconContainer>
              <ArrowUpwardIcon />
            </IconContainer>
          </Rate>
        </FeatureContainer>
        <FeaturedSubTitle>Compared To last Month</FeaturedSubTitle>
      </FeatureItem>
      <FeatureItem>
        <Title>Cost</Title>
        <FeatureContainer>
          <Money>$2,145</Money>
          <Rate>
            -11.4
            <IconContainer>
              <ArrowDownwardIcon status="negative" />
            </IconContainer>
          </Rate>
        </FeatureContainer>
        <FeaturedSubTitle>Compared To last Month</FeaturedSubTitle>
      </FeatureItem>
    </Container>
  )
}

export default FeaturedInfo