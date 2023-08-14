import { differenceInDays } from "date-fns"

function UserBookingItem({ booking }) {
  console.log(booking)
  const daysToStart = differenceInDays(new Date(booking.startDate), new Date())
  const daysToEnd = differenceInDays(new Date(booking.endDate), new Date())

  return (
    <>
      {booking.status === 'unconfirmed' &&
        (
          daysToStart > 0
            ? <p>Cabin {booking.cabins.name} has {daysToStart} for check-in</p>
            : daysToStart === 0
              ? <p>Cheking in to Cabin {booking.cabins.name} tody</p>
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
