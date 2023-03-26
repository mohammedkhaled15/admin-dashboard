import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const Container = styled.div`
  flex: 4;
  padding: 20px;
`
const Titlecontainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Title = styled.h2`
  
`
const AddNewUser = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  background-color: teal;
  color: white;
  font-size: 16px;
`
const UserContainer = styled.div`
  display: flex;
  margin-top: 20px;
`
const UserShow = styled.div`
  flex: 1;
  padding: 20px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
`
const UserUpdate = styled.div`
  flex: 2;
  border-radius: 10px;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  margin-left: 20px;
`
const UserShowTop = styled.div`
  display: flex;
  align-items: center;
`
const UserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`
const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`
const Name = styled.h4`
  font-weight: 600;
`
const UserTitle = styled.h5`
  font-weight: 300;
`
const UserShowBottom = styled.div`
  margin-top: 20px;
  `
const Subtitle = styled.h6`
  font-size: 14px;
  font-weight: 600;
  color: #8b8b8b;
  margin-bottom: 20px;
`
const IconContainer = styled.div`
.icon {
  font-size: 16px !important;
}
`
const UserInfoBottom = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
  color: #444;
`
const UserInfo = styled.span`
  margin-left: 10px;
  font-weight: 500;
`
const UserUpdateTitle = styled.h4`
  font-size: 24px;
  font-weight: 600;
`
const UserUpdateForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`
const UserUpdateLeft = styled.div`

`
const UserUpdateItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`
const Label = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
`
const InfoInput = styled.input`
  border: none;
  width: 250px;
  border-bottom: 1px solid gray;
  height: 30px;
`
const UserUpdateRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const UserUpdateUpload = styled.div`
  display: flex;
  align-items: center;
  .uploadIcon{
    cursor: pointer;
  }
`
const UserAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`
const PublishLabel = styled.label`
  cursor: pointer;
`
const UploadInput = styled.input`
  display: none;
`
const UserUpdateButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  color: white;
  background-color: darkblue;
  font-weight: 600;
`


const UserPage = () => {
  const userId = useLocation().pathname.split("/")[2]

  return (
    <Container >
      <Titlecontainer>
        <Title>Edit User</Title>
        <Link to={"/newUser"}>
          <AddNewUser>Create</AddNewUser>
        </Link>
      </Titlecontainer>
      <UserContainer>
        <UserShow>
          <UserShowTop>
            <UserImg src='../../public/assits/user2.jpg' />
            <UserInfoContainer>
              <Name>Cameron elsy</Name>
              <UserTitle>Software Engineer</UserTitle>
            </UserInfoContainer>
          </UserShowTop>
          <UserShowBottom>
            <Subtitle>Account Details</Subtitle>
            <UserInfoBottom>
              <IconContainer><PermIdentityIcon className='icon' /></IconContainer>
              <UserInfo>Johnsnow22</UserInfo>
            </UserInfoBottom>
            <UserInfoBottom>
              <IconContainer><CalendarTodayIcon className='icon' /></IconContainer>
              <UserInfo>10.08.2007</UserInfo>
            </UserInfoBottom>
            <Subtitle>Contact Details</Subtitle>
            <UserInfoBottom>
              <IconContainer><CallIcon className='icon' /></IconContainer>
              <UserInfo>+1 123 456 78</UserInfo>
            </UserInfoBottom>
            <UserInfoBottom>
              <IconContainer><EmailIcon className='icon' /></IconContainer>
              <UserInfo>Johnsnow22@hghgh.com</UserInfo>
            </UserInfoBottom>
            <UserInfoBottom>
              <IconContainer><HomeIcon className='icon' /></IconContainer>
              <UserInfo>NY Usa</UserInfo>
            </UserInfoBottom>
          </UserShowBottom>
        </UserShow>
        <UserUpdate>
          <UserUpdateTitle>Edit</UserUpdateTitle>
          <UserUpdateForm>
            <UserUpdateLeft>
              <UserUpdateItem>
                <Label>Username</Label>
                <InfoInput type={"text"} placeholder={"Mohadkhaled22"} />
              </UserUpdateItem>
              <UserUpdateItem>
                <Label>Fullname</Label>
                <InfoInput type={"text"} placeholder={"Mohammed khaled"} />
              </UserUpdateItem>
              <UserUpdateItem>
                <Label>Email</Label>
                <InfoInput type={"text"} placeholder={"22 jjjgd "} />
              </UserUpdateItem>
              <UserUpdateItem>
                <Label>Mobile</Label>
                <InfoInput type={"number"} placeholder={"544455848"} />
              </UserUpdateItem>
              <UserUpdateItem>
                <Label>Address</Label>
                <InfoInput type={"text"} placeholder={"dlkfsldfj lsdjlskdf"} />
              </UserUpdateItem>
            </UserUpdateLeft>
            <UserUpdateRight>
              <UserUpdateUpload>
                <UserAvatar src='../../public/assits/user3.jpg' />
                <PublishLabel htmlFor='file'>
                  <FileUploadIcon className='uploadIcon' />
                </PublishLabel>
                <UploadInput id='file' type={"file"} />
              </UserUpdateUpload>
              <UserUpdateButton>Update</UserUpdateButton>
            </UserUpdateRight>
          </UserUpdateForm>
        </UserUpdate>
      </UserContainer>
    </Container>
  )
}

export default UserPage