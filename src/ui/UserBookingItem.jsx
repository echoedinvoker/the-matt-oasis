import { differenceInDays } from "date-fns"
import Button from "./Button"
import styled from "styled-components"

const Row = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 2rem 0;
`
const Pay = styled(Button)`
  letter-spacing: 2px;
  text-transform: uppercase;
`

Pay.defaultProps = { 
  $variation: 'primary',
  children: 'pay'
}

function UserBookingItem({ booking }) {
  console.log(booking)
  const daysToStart = differenceInDays(new Date(booking.startDate), new Date())
  const daysToEnd = differenceInDays(new Date(booking.endDate), new Date())

  return (
    <>
      {booking.status === 'unconfirmed' &&
        (
          daysToStart > 0
            ? <Row>
              <p>Cabin {booking.cabins.name} has {daysToStart} for check-in</p>
              <Pay $size='small'>Pay</Pay>
            </Row>
            : daysToStart === 0
              ? <Row>
              <p>Cheking in to Cabin {booking.cabins.name} tody</p>
              <Pay $size='small'/>
              </Row>
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
    </>
  )
}

export default UserBookingItem
