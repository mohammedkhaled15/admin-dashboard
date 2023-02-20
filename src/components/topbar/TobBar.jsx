import styled from "styled-components"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';

const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 9999;
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
  display: flex;
  align-items:center ;
`
const IconContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin-right: 10px;
  color: #555;
`
const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: 0px;
  background-color: red;
  border-radius:50%;
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;  
`
const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
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
            <Badge>2</Badge>
          </IconContainer>
          <IconContainer>
            <LanguageIcon />
          </IconContainer>
          <IconContainer>
            <SettingsIcon />
          </IconContainer>
          <ProfileImage src="../../../public/assits/user1.jpg" />
        </TopRight>
      </Wrapper>
    </Container>
  )
}

export default TobBar