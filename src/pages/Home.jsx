import { useState } from "react"
import CabinSlick from "../features/cabins/CabinSlick"
import ActivitiesSlider from "../ui/ActivitiesSlider"
import { useCabins } from "../features/cabins/useCabins"
import Spinner from "../ui/Spinner"
import Description from "../ui/Description"
import styled from 'styled-components'
import Button from "../ui/Button"
import { useBookingsByDates } from "../features/bookings/useBookingsByDates"
import Modal from "../ui/Modal"
import BookingForm from "../features/cabins/BookingForm"
import { useCurrentUserBookings } from "../features/bookings/useBookingsbyGuestId"
import UserBookingItem from "../ui/UserBookingItem"
import Heading from "../ui/Heading"


const Row = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  align-items: center;
  gap: 2.4rem;
`
const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.2rem;
`

const DiscountBooking = styled(Button)`
  position: relative;
  display: inline-block;

  & label {
  position: absolute;
  bottom: -5px;
  right: -4rem;
  background: red;
  color: white;
  padding: 2px 5px;
  font-size: 12px;
  border-radius: 3px;
  transform: rotate(-15deg);
  letter-spacing: 1px;
  text-transform: uppercase;

  & label:before {
      content: '';
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 100%;
  height: 5px;
  background: red;
  border-radius: 50%;
    }
}
`
const DisabledButton = styled(Button)`
  background-color: var(--color-grey-700);
  color: var(--color-grey-200);

  &:hover {
    background-color: var(--color-grey-700);
    color: var(--color-grey-200);
  }
`

DisabledButton.defaultProps = {
  disabled: true,
  $size: 'large'
}

const BookingsList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

function Home() {
  const { cabins = [], isLoading } = useCabins()
  const [cabinId, setCabinId] = useState(0)
  const { bookings = [], isLoading: isLoading2 } = useBookingsByDates()
  const { bookings: userBookings = [], isLoading: isLoading3 } = useCurrentUserBookings()

  if (isLoading || isLoading2 || isLoading3) <Spinner />

  const activeBookings = userBookings.filter(b => b.status !== 'checked-out')
  const description = cabinId > 0 && cabins?.find(cabin => cabin.id === cabinId).description
  const invalidCabins = bookings.map(booking => booking.cabins.name)
  const validCabinIDs = cabins.filter(cabin => !invalidCabins.includes(cabin.name)).map(cabin => cabin.id)
  const id = validCabinIDs[Math.floor(Math.random() * validCabinIDs.length)]
  const cabin = cabins.find(cabin => cabin.id === id) || {}
  const { name, maxCapacity, discount, regularPrice } = cabin

  return (
    <Modal>
      <CabinSlick onChange={setCabinId} />
      <ActivitiesSlider />
      <Row type="horizontal">
        <Description text={description} />
        <Box>
          <Heading as='h2'>Activities</Heading>
          {activeBookings.length > 0
            ? <BookingsList>
              {activeBookings.map(b => <UserBookingItem key={b.id} booking={b} />)}
            </BookingsList>
            : <p>You haven't booked any cabins yet.</p>
          }
          <Modal.Open opens='booking'>
            {id
              ? <DiscountBooking $size='large'><label>-30% discount</label>Book a Random Cabin Tody!</DiscountBooking>
              : <DisabledButton>No cabins available for check-in TODAY</DisabledButton>
            }
                      </Modal.Open>
        </Box>
      </Row>
      <Modal.Window name="booking">
        <BookingForm id={id} name={name} maxCapacity={maxCapacity} discount={discount} regularPrice={regularPrice} coef={0.7} />
      </Modal.Window>
    </Modal>
  )
}

export default Home
