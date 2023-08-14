import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";
import { useUser } from "../authentication/useUser";

function BookingTable() {
  const { bookings , isLoading, count } = useBookings()
  const { user, isLoading: isLoading2 } = useUser()

  if (isLoading || isLoading2) return <Spinner />
  console.log(bookings)

  const { user_metadata: { role } } = user
  const isGuest = role === 'guest'
   
  if (!bookings.length) return <Empty resource="bookings" />

  return (
    <Menus>
      <Table columns={`0.6fr 2fr 2.4fr 1.4fr 1fr ${isGuest ? '7.2rem' : '3.2rem'}`}>
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings || []}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
