import styled from "styled-components"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

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
  return (
    <Container>
      <FeatureItem>
        <Title>Revanue</Title>
        <FeatureContainer>
          <Money>$2,145</Money>
          <Rate>
            -11.4
            <IconContainer status="negative">
              <ArrowDownwardIcon />
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