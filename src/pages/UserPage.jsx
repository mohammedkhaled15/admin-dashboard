import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebaseConfig"
import usePrivateRequest from '../hooks/usePrivateRequestInterceptors';
import { updateNewUserData } from '../apiCalls';

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
  display: flex;
  justify-content: center;
  align-items: center;
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
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 30px;
`
const UserUpdateLeft = styled.div`

`
const UserUpdateItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`
const Label = styled.label`
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
  justify-content: center;
  flex-direction: column;
  gap: 40px;
  .uploadIcon{
    cursor: pointer;
  }
`
const UserAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
`
const PublishLabel = styled.label`
  cursor: pointer;
  color: #008057;
  background-color: #81c9c9;
  border-radius: 5px;
  width: 60px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const UploadInput = styled.input`
  display: none;
`
const UserUpdateButton = styled.button`
  width: 80%;
  height: 40px;
  border: none;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  color: white;
  margin: 0 auto;
  font-size: 18px;
  letter-spacing: 2px;
  background-color: darkblue;
  font-weight: 600;
`

const UserPage = () => {
  const userId = useLocation().pathname.split("/")[2]
  const privateRequest = usePrivateRequest()
  const dispatch = useDispatch()

  const userData = useSelector(state => state.usersData.usersData.find(user => user._id === userId))
  const userInitialState = {
    username: userData.username,
    firstname: userData.firstname,
    lastname: userData.lastname,
    mobile: userData.mobile,
    email: userData.email,
    address: userData.address,
  }
  const [userNewData, setUserNewData] = useState(userInitialState)

  const [imageFile, setImageFile] = useState("")
  const [profileImg, setProfileImg] = useState(userData.img)

  const handleInputChange = (e) => {
    setUserNewData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  console.log(userNewData)
  const id = userId
  useEffect(() => {
    const handleImgUpload = async () => {
      const fileName = new Date().getTime() + imageFile.name
      const storage = getStorage(app); // Create a root reference
      const storageRef = ref(storage, 'profileImgs/' + fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('File available at', downloadURL);
            setProfileImg(downloadURL)
          });
        }
      );
    }
    imageFile && handleImgUpload()
  }, [imageFile])

  const handleUpdate = (e) => {
    e.preventDefault()
    updateNewUserData(dispatch, id, privateRequest, userNewData)
  }

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
            <UserImg src={userData.img} />
            <UserInfoContainer>
              <Name>{userData.firstname.toUpperCase() + " " + userData.lastname.toUpperCase()}</Name>
            </UserInfoContainer>
          </UserShowTop>
          <UserShowBottom>
            <Subtitle>Account Details</Subtitle>
            <UserInfoBottom>
              <IconContainer><PermIdentityIcon className='icon' /></IconContainer>
              <UserInfo>{userData.username}</UserInfo>
            </UserInfoBottom>
            <Subtitle>Contact Details</Subtitle>
            <UserInfoBottom>
              <IconContainer><CallIcon className='icon' /></IconContainer>
              <UserInfo>{userData.mobile}</UserInfo>
            </UserInfoBottom>
            <UserInfoBottom>
              <IconContainer><EmailIcon className='icon' /></IconContainer>
              <UserInfo>{userData.email}</UserInfo>
            </UserInfoBottom>
            <UserInfoBottom>
              <IconContainer><HomeIcon className='icon' /></IconContainer>
              <UserInfo>{userData.address}</UserInfo>
            </UserInfoBottom>
          </UserShowBottom>
        </UserShow>
        <UserUpdate>
          <UserUpdateTitle>Edit</UserUpdateTitle>
          <UserUpdateForm>
            <UserUpdateLeft>
              <UserUpdateItem>
                <Label>Username</Label>
                <InfoInput type={"text"} name="username" placeholder={userData.username} onChange={(e) => handleInputChange(e)} />
              </UserUpdateItem>
              <UserUpdateItem>
                <Label>First name</Label>
                <InfoInput type={"text"} name="firstname" placeholder={userData.firstname} onChange={(e) => handleInputChange(e)} />
              </UserUpdateItem>
              <UserUpdateItem>
                <Label>Last Name</Label>
                <InfoInput type={"text"} name="lastname" placeholder={userData.lastname} onChange={(e) => handleInputChange(e)} />
              </UserUpdateItem>
              <UserUpdateItem>
                <Label>Email</Label>
                <InfoInput type={"text"} name="email" placeholder={userData.email} onChange={(e) => handleInputChange(e)} />
              </UserUpdateItem>
              <UserUpdateItem>
                <Label>Mobile</Label>
                <InfoInput type={"number"} name="mobile" placeholder={userData.mobile} onChange={(e) => handleInputChange(e)} />
              </UserUpdateItem>
              <UserUpdateItem>
                <Label>Address</Label>
                <InfoInput type={"text"} name="address" placeholder={userData.address} onChange={(e) => handleInputChange(e)} />
              </UserUpdateItem>
            </UserUpdateLeft>
            <UserUpdateRight>
              <UserUpdateUpload>
                <UserAvatar src={profileImg} />
                <PublishLabel htmlFor='file'>
                  <FileUploadIcon className='uploadIcon' />
                </PublishLabel>
                <UploadInput id='file' type={"file"} onChange={(e) => setImageFile(e.target.files[0])} />
              </UserUpdateUpload>
            </UserUpdateRight>
            <UserUpdateButton onClick={(e) => handleUpdate(e)}>Update</UserUpdateButton>
          </UserUpdateForm>
        </UserUpdate>
      </UserContainer>
    </Container>
  )
}

export default UserPage