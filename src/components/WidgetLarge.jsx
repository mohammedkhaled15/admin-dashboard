import { useEffect, useState } from 'react'
import styled from 'styled-components'
import usePrivateRequest from '../hooks/usePrivateRequestInterceptors'
import { format } from "timeago.js"

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
  background-color: ${props => props.statusType === "succeeded" ? "#9deba1" : props.statusType === "pending" ? "#f0e87c" : "#d39997"};
  color: ${props => props.statusType === "succeeded" ? "#106414" : props.statusType === "pending" ? "#807a26" : "#701815"};
  cursor: pointer;
  text-align: center;
  border: none;
  border-radius: 10px;
  padding: 5px 7px;
  width: 90px;
`

const WidgetLarge = () => {

  const [orders, setOrders] = useState([])
  const privateRequest = usePrivateRequest()

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const res = await privateRequest.get("/orders")
        setOrders(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getAllOrders()
  }, [])

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
          {
            orders.map(order => (
              <TableRow key={order.createdAt}>
                <TableDataUser>
                  <Username>{order.userID}</Username>
                </TableDataUser>
                <TableData>{format(order.createdAt)}</TableData>
                <TableData>$ {order.amount}</TableData>
                <TableData><Button statusType={order.status.toLowerCase()}>{order.status.toUpperCase()}</Button></TableData>
              </TableRow>
            ))
          }
        </tbody>
      </Table>
    </Container>
  )
}

export default WidgetLarge