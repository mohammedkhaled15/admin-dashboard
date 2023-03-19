import styled from 'styled-components'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect, useState } from 'react';
import usePrivateRequest from '../hooks/usePrivateRequestInterceptors';

const Container = styled.div`
  flex: 1;
  -webkit-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  padding: 20px;
  margin-right: 20px;
  border-radius: 10px;
`
const Title = styled.span`
  font-size: 22px;
  font-weight: bold;
`
const NewUsersList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`
const UserItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin:20px 0;
`
const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`
const UserInfo = styled.div`
  display: flex;
  flex-direction:column;
`
const Username = styled.span`
  font-weight: 600;
`
const UserTitle = styled.span`
  font-weight: 30;
`
const ShowUser = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 10px;
  padding: 7px 10px;
  background-color: #eeeef7;
  color: #555;
`

const WidgetSmall = () => {

  const [users, setUsers] = useState([])
  const privateRequest = usePrivateRequest()

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await privateRequest.get("users/findall/?new=true")
        setUsers(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getAllUsers()
  }, [])

  return (
    <Container>
      <Title>New Members</Title>
      <NewUsersList>
        {
          users.map(user => (
            <UserItem key={user._id}>
              <UserImage src={user.img || "/assits/defaultUser.png"} />
              <UserInfo>
                <Username>{user.username}</Username>
              </UserInfo>
              <ShowUser>
                <VisibilityIcon style={{ marginRight: "5px", fontsize: "16px" }} />
                Display
              </ShowUser>
            </UserItem>
          ))
        }
      </NewUsersList>
    </Container>
  )
}

export default WidgetSmall