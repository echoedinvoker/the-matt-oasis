import { differenceInDays } from "date-fns"
import styled from "styled-components"
import Pay from "./Pay"

const List = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`
const Row = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 2rem 0;
`

const Col = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`

function UserBookingItem({ booking }) {
  const daysToStart = differenceInDays(new Date(booking.startDate), new Date())
  const daysToEnd = differenceInDays(new Date(booking.endDate), new Date())

  return (
    <List>
      {booking.status === 'unconfirmed' &&
        (
          daysToStart > 0
            ? <Row>
              <p>Cabin {booking.cabins.name} has {daysToStart} for check-in</p>
              {!booking.isPaid && <Pay size='small' id={booking.id} />}
            </Row>
            : daysToStart === 0
              ? <Col>
              <p>Cheking in to Cabin {booking.cabins.name} tody</p>
              {!booking.isPaid && <Pay size='small' id={booking.id} />}
              </Col>
              : <p>The reservation for Cabin {booking.cabins.name} has expired</p>
        )
      }
      {booking.status === 'checked-in' &&
        (
          daysToEnd > 0
            ? <p>Cabin {booking.cabins.name} has {daysToEnd} days remaining until check-out</p>
            : daysToEnd === 0
              ? <p>Cheking out to Cabin {booking.cabins.name} tody</p>
              : <p>Cabin {booking.cabins.name} has overdue check-out</p>
        )
      }
    </List>
  )
}

export default UserBookingItem
