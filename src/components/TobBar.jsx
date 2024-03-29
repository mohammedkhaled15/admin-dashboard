import styled from "styled-components"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";
import { logout } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../redux/userSlice";
import { persistor } from "./../redux/store";
import { useNavigate } from "react-router-dom";

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
  -webkit-box-shadow: 0px 13px 10px -1px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 13px 10px -1px rgba(0,0,0,0.75);
  box-shadow: 0px 6px 7px 0px rgba(0,0,0,0.75); ;
`
const TopLeft = styled.div`
  .logo{
    text-decoration: none;
  }
`
const Logo = styled.span`
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  color: darkblue;
  text-decoration: none !important;
`
const LogOutButton = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: #b62d29;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 15px;
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

  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.user.currentUser)
  const navigate = useNavigate()

  const handleLogout = () => {
    persistor.purge()
    logout(dispatch)
    dispatch(resetUser())
    navigate("/login", { replace: true })
  }

  return (
    <Container>
      <Wrapper>
        <TopLeft>
          <Link to="/" className="logo">
            <Logo>Ecommerce Admin</Logo>
          </Link>
        </TopLeft>
        <TopRight>
          {loggedUser && <LogOutButton onClick={handleLogout}>LogOut</LogOutButton>}
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
          <ProfileImage src={loggedUser?.img || "https://firebasestorage.googleapis.com/v0/b/ecommerce-images-pr.appspot.com/o/profileImgs%2FdefaultUser.png?alt=media&token=9387917b-a5a8-490d-968c-b8da0e1c9b1f"} />
        </TopRight>
      </Wrapper>
    </Container>
  )
}

export default TobBar