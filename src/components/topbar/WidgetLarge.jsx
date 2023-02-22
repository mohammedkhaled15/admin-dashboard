import styled from 'styled-components'

const Container = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.75);
  padding: 20px;
  margin-right: 20px;
  border-radius: 10px;
`
const Title = styled.span`
  font-size: 22px;
  font-weight: 600;
`
const Table = styled.table`
  width: 100%;
  border-spacing: 20px;
`
const TableRow = styled.tr`

`
const TableHeader = styled.th`
  text-align: left;
`
const TableDataUser = styled.td`
  display: flex;
  align-items: center;
  font-weight: 600;
`
const TableData = styled.td`
  font-weight: 400;
`
const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`
const Username = styled.span`

`
const Button = styled.button`
  background-color: ${props => props.statusType === "Approved" ? "#9deba1" : props.statusType === "Pending" ? "#f0e87c" : "#d39997"};
  color: ${props => props.statusType === "Approved" ? "#106414" : props.statusType === "Pending" ? "#807a26" : "#701815"};
  cursor: pointer;
  text-align: center;
  border: none;
  border-radius: 10px;
  padding: 5px 7px;
  width: 90px;
`

const WidgetLarge = () => {

  return (
    <Container>
      <Title>Latest Transactions</Title>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          <TableRow>
            <TableDataUser>
              <UserImage src={"/assits/user2.jpg"} />
              <Username>Mohammed Khaled</Username>
            </TableDataUser>
            <TableData>2 June 2021</TableData>
            <TableData>$ 205.00</TableData>
            <TableData><Button statusType={"Approved"}>Approved</Button></TableData>
          </TableRow>
          <TableRow>
            <TableDataUser>
              <UserImage src={"/assits/user2.jpg"} />
              <Username>Mohammed Khaled</Username>
            </TableDataUser>
            <TableData>2 June 2021</TableData>
            <TableData>$ 205.00</TableData>
            <TableData><Button statusType={"Declined"}>Declined</Button></TableData>
          </TableRow>
          <TableRow>
            <TableDataUser>
              <UserImage src={"/assits/user2.jpg"} />
              <Username>Mohammed Khaled</Username>
            </TableDataUser>
            <TableData>2 June 2021</TableData>
            <TableData>$ 205.00</TableData>
            <TableData><Button statusType={"Pending"}>Pending</Button></TableData>
          </TableRow>
        </tbody>
      </Table>
    </Container>
  )
}

export default WidgetLarge