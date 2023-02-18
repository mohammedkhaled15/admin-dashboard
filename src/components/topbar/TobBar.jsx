import styled from "styled-components"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: white;
`
const Wrapper = styled.div`
  height: 100%;
  padding:0px 20px;
  display: flex;
  align-items:center;
  justify-content: space-between;
`
const TopLeft = styled.div`

`
const Logo = styled.span`
  font-style: 28px;
  font-weight: bold;
  cursor: pointer;
  color: darkblue;
`
const TopRight = styled.div`
`
const IconContainer = styled.div`
`

const TobBar = () => {
  return (
    <Container>
      <Wrapper>
        <TopLeft>
          <Logo>Ecommerce Admin</Logo>
        </TopLeft>
        <TopRight>
          <IconContainer>
            <NotificationsNoneIcon />
          </IconContainer>
        </TopRight>
      </Wrapper>
    </Container>
  )
}

export default TobBar