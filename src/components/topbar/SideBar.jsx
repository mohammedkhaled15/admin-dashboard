import styled from "styled-components"
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
  background-color: #e2e2eb;
`
const Wrapper = styled.div`
  padding: 20px;
  color:#cfcfcf;
`
const Menue = styled.div`
  margin-bottom: 10px;
`
const Title = styled.h2`
  font-size: 13px;
  color: rgb(145, 145, 145);
`
const SideList = styled.ul`
  list-style: none;
  padding: 5px;
`
const ListItem = styled.li`
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 10px;
  &:hover, &.active {
    background-color:rgb(128, 128, 136) ;
  }
`
const Icon = styled.div`
  margin-right: 10px;
  font-size: 8px !important;
`

const SideBar = () => {
  return (
    <Container>
      <Wrapper>
        <Menue>
          <Title>Dashboard</Title>
          <SideList>
            <ListItem className="active">
              <Icon>
                <LineStyleIcon />
              </Icon>
              Home
            </ListItem>
            <ListItem>
              <Icon>
                <TimelineIcon />
              </Icon>
              Analytics
            </ListItem>
            <ListItem>
              <Icon>
                <TrendingUpIcon />
              </Icon>
              Trending
            </ListItem>
          </SideList>
        </Menue>
        <Menue>
          <Title>Quick Menue</Title>
          <SideList>
            <ListItem>
              <Icon>
                <GroupIcon />
              </Icon>
              Users
            </ListItem>
            <ListItem>
              <Icon>
                <CategoryIcon />
              </Icon>
              Products
            </ListItem>
            <ListItem>
              <Icon>
                <PaidIcon />
              </Icon>
              Transactions
            </ListItem>
          </SideList>
        </Menue>
        <Menue>
          <Title>Notifications</Title>
          <SideList>
            <ListItem >
              <Icon>
                <EmailIcon />
              </Icon>
              Mail
            </ListItem>
            <ListItem>
              <Icon>
                <WarningIcon />
              </Icon>
              Feedback
            </ListItem>
            <ListItem>
              <Icon>
                <ForumIcon />
              </Icon>
              Messages
            </ListItem>
          </SideList>
        </Menue>
        <Menue>
          <Title>Staff</Title>
          <SideList>
            <ListItem>
              <Icon>
                <ManageAccountsIcon />
              </Icon>
              Manage
            </ListItem>
            <ListItem>
              <Icon>
                <TimelineIcon />
              </Icon>
              Analytics
            </ListItem>
            <ListItem>
              <Icon>
                <SummarizeIcon />
              </Icon>
              Reports
            </ListItem>
          </SideList>
        </Menue>
      </Wrapper>
    </Container>
  )
}

export default SideBar