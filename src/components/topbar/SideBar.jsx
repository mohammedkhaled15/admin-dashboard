import styled from "styled-components"
import { NavLink } from "react-router-dom"
import LineStyleIcon from '@mui/icons-material/LineStyle';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import PaidIcon from '@mui/icons-material/Paid';
import EmailIcon from '@mui/icons-material/Email';
import WarningIcon from '@mui/icons-material/Warning';
import ForumIcon from '@mui/icons-material/Forum';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const Container = styled.div`
  flex: 1;
  min-height: calc(100vh - 50px);
  position: sticky;
  top: 50px;
  background-color: #f9f9fb;
`
const Wrapper = styled.div`
  padding: 20px;
  color:#adadad;
  position: sticky;
  top: 50px;
`
const Menue = styled.div`
  margin-bottom: 6px;
`
const Title = styled.h2`
  font-size: 15px;
  color: rgb(145, 145, 145);
`
const SideList = styled.ul`
  list-style: none;
  padding: 5px;
`
const ListItem = styled.li`
  border-radius: 10px;
  margin-bottom: 4px;
  padding-right: 10px;
  &:hover {
    background-color:rgb(128, 128, 136) ;
    color: white;
  }
`
const Icon = styled.div`
  margin-right: 10px;
  font-size: 8px !important;
`
const linkDefaultStyles = {
  borderRadius: "10px",
  textDecoration: "none",
  width: "100%",
  display: "flex",
  alignItems: "center",
  color: "inherit",
  padding: "5px",
}
const activeLinkStyles = {
  backgroundColor: "#808088",
  ...linkDefaultStyles,
  color: "white",
}

const SideBar = () => {
  return (
    <Container>
      <Wrapper>
        <Menue>
          <Title>Dashboard</Title>
          <SideList>
            <ListItem >
              <NavLink style={({ isActive }) => isActive ? activeLinkStyles : linkDefaultStyles
              } to={"/"}>
                <Icon>
                  <LineStyleIcon />
                </Icon>
                Home
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink style={({ isActive }) => isActive ? activeLinkStyles : linkDefaultStyles
              } to={"/analytics"}>
                <Icon>
                  <TimelineIcon />
                </Icon>
                Analytics
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink style={({ isActive }) => isActive ? activeLinkStyles : linkDefaultStyles
              } to={"/trending"}>
                <Icon>
                  <TrendingUpIcon />
                </Icon>
                Trending
              </NavLink>
            </ListItem>
          </SideList>
        </Menue>
        <Menue>
          <Title>Quick Menue</Title>
          <SideList>
            <ListItem>
              <NavLink style={({ isActive }) => isActive ? activeLinkStyles : linkDefaultStyles
              } to={"/users"}>
                <Icon>
                  <GroupIcon />
                </Icon>
                Users
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink style={({ isActive }) => isActive ? activeLinkStyles : linkDefaultStyles
              } to={"/products"}>
                <Icon>
                  <CategoryIcon />
                </Icon>
                Products
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink style={({ isActive }) => isActive ? activeLinkStyles : linkDefaultStyles
              } to={"/transactions"}>
                <Icon>
                  <PaidIcon />
                </Icon>
                Transactions
              </NavLink>
            </ListItem>
          </SideList>
        </Menue>
        <Menue>
          <Title>Notifications</Title>
          <SideList>
            <ListItem >
              <NavLink style={({ isActive }) => isActive ? activeLinkStyles : linkDefaultStyles
              } to={"/mail"}>
                <Icon>
                  <EmailIcon />
                </Icon>
                Mail
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink style={({ isActive }) => isActive ? activeLinkStyles : linkDefaultStyles
              } to={"/feedback"}>
                <Icon>
                  <WarningIcon />
                </Icon>
                Feedback
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink style={({ isActive }) => isActive ? activeLinkStyles : linkDefaultStyles
              } to={"/messages"}>
                <Icon>
                  <ForumIcon />
                </Icon>
                Messages
              </NavLink>
            </ListItem>
          </SideList>
        </Menue>
        <Menue>
          <Title>Staff</Title>
          <SideList>
            <ListItem>
              <NavLink style={({ isActive }) => isActive ? activeLinkStyles : linkDefaultStyles
              } to={"/manage"}>
                <Icon>
                  <ManageAccountsIcon />
                </Icon>
                Manage
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink style={({ isActive }) => isActive ? activeLinkStyles : linkDefaultStyles
              } to={"/analytics"}>
                <Icon>
                  <TimelineIcon />
                </Icon>
                Analytics
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink style={({ isActive }) => isActive ? activeLinkStyles : linkDefaultStyles
              } to={"/reports"}>
                <Icon>
                  <SummarizeIcon />
                </Icon>
                Reports
              </NavLink>
            </ListItem>
          </SideList>
        </Menue>
      </Wrapper>
    </Container>
  )
}

export default SideBar