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


function Home() {
  const { cabins = [], isLoading } = useCabins()
  const [cabinId, setCabinId] = useState(0)
  const { bookings = [], isLoading: isLoading2 } = useBookingsByDates()

  if (isLoading || isLoading2) <Spinner />

  const description = cabinId > 0 && cabins?.find(cabin => cabin.id === cabinId).description
  const invalidCabins = bookings.map(booking => booking.cabins.name)
  const validCabinIDs = cabins.filter(cabin => !invalidCabins.includes(cabin.name)).map(cabin => cabin.id)
  const id = validCabinIDs[Math.floor(Math.random() * validCabinIDs.length)] 
  const cabin = cabins.find(cabin => cabin.id === id) || {}
  const { name, maxCapacity, discount, regularPrice } = cabin
  console.log(name, maxCapacity, discount, regularPrice)

  return (
    <Modal>
      <CabinSlick onChange={setCabinId} />
      <ActivitiesSlider />
      <Row type="horizontal">
        <Description text={description} />
        <Box>
          <p>You haven't booked any cabins yet.</p>
          <Modal.Open opens='booking'>
            <DiscountBooking $size='large'><label>-30% discount</label>Book a Random Cabin Tody!</DiscountBooking>
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
